import React from "react";
import { Box, HStack, Link, Spacer, Text } from "@chakra-ui/react";

const NavBar = () => {
    return (
        <Box bg="gray.700" w="100%" p={4} color="white">
            <HStack>
                <Text>NavBar</Text>
                <Spacer />
                <Link href="/">Home</Link>
                <Link href="/formation">Formation</Link>
                <Link href="/user">User</Link>
            </HStack>
        </Box>
    );
};

export default NavBar;
