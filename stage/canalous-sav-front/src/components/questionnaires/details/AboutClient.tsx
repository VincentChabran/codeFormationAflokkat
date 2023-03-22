import { Text, Table, Tbody } from "@chakra-ui/react";

import MyTableRowForInfos from "./MyTableRowForInfos";

type AboutClientProps = {
    questionnaire: {
        nomclient: string;
        email: string;
        tel: string | number;
        portable: string | number;
        adresse: string;
        codepostal: string | number;
        ville: string;
        pays: string;
    };
};

const keys: string[] = [
    "nomclient",
    "email",
    "Téléphone non renseigné",
    "Portable non renseigné",
    "Adresse non renseignée",
    "Code postal non renseigné",
    "Ville non renseignée",
    "Pays non renseigné",
];

const AboutClient = ({ questionnaire }: AboutClientProps) => {
    const { nomclient, email, tel, portable, adresse, codepostal, ville, pays } = questionnaire;
    const fields: (string | number)[] = [nomclient, email, tel, portable, adresse, codepostal, ville, pays];

    return (
        <>
            <Text fontWeight="bold">Informations Client</Text>
            <Table variant="striped" size="sm" border="2px solid" borderColor="gray.700">
                <Tbody border="2px solid" borderColor="gray.700">
                    {fields.map((el, i) => (
                        <MyTableRowForInfos key={el} value={el} text={`${keys[i]}`} />
                    ))}
                </Tbody>
            </Table>
        </>
    );
};

export default AboutClient;
