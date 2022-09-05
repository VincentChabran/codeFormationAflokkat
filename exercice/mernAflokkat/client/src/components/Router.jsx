import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import Formation from "../pages/Formation";

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/formation" element={<Formation />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Router;
