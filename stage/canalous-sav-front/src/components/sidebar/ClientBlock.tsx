import { VStack, Heading, UnorderedList, ListItem, Divider } from "@chakra-ui/react";

import { scrollBarCSS } from "../../utils/scrollBarCss";
import { useClientStore } from "../../stores/useClientStore";
import { useReservationStore } from "../../stores/useReservationStore";

const MyListItem = ({ param, text, ...props }: any) => {
    return (
        <ListItem
            fontWeight="light"
            color={param ? "inherit" : "gray"}
            fontStyle={param ? "inherit" : "italic"}
            {...props}
        >
            {param ? param : text}
        </ListItem>
    );
};

const ClientBlock = () => {
    const { id, nom, email, tel, portable, adresse, codepostal, ville, pays } = useClientStore();
    const {
        id: reservationId,
        prix,
        bateau,
        nombasedepart,
        nombasearrivee,
        datedepart,
        datearrivee,
    } = useReservationStore();

    if (!nom) return <></>;

    return (
        <VStack
            m={4}
            align="start"
            h={`calc(100vh - 240px)`}
            overflowY="auto"
            css={scrollBarCSS}
        >
            <VStack spacing={4} align="start">
                <Heading as="h4" size="sm">
                    Informations client
                </Heading>
                <UnorderedList pl={8}>
                    <ListItem fontWeight="light">{nom}</ListItem>
                    <ListItem fontWeight="light">{email}</ListItem>
                    <MyListItem param={tel} text="Téléphone non renseigné" />
                    <MyListItem param={portable} text="Portable non renseigné" />
                    <MyListItem param={adresse} text="Adresse non renseignée" />
                    <MyListItem param={codepostal} text="Code postal non renseigné" />
                    <MyListItem param={ville} text="Ville non renseignée" />
                    <MyListItem param={pays} text="Pays non renseigné" />
                </UnorderedList>
            </VStack>

            <Divider my={4} />

            <VStack spacing={4} align="stretch">
                <Heading as="h4" size="sm">
                    Informations réservation
                </Heading>
                <UnorderedList pl={8}>
                    <ListItem fontWeight="light">n°{reservationId}</ListItem>
                    <ListItem fontWeight="light">{prix}€</ListItem>
                    <ListItem fontWeight="light">{bateau}</ListItem>
                    <ListItem fontWeight="light">De {nombasedepart}</ListItem>
                    <ListItem fontWeight="light">le {datedepart}</ListItem>
                    <ListItem fontWeight="light">A {nombasearrivee}</ListItem>
                    <ListItem fontWeight="light">le {datearrivee}</ListItem>
                </UnorderedList>
            </VStack>
        </VStack>
    );
};

export default ClientBlock;
