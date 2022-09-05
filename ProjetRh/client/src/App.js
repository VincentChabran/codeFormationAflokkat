import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutAllUser from "./pages/AboutAllUser";
import Home from "./pages/Home";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<AboutAllUser />} />
                <Route path="/*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
