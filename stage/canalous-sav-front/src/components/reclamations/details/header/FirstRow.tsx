import { useNavigate } from "react-router-dom";
import { Badge, Divider, HStack, Spacer, Text, Tooltip } from "@chakra-ui/react";

type FirstRowProps = {
    reclamation: {
        client: {
            nom: string;
            email: string;
            tel: string | number;
        };
        reservation: {
            prix: number;
            bateau: string;
            nombasedepart: string;
            datedepart: string;
            nombasearrivee: string;
            datearrivee: string;
            id: number;
        };
        questionnaire: {
            id: number;
        };
        statut: string;
    };
};

const FirstRow = ({ reclamation }: FirstRowProps) => {
    const { client, reservation, questionnaire, statut } = reclamation;

    const navigate = useNavigate();

    return (
        <HStack spacing={1}>
            <Text whiteSpace="nowrap" fontSize={14}>
                Réservation n°
            </Text>

            <Tooltip
                hasArrow
                placement="bottom"
                label={
                    <>
                        <Text>{client.nom}</Text>
                        <Text>
                            {client.email} {client.tel && `- ${client.tel}`}
                        </Text>

                        <Divider />

                        <Text>Prix : {reservation.prix}€</Text>
                        <Text>Bateau : {reservation.bateau}</Text>
                        <Text>De {reservation.nombasedepart}</Text>
                        <Text>le {reservation.datedepart}</Text>
                        <Text>A {reservation.nombasearrivee}</Text>
                        <Text>le {reservation.datearrivee}</Text>
                    </>
                }
            >
                <Text fontWeight="bold">{reservation.id}</Text>
            </Tooltip>

            {questionnaire && (
                <>
                    <Text whiteSpace="nowrap">- Questionnaire n°</Text>
                    <Text
                        textDecoration="underline"
                        cursor="pointer"
                        onClick={() => navigate(`/questionnaires/${questionnaire.id}`)}
                    >
                        {questionnaire.id}
                    </Text>
                </>
            )}

            <Spacer />
            <Badge variant="solid">{statut}</Badge>
        </HStack>
    );
};

export default FirstRow;
