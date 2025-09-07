import React from "react";
import ProfileCard from "./ProfileCard.jsx";
import Waves from "./Waves";

export default function Contact() {
  return (
    <div style={{ position: "relative", padding: 50, color: "#000000ff" }}>
      {/* Waves Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <Waves
          lineColor="#fff"
          backgroundColor="rgba(1, 0, 41, 1)"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
      </div>

      {/* Profile Cards Row */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
          position: "relative",
          zIndex: 1, // ensures cards stay above waves
        }}
      >
        <ProfileCard
          name="Ved Sanghavi"
          nameStyle={{color: "#000000ff"}}
          title="Ignite CP"
          handle="javicodes"
          status="Online"
          contactText="T008"
          avatarUrl="/ved1.jpg"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact Ved clicked")}
        />

        <ProfileCard
          name="Krishna Poriya"
          title="UI/UX Designer"
          handle="mariaux"
          status="Away"
          contactText="T010"
          avatarUrl="/krishna.jpg"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact Krishna clicked")}
        />

        <ProfileCard
          name="Prachi Darji"
          title="DevOps Engineer"
          handle="kevinops"
          status="Busy"
          contactText="T013"
          avatarUrl="/prachi.jpg"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact Prachi clicked")}
        />
      </div>
    </div>
  );
}
