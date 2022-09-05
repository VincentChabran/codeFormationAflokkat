import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import FormationAll from "../components/FormationAll";
import NavBar from "../components/NavBar";

const Formation = () => {
    return (
        <Box>
            <Center>
                <Text color="white">Formation.jsx</Text>
            </Center>
            <FormationAll />
        </Box>
    );
};

export default Formation;
