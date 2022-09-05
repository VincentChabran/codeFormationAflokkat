import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import NavBar from "../components/NavBar";
import UserAll from "../components/UserAll";

const User = () => {
    return (
        <Box>
            <Center>
                <Text color="white">User.jsx</Text>
            </Center>
            <UserAll />
        </Box>
    );
};

export default User;
