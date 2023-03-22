import { Heading } from "@chakra-ui/react";

import List from "../components/questionnaires/List";

const Questionnaires = () => {
    return (
        <>
            <Heading as="h4" size="md">
                Questionnaires de satisfaction
            </Heading>

            <List />
        </>
    );
};

export default Questionnaires;
