import { Box, Center, HStack, VStack, Text } from "@chakra-ui/react";
import React from "react";
import Formulaire from "./Formulaire";
import axios from "axios";
import { useEffect, useState } from "react";

const Content = () => {
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        axios
            .get("https://pokeapi.co/api/v2/pokemon/1")
            .then((res) => {
                console.log(res.data);
                setPokemon(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    console.log(pokemon);

    return (
        <Center bg="lightblue" w="100%" h="calc(100vh - 56px)">
            <VStack w="50%" h="80%" bg="white" py={4} spacing={10}>
                <Text fontSize={24} fontWeight="bold">
                    MON FORMULAIRE {pokemon?.name}
                </Text>
                <Formulaire />
            </VStack>
        </Center>
    );
};

export default Content;
