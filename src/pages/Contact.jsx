import React from "react";
import ProfileCard from "./ProfileCard.jsx";


export default function Contact() {
  return (
    <div style={{ padding: 50, color: "#e6eef8" }}>
    

      {/* Profile Cards Row */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <ProfileCard
          name="Ved Sanghavi"
          title="Ignite CP"
          handle="javicodes"
          status="Online"
          contactText="T008"
          avatarUrl="/ved.jpg"
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
