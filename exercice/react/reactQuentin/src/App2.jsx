import { Box } from "@chakra-ui/react";
import React from "react";
import Content from "./components/Content";
import Navbar from "./components/Navbar";

const App2 = () => {
    return (
        <Box h="100vh">
            <Navbar backgroundColor="lightcoral" />
            <Content />
        </Box>
    );
};

export default App2;
