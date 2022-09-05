import { Box, Center, Skeleton, Stack, Text } from "@chakra-ui/react";
import React from "react";
import NavBar from "../components/NavBar";

const Home = () => {
    return (
        <Box>
            <Center m="100px">
                <Text fontSize="50px" color="white">
                    Home.jsx
                </Text>
            </Center>
            <Stack>
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
            </Stack>
            <Text color={"white"} marginTop="10px">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed, distinctio dicta consequatur sunt ab
                impedit quaerat ipsam molestiae soluta tempora voluptatem corporis, voluptates reprehenderit porro,
                illum harum obcaecati dignissimos! Repellat debitis voluptatum, dicta optio quo, accusantium provident
                nam laboriosam omnis labore maxime consectetur praesentium fuga placeat sunt rem dolorem, voluptates
                magnam aut iusto dolor aperiam? Laboriosam id maxime veniam dignissimos voluptatem! Laborum quaerat
                aperiam harum iste. Nesciunt, quaerat eum, id labore laudantium voluptatum debitis magnam eius, quam
                assumenda adipisci harum ullam officiis sit eos beatae quod sint maxime cumque soluta? Ipsum, id
                possimus? Tempore adipisci et fugit reiciendis quo accusamus?
            </Text>
        </Box>
    );
};

export default Home;
