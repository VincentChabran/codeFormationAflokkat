import { useParams } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import Details from "../components/reclamations/Details";

const Reclamation = () => {
    const { id } = useParams();
    return (
        <>
            <Heading as="h4" size="md">
                Réclamation n°{id}
            </Heading>
            <Details />
        </>
    );
};

export default Reclamation;
