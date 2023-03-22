import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import Details from "../components/questionnaires/Details";

const Questionnaire = () => {
    const { id } = useParams();
    return (
        <>
            <Heading as="h4" size="md">
                Questionnaire de satisfaction - n°{id}
            </Heading>
            <Details />
        </>
    );
};

export default Questionnaire;
