import { Heading } from "@chakra-ui/react";
import Creer from "../components/reclamations/Creer";

const CreerReclamation = () => {
    return (
        <>
            <Heading as="h4" size="md">
                Créer une réclamation
            </Heading>
            <Creer />
        </>
    );
};

export default CreerReclamation;
