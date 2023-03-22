import { useNavigate } from "react-router-dom";
import { Grid, Text, Badge } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

import { useReclamationStore } from "../../stores/useReclamationStore";
import { useApplicationStore } from "../../stores/useApplicationStore";

type ListItemProps = {
    id: number;
    reclamation: string;
    statut: string;
    color: string;
    client: {
        id: number;
        nom: string;
    };
    responsable: {
        id: number;
        nom: string;
    };
    reservationId: number;
};

const ListItem = ({ id, reclamation, client, responsable, reservationId, statut, color }: ListItemProps) => {
    const navigate = useNavigate();
    const bg = useColorModeValue("gray.400", "gray.600");

    const { setReclamation, setStatut } = useReclamationStore();
    const { openOrCloseReclamation } = useApplicationStore();

    const setReclamationStoreAndNavigate = () => {
        setReclamation({
            id,
            reclamation,
            responsableId: responsable.id,
            clientId: client.id,
        });
        openOrCloseReclamation(true);
        setStatut(statut);
        navigate(`/reclamations/${id}`);
    };

    return (
        <Grid bg={bg} sx={gridCss} onClick={setReclamationStoreAndNavigate}>
            <Text>{`n° ${id}`}</Text>

            <Text fontWeight="bold" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" pr={4}>
                {client.nom}
            </Text>

            <Text>n° {reservationId}</Text>

            <Text textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" pr={4}>
                {responsable.nom}
            </Text>

            <Badge
                variant="solid"
                m="auto"
                mr={0}
                colorScheme={
                    statut === "Retour client" ? color : statut === "Proposition au client" ? "yellow" : "blue"
                }
            >
                {statut}
            </Badge>
        </Grid>
    );
};

export default ListItem;

const gridCss = {
    gridTemplateColumns: {
        base: "75px 175px 125px 1fr 230px",
        lg: "75px 250px 150px 1fr 230px",
    },
    p: 4,
    borderRadius: 10,
    cursor: "pointer",
    overflow: "hidden",
    _hover: {
        bg: "gray.500",
        transform: "scale(1.01)",
        transitionDuration: "0.2s",
    },
};
