import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Center, Text } from "@chakra-ui/react";

const FormationAll = () => {
    const [formations, setFormation] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4500/api/formation")
            .then((res) => setFormation(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <Center>
            <Box color="white" backgroundColor="coral">
                {formations.map((el, index) => (
                    <Center key={index}>
                        <Box>
                            <Text>id : {el._id}</Text>
                            <Text>nom : {el.nom}</Text>
                            <Text>pole : {el.pole}</Text>
                            <Text>{el.dateDebut}</Text>
                            <Text>{el.dateFin}</Text>
                        </Box>
                    </Center>
                ))}
            </Box>
        </Center>
    );
};

export default FormationAll;
