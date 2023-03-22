import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, VStack, HStack, Text, Spinner, ListItem } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useMutation, useQuery } from "urql";

import { scrollBarCSS } from "../../utils/scrollBarCss";
import { useReclamationStore } from "../../stores/useReclamationStore";
import { useAccountStore } from "../../stores/useAccountStore";

import SumUp from "./details/SumUp";
import AboutClient from "./details/AboutClient";
import AboutReservation from "./details/AboutReservation";

const getQuestionnaireQuery = `
  query Query($id: Int!) {
    questionnaire(id: $id) {
      id
      numreservation
      booking_online_simplicity
      booking_online_information
      booking_commercial_reception
      booking_commercial_response_time
      booking_commercial_information
      stay_reception_boarding
      stay_reception_landing
      stay_reception_stopover
      boat_comfort
      boat_cleanliness
      boat_equipment
      instruction_clear
      instruction_suitable
      instruction_sufficient
      technical_service_available
      technical_service_timeliness
      technical_service_relational
      general_appreciation_stay
      recommend_us
      comments
      numclient
      nomclient
      email
      tel
      portable
      adresse
      codepostal
      ville
      pays
      prix
      bateau
      basedepart
      basearrivee
      nombasedepart
      nombasearrivee
      datedepart
      datearrivee
      date
      statut
      reclamation {
        id
      }
    }
  }
`;

const createClientMutation = `
  mutation Mutation($createClientInput: CreateClientInput!) {
    createClient(createClientInput: $createClientInput) {
      id
    }
  }
`;

const createReclamationMutation = `
  mutation Mutation($questionnaireId: Int, $reservationId: Int!, $baseIds: [Int!]!, $participants: [UtilisateurInput!]!, $createReclamationInput: CreateReclamationInput!) {
    createReclamation(questionnaireId: $questionnaireId, reservationId: $reservationId, baseIds: $baseIds, participants: $participants, createReclamationInput: $createReclamationInput) {
      id
      reclamation
      client {
        id
        nom
      }
      responsable {
        id
        nom
      }
      participants {
        nom
      }
      questionnaire {
        id
      }
    }
  }
`;

// const MyListItem = ({ text, param }: any) => {
//     return (
//         <ListItem color={param ? "inherit" : "gray"} fontStyle={param ? "inherit" : "italic"}>
//             {param ? param : text}
//         </ListItem>
//     );
// };

const Details = () => {
    const { id } = useParams();
    const bg = useColorModeValue("gray.400", "gray.600");
    
    const [{ data, fetching, error }, reexecuteQuery] = useQuery({
        query: getQuestionnaireQuery,
        variables: { id: id && parseInt(id) },
    });
    
    const { id: responsableId, nom, email, role } = useAccountStore();
    const { setReclamation, changeQuestionnaireToReclamation, setChangeQuestionnaireToReclamation } =
        useReclamationStore();

    const [__, executeCreateClientMutation] = useMutation(createClientMutation);

    const [_, executeCreateReclamationMutation] = useMutation(createReclamationMutation);

    const transformQuestionnaireToReclamation = () => {
        executeCreateClientMutation({
            createClientInput: {
                id: data.questionnaire.numclient,
                nom: data.questionnaire.nomclient,
                email: data.questionnaire.email,
                tel: data.questionnaire.tel,
                portable: data.questionnaire.portable,
                adresse: data.questionnaire.adresse,
                codepostal: data.questionnaire.codepostal,
                ville: data.questionnaire.ville,
                pays: data.questionnaire.pays,
            },
        }).then((resCreateClient) => {
            // console.log(resCreateClient.data);
            if (resCreateClient.data) {
                const variables = {
                    createReclamationInput: {
                        reclamation:
                            data.questionnaire.comments || `Réclamation du questionnaire n° ${id && parseInt(id)}`,
                        clientId: data.questionnaire.numclient,
                        responsableId,
                    },
                    reservationId: data.questionnaire.numreservation,
                    participants: [
                        {
                            id: responsableId,
                            nom,
                            email,
                            role,
                        },
                    ],
                    baseIds:
                        data.questionnaire.basedepart === data.questionnaire.basearrivee
                            ? [data.questionnaire.basedepart]
                            : [data.questionnaire.basedepart, data.questionnaire.basearrivee],
                    questionnaireId: id && parseInt(id),
                };
                // console.log(variables);
                executeCreateReclamationMutation(variables).then((resCreateReclamation) => {
                    // console.log(resCreateReclamation);
                    if (resCreateReclamation.data) {
                        setReclamation({
                            id: resCreateReclamation.data.createReclamation.id,
                            reclamation: resCreateReclamation.data.createReclamation.reclamation,
                            responsableId: resCreateReclamation.data.createReclamation.responsable?.id,
                            clientId: resCreateReclamation.data.createReclamation.client.id,
                        });
                    }
                });
            }
        });
        setChangeQuestionnaireToReclamation();
    };

    useEffect(() => {
        if (changeQuestionnaireToReclamation) transformQuestionnaireToReclamation();
    }, [changeQuestionnaireToReclamation]);

    return (
        <Box m={4} p={4} bg={bg} borderRadius={10}>
            {fetching ? (
                <Spinner />
            ) : (
                <VStack spacing={2} align="items-start">
                    <VStack
                        px={4}
                        spacing={4}
                        align="stretch"
                        h={`calc(100vh - 128px)`}
                        overflowY="auto"
                        css={scrollBarCSS}
                    >
                        <HStack align="start" spacing={4}>
                            {/* Résumer du questionnaire (Parti gauche)*/}
                            <VStack w="60%" align="start">
                                <SumUp questionnaire={data.questionnaire} />
                            </VStack>

                            {/* Info client + info Résa (Parti droite) */}
                            <VStack w="40%" align="start" spacing={4}>
                                <AboutClient questionnaire={data.questionnaire} />

                                <AboutReservation questionnaire={data.questionnaire} />
                            </VStack>
                        </HStack>

                        {/* Commentaire client si il existe */}
                        {data.questionnaire.comments && (
                            <Box border="2px solid" borderColor="gray.700" borderRadius="10px" px={4} py={2}>
                                <Text textAlign="justify" whiteSpace="pre-wrap" fontSize={14}>
                                    {data.questionnaire.comments}
                                </Text>
                            </Box>
                        )}
                    </VStack>
                </VStack>
            )}
        </Box>
    );
};

export default Details;
