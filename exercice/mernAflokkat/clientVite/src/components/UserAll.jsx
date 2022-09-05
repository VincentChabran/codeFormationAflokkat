import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Center, HStack, Text } from "@chakra-ui/react";

const boxUserStyle = {
    color: "white",
    border: "1px",
    borderRadius: "10px",
    p: "1rem",
};

const hstack = {
    p: "10px",
};

const UserAll = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4500/api/user")
            .then((res) => setUser(res.data))
            .catch((err) => console.log(err));
    });

    return (
        <Center>
            <Box>
                <HStack sx={hstack} spacing="50px">
                    {users.map((el, index) => (
                        <Center key={index}>
                            <Box sx={boxUserStyle} key={index}>
                                <Text>Role : {el.estFormateur ? "Formateur" : "Stagiaire"}</Text>
                                <Text>Mail : {el.login}</Text>
                                <Text>Prenom : {el.stagiaire?.prenom || el.formateur?.prenom}</Text>
                            </Box>
                        </Center>
                    ))}
                </HStack>
            </Box>
        </Center>
    );
};

export default UserAll;
