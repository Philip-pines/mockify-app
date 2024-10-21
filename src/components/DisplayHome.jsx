import React from "react";
import Navbar from "./Navbar";
import Feed from "./Feed";
import Tracks from "./Tracks";

const DisplayHome = () => {
    return (
        <>
            <Navbar/>
            <div>
                <Feed/>
            </div>

        </>
    );
}

export default DisplayHome;