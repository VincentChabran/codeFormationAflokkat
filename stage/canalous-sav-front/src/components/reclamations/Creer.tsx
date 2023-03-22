import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, VStack, HStack, Input, Text, useColorModeValue, SimpleGrid } from "@chakra-ui/react";
import { useQuery } from "urql";
import FormForCreate from "./creer/FormForCreate";

import { scrollBarCSS } from "../../utils/scrollBarCss";
import { useClientStore } from "../../stores/useClientStore";
import { useReservationStore } from "../../stores/useReservationStore";

const fetchReservationQuery = `
  query Query($param: String!) {
    findReservation(param: $param) {
      id
      datecreation
      datedepart
      datearrivee
      prix
      nomclient
      numclient
      bateau
      basedepart
      basearrivee
      nombasedepart
      nombasearrivee
    }
  }
`;

const getReclamationQuery = `
  query Query($id: Int!) {
    reclamationByReservationId(id: $id) {
      id
    }
  }
`;

const getClientInfosQuery = `
  query Query($getClientInfosId: Float!) {
    getClientInfos(id: $getClientInfosId) {
      nom
      email
      tel
      portable
      adresse
      codepostal
      ville
      pays
    }
  }
`;

const Creer = () => {
    const bg = useColorModeValue("gray.300", "gray.600");

    const navigate = useNavigate();

    const { setClient } = useClientStore();
    const { id: reservationId, setReservation } = useReservationStore();

    const [searchReservation, setSearchReservation] = useState<string>("");

    const [{ data: reservationData, fetching, error: reservationError }] = useQuery({
        query: fetchReservationQuery,
        variables: { param: searchReservation },
        pause: searchReservation.length < 3 && searchReservation.length !== 0,
    });

    const [clientIdFromResa, setClientIdFromResa] = useState(-1);

    const [{ data: clientData }] = useQuery({
        query: getClientInfosQuery,
        variables: { getClientInfosId: clientIdFromResa },
        pause: clientIdFromResa === -1,
    });

    useEffect(() => {
        if (clientData) {
            setClient({
                ...clientData.getClientInfos[0],
                id: clientIdFromResa,
            });
            setSearchReservation("");
            setClientIdFromResa(-1);
        }
    }, [clientData]);

    const [{ data: reclamationData }, reexecuteQuery] = useQuery({
        query: getReclamationQuery,
        variables: { id: reservationId },
        pause: reservationId !== 0,
    });

    useEffect(() => {
        reexecuteQuery();
    }, [reservationId]);

    return (
        <>
            <HStack spacing={8} m={4} align="start">
                <Input
                    size="md"
                    w="230px"
                    placeholder="Rechercher une réservation"
                    variant="filled"
                    value={searchReservation}
                    onChange={(e) => setSearchReservation(e.target.value)}
                />
            </HStack>
            {searchReservation && reservationData && (
                <VStack
                    m={4}
                    p={4}
                    spacing={2}
                    align="start"
                    h={`calc(100vh - 150px)`}
                    overflowY="auto"
                    css={scrollBarCSS}
                >
                    <SimpleGrid minChildWidth="" columns={[2, null, 3]} spacing={2}>
                        {reservationData.findReservation.map(
                            ({
                                id,
                                datecreation,
                                datedepart,
                                datearrivee,
                                prix,
                                nomclient,
                                numclient,
                                bateau,
                                basedepart,
                                basearrivee,
                                nombasedepart,
                                nombasearrivee,
                            }: any) => (
                                <Box
                                    key={id}
                                    w="auto"
                                    bg={bg}
                                    p={4}
                                    borderRadius={10}
                                    sx={{ cursor: "pointer" }}
                                    _hover={{
                                        bg: "gray.500",
                                        transform: "scale(1.01)",
                                        transitionDuration: "0.2s",
                                    }}
                                    onClick={() => {
                                        setClientIdFromResa(numclient);
                                        setReservation({
                                            id,
                                            datecreation,
                                            datedepart,
                                            datearrivee,
                                            prix,
                                            nomclient,
                                            numclient,
                                            bateau,
                                            basedepart,
                                            basearrivee,
                                            nombasedepart,
                                            nombasearrivee,
                                        });
                                    }}
                                >
                                    <HStack>
                                        <Text>{`n°${id} - `}</Text>
                                        <Text fontWeight="bold">{`Prix :`}</Text>
                                        <Text>{`${prix}€`}</Text>
                                    </HStack>
                                    <HStack align="start">
                                        <Text fontWeight="bold" whiteSpace="nowrap">{`Client :`}</Text>
                                        <Text>{`${nomclient}`}</Text>
                                    </HStack>
                                    <HStack align="start">
                                        <Text fontWeight="bold" whiteSpace="nowrap">{`Bateau :`}</Text>
                                        <Text>{`${bateau}`}</Text>
                                    </HStack>
                                    <HStack align="start">
                                        <Text fontWeight="bold" whiteSpace="nowrap">{`Départ :`}</Text>
                                        <Text>{`${nombasedepart}`}</Text>
                                    </HStack>
                                    <Text>{`${datedepart}`}</Text>
                                    <HStack align="start">
                                        <Text fontWeight="bold" whiteSpace="nowrap">{`Arrivée :`}</Text>
                                        <Text>{`${nombasearrivee}`}</Text>
                                    </HStack>
                                    <Text>{`${datearrivee}`}</Text>
                                </Box>
                            )
                        )}
                    </SimpleGrid>
                </VStack>
            )}

            {reclamationData ? (
                <HStack
                    m={4}
                    spacing={1}
                    cursor="pointer"
                    onClick={() => navigate(`/reclamations/${reclamationData.reclamationByReservationId.id}`)}
                >
                    <Text fontSize={18}>La réclamation n°</Text>
                    <Text fontSize={18} fontWeight="bold">
                        {reclamationData.reclamationByReservationId.id}
                    </Text>
                    <Text fontSize={18}>traite déjà de cette réservation.</Text>
                </HStack>
            ) : (
                // Formulaire
                <>{!searchReservation && <FormForCreate clientData={clientData} />}</>
            )}
        </>
    );
};

export default Creer;
