import { Text, Table, Tbody } from "@chakra-ui/react";

import MyTableRowForInfos from "./MyTableRowForInfos";

type AboutReservationProps = {
    questionnaire: {
        numreservation: number | string;
        prix: number | string;
        bateau: string;
        nombasedepart: string;
        datedepart: string;
        nombasearrivee: string;
        datearrivee: string;
    };
};

const AboutReservation = ({ questionnaire }: AboutReservationProps) => {
    const { numreservation, prix, bateau, nombasedepart, datedepart, nombasearrivee, datearrivee } = questionnaire;

    const fields: (string | number)[] = [
        `n° ${numreservation}`,
        `${prix} €`,
        bateau,
        `Départ : ${nombasedepart}`,
        datedepart,
        `Arrivée : ${nombasearrivee}`,
        datearrivee,
    ];

    return (
        <>
            <Text fontWeight="bold">Informations Réservation</Text>
            <Table variant="striped" size="sm" border="2px solid" borderColor="gray.700">
                <Tbody border="2px solid" borderColor="gray.700">
                    {fields.map((el) => (
                        <MyTableRowForInfos key={el} value={el} />
                    ))}
                </Tbody>
            </Table>
        </>
    );
};

export default AboutReservation;
