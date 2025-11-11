import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function FloatingFood({ name, recipeId, onNavigate, triggerTransition, isZooming }) {
  const ref = useRef();
  const hoverRef = useRef(false);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.2;

    let targetScale = hoverRef.current ? 1.1 : 1;
    if (isZooming) targetScale = 3; // zoom during transition
    ref.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
  });

  return (
    <Float floatIntensity={2} rotationIntensity={0.6}>
      <group
        ref={ref}
        dispose={null}
        scale={[1.8, 1.8, 1.8]} // 🔥 Increased base size
        onPointerOver={() => (hoverRef.current = true)}
        onPointerOut={() => (hoverRef.current = false)}
        onClick={() => triggerTransition(recipeId)}
        style={{ cursor: "pointer" }}
      >
        <mesh position={[0, -0.2, 0]} rotation={[0.2, 0.6, 0]}>
          <torusGeometry args={[1.8, 0.65, 32, 64]} /> {/* 🔥 Larger torus */}
          <meshStandardMaterial roughness={0.4} metalness={0.1} color={"#f59e0b"} />
        </mesh>
        <mesh position={[0, 0.6, 0]}> {/* 🔥 Lifted sphere a bit */}
          <sphereGeometry args={[0.8, 32, 32]} /> {/* 🔥 Bigger sphere */}
          <meshStandardMaterial roughness={0.6} color={"#ecfccb"} />
        </mesh>
        <Html position={[0, -2, 0]}>
          <section className="cursor-target">
            <div
              style={{
                width: 260,
                textAlign: "center",
                color: "#e6eef8",
                padding: 8,
                background: "rgba(0,0,0,0.35)",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              <strong style={{ fontSize: 16 }}>{name || "Heavenly Dish"}</strong>
              <div style={{ fontSize: 13, color: "#9fb4d1", marginTop: 6 }}>
                Click for full recipe!
              </div>
            </div>
          </section>
        </Html>
      </group>
    </Float>
  );
}

export default function ThreeScene({ recipe }) {
  const navigate = useNavigate();
  const title = recipe ? recipe.name : "Select a recipe";

  const [transitionStep, setTransitionStep] = useState("idle"); // idle → glitter → zoomfade
  const [selectedId, setSelectedId] = useState(null);

  const handleNavigate = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const triggerTransition = (recipeId) => {
    setSelectedId(recipeId);
    setTransitionStep("glitter");

    // Step 1: Glitter
    setTimeout(() => {
      setTransitionStep("zoomfade");
    }, 600);

    // Step 2: Navigate after fade
    setTimeout(() => {
      handleNavigate(recipeId);
    }, 1600);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <section className="cursor-target" style={{ width: "100%", height: "100%" }}>
        <Canvas camera={{ position: [0, 1.6, 3.2], fov: 50 }}> {/* 🔥 Camera closer */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, 2, -3]} intensity={0.6} />

          <FloatingFood
            name={title}
            recipeId={recipe?.id}
            onNavigate={handleNavigate}
            triggerTransition={triggerTransition}
            isZooming={transitionStep === "zoomfade"}
          />

          <OrbitControls
            enablePan={false}
            autoRotate={transitionStep === "idle"}
            autoRotateSpeed={0.6}
          />
        </Canvas>
      </section>

      <AnimatePresence>
        {transitionStep === "glitter" && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="glitter-overlay"
          >
            {[...Array(50)].map((_, i) => (
              <span
                key={i}
                className="glitter-particle"
                style={{
                  left: "50%",
                  top: "50%",
                  animationDelay: `${Math.random() * 0.3}s`,
                  "--dx": `${(Math.random() - 0.5) * 350}px`,
                  "--dy": `${(Math.random() - 0.5) * 350}px`,
                  "--hue": Math.floor(Math.random() * 360),
                }}
              />
            ))}
          </motion.div>
        )}

        {transitionStep === "zoomfade" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="fade-overlay"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
