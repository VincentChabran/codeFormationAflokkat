import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Formation from "./pages/Formation";
import Home from "./pages/Home";

const App = () => {
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

export default App;
