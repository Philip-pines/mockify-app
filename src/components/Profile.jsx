import React from "react";
import { assets } from "../assets/assets";
import Navbar from "./Navbar";
import profile from "../profile";

function Card(props) {
    return (
      <div className="card">
        <img src={props.img} style={{ width: "200px" }} />
        <h1>{props.name}</h1>
        <p>{props.jobTitle}</p>
        <p>{props.desc}</p>
      </div>
    );
}

function createCard(profile) {
    return (
      <Card
        img={profile.image}
        name={profile.name}
        jobTitle={profile.jobTitle}
        desc={profile.desc}
      />
    );
  }

const Profile = () => {
    const myProfile = profile;

    return (
        <>
            <Navbar />
            {myProfile.map(createCard)}
        </>
    )
}

export default Profile;