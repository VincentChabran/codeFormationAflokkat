import { Heading } from "@chakra-ui/react";
import List from "../components/reclamations/List";

const Reclamations = () => {
    return (
        <>
            <Heading as="h4" size="md">
                Réclamations
            </Heading>
            <List />
        </>
    );
};

export default Reclamations;
