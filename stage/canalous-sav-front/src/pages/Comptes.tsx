import { Heading } from "@chakra-ui/react";
import ComptesList from "../components/comptes/Comptes";

const Comptes = () => {
    return (
        <>
            <Heading as="h4" size="md">
                Liste des comptes
            </Heading>
            <ComptesList />
        </>
    );
};

export default Comptes;
