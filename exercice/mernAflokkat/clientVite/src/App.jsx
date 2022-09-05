import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Formation from "./pages/Formation";
import User from "./pages/User";

const App = () => {
    return (
        <Box backgroundColor="gray.900">
            <NavBar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={Home} />
                    <Route path="/formation" element={<Formation />} />
                    <Route path="/user" element={<User />} />
                </Routes>
            </BrowserRouter>
        </Box>
    );
};

export default App;
