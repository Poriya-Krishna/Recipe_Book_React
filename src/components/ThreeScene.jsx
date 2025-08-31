import React, {useRef} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';

function FloatingFood({name}){
  const ref = useRef();
  const hoverRef = useRef(false);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.2;
    if(hoverRef.current){
      ref.current.scale.x = ref.current.scale.y = ref.current.scale.z = 1;
    } else {
      ref.current.scale.x = ref.current.scale.y = ref.current.scale.z = 1;
    }
  });

  return (
    <Float floatIntensity={2} rotationIntensity={0.6}>
      <group ref={ref} dispose={null} onPointerOver={()=>hoverRef.current=true} onPointerOut={()=>hoverRef.current=false} onClick={()=>alert(name + ' clicked!')}>
        <mesh position={[0, -0.2, 0]} rotation={[0.2, 0.6, 0]}>
          <torusGeometry args={[1.2, 0.45, 32, 64]} />
          <meshStandardMaterial roughness={0.4} metalness={0.1} color={'#f59e0b'} />
        </mesh>
        <mesh position={[0,0.4,0]}>
          <sphereGeometry args={[0.5,32,32]} />
          <meshStandardMaterial roughness={0.6} color={'#ecfccb'} />
        </mesh>
        <Html position={[0,-1.4,0]}>
          <div style={{width:240, textAlign:'center', color:'#e6eef8', padding:8, background:'rgba(0,0,0,0.35)', borderRadius:8}}>
            <strong style={{fontSize:14}}>{name ? name : 'Heavenly Dish'}</strong>
            <div style={{fontSize:12, color:'#9fb4d1', marginTop:6}}>Interactive 3D preview</div>
          </div>
        </Html>
      </group>
    </Float>
  )
}

export default function ThreeScene({recipe}){
  const title = recipe ? recipe.name : "Select a recipe";
  return (
    <Canvas camera={{position:[0,1.6,4], fov:50}}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5,5,5]} intensity={1} />
      <directionalLight position={[-5,2,-3]} intensity={0.6} />
      <FloatingFood name={title} />
      <OrbitControls enablePan={false} autoRotate={true} autoRotateSpeed={0.6} />
    </Canvas>
  )
}