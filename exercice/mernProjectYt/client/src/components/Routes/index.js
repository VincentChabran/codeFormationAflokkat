import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import Navbar from "../Navbar";

const index = () => {
    return (
        <div>
            <Navbar />
            <Router>
                <Route path="/" element={<Home />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/trending" element={<Trending />} />
            </Router>
        </div>
    );
};

export default index;
