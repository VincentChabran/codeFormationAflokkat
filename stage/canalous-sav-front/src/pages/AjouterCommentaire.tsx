import { Heading } from "@chakra-ui/react";
import Details from "../components/reclamations/Details";

const AjouterCommentaire = () => {
    return (
        <>
            <Heading as="h4" size="md">
                Ajouter un commentaire
            </Heading>
            <Details />
        </>
    );
};

export default AjouterCommentaire;
