import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import Profile from "./Profile";

const Display = () => {
    return (
        <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[100%] lg:ml-0">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DisplayHome />}/>
                    <Route path="/profile" element={<Profile />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Display;