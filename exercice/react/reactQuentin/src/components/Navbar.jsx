import React from "react";
import { Box, HStack, Text, Link, Spacer } from "@chakra-ui/react";

const Navbar = ({ backgroundColor, children }) => {
    return (
        <Box bg={backgroundColor} w="100%" p={4} color="white">
            <HStack>
                <Text>Mon titre</Text>
                <Spacer />
                <Link>Accueil</Link>
                <Link>A propos</Link>
                <Link>Contact</Link>
            </HStack>
        </Box>
    );
};

export default Navbar;
