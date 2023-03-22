import { useState } from "react";
import { Button, HStack, Heading, Text, Select, VStack, useDisclosure, Divider } from "@chakra-ui/react";
import { useMutation, useQuery } from "urql";
import { Link, useParams } from "react-router-dom";
import SendMailWindow from "./questActionsBlock/SendMailWindow";

const getQuestionnaireQuery = `
  query Query($id: Int!) {
    questionnaire(id: $id) {
      id
      numreservation
      nomclient
      email
      statut
      reclamation {
        id
      }
    }
  }
`;

const checkExistingReclamationQuery = `
  query Query($id: Int!) {
    reclamationByReservationId(id: $id) {
      id
    }
  }
`;

const linkQuestionnaireToExistingReclamationMutation = `
  mutation Mutation($reclamationId: Int!, $questionnaireId: Int!) {
    linkQuestionnaireToExistingReclamation(reclamationId: $reclamationId, questionnaireId: $questionnaireId) {
      id
    }
  }
`;

const QuestActionsBlock = () => {
    const params = useParams();
    const id = params.id ? parseInt(params.id) : 0;

    const [{ data, fetching, error }] = useQuery({
        query: getQuestionnaireQuery,
        variables: { id },
    });

    const [{ data: reclamationData, error: reclamationError }] = useQuery({
        query: checkExistingReclamationQuery,
        variables: { id: data?.questionnaire?.numreservation },
    });

    const [statut, setStatut] = useState("...");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [__, executeLinkQuestionnaireToExistingReclamationMutation] = useMutation(
        linkQuestionnaireToExistingReclamationMutation
    );

    const linkQuestionnaireToExistingReclamation = () => {
        executeLinkQuestionnaireToExistingReclamationMutation({
            questionnaireId: data.questionnaire.id,
            reclamationId: reclamationData.reclamationByReservationId.id,
        }).then((res) => {
            // console.log(res);
        });
    };

    return (
        <VStack align="start" spacing={4}>
            {data && (
                <>
                    <Heading as="h4" size="md">
                        Actions
                    </Heading>
                    <Text>Modifier le statut du questionnaire</Text>
                    <HStack>
                        <Select
                            placeholder="..."
                            value={statut}
                            onChange={(e) => setStatut(e.target.value)}
                            variant="filled"
                        >
                            {data.questionnaire.statut !== "Bon" && <option value="Bon">Bon</option>}
                            {data.questionnaire.statut !== "Moyen" && <option value="Moyen">Moyen</option>}
                            {data.questionnaire.statut !== "Réclamation" && (
                                <option value="Réclamation">Réclamation</option>
                            )}
                        </Select>
                        <Button isDisabled={statut === "..."} onClick={onOpen}>
                            Valider
                        </Button>

                        {/* Fenetre de mail */}
                        <SendMailWindow statut={statut} id={id} data={data} onClose={onClose} isOpen={isOpen} />
                    </HStack>
                    {reclamationData &&
                        data.questionnaire.statut !== "Réclamation" &&
                        reclamationData.reclamationByReservationId.id && (
                            <VStack align="start">
                                <Divider my={4} />
                                <Text>
                                    Il existe déjà une{" "}
                                    <Link
                                        style={{ textDecoration: "underline" }}
                                        to={`/reclamations/${reclamationData.reclamationByReservationId.id}`}
                                    >
                                        réclamation
                                    </Link>{" "}
                                    pour cette réservation.
                                </Text>
                                <Button colorScheme="blue" onClick={linkQuestionnaireToExistingReclamation}>
                                    Lier
                                </Button>
                            </VStack>
                        )}
                </>
            )}
        </VStack>
    );
};

export default QuestActionsBlock;
