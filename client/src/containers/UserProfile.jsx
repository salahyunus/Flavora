import React from "react";
import { Header, ProfileCard } from "../Components";
import "../assets/css/ProfileBG.css";
const UserProfile = () => {
  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <ProfileCard />
      </div>
    </main>
  );
};

export default UserProfile;
