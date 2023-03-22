import { useParams } from "react-router-dom";
import { Center, Text, useColorModeValue, Button, VStack, RadioGroup, HStack, Radio, Textarea } from "@chakra-ui/react";
import { useMutation, useQuery } from "urql";
import { useState } from "react";

const updateReclamationMutation = `
  mutation Mutation($newParticipants: [UtilisateurInput!]!, $updateReclamationInput: UpdateReclamationInput!) {
    updateReclamation(newParticipants: $newParticipants, updateReclamationInput: $updateReclamationInput) {
      id
    }
  }
`;

const sendAnswerMutation = `
  mutation Mutation($updatePropositionInput: UpdatePropositionInput!) {
    updateProposition(updatePropositionInput: $updatePropositionInput) {
      id
    }
  }
`;

const getPropositionQuery = `
  query Query($propositionId: Int!) {
    proposition(id: $propositionId) {
      geste
      statut
      commentaire
    }
  }
`;

const ConfirmationGesteCommercial = () => {
    const bg = useColorModeValue("gray.300", "gray.600");

    const { reclamationId, propositionId } = useParams();

    const [result] = useQuery({
        query: getPropositionQuery,
        variables: {
            propositionId: propositionId && parseInt(propositionId),
        },
    });

    //console.log(propositionId);

    const [statut, setStatut] = useState("Acceptée");
    const [commentaire, setCommentaire] = useState("");

    const [reponse, setReponse] = useState(false);

    const [_, executeMutation] = useMutation(sendAnswerMutation);

    const [res, executeUpdateReclamationMutation] = useMutation(updateReclamationMutation);

    const sendAnswer = () => {
        executeMutation({
            updatePropositionInput: {
                id: propositionId && parseInt(propositionId),
                statut,
                commentaire,
            },
        })
            .then(() => {
                setReponse(true);
                executeUpdateReclamationMutation({
                    updateReclamationInput: {
                        id: reclamationId && parseInt(reclamationId),
                        statut: "Retour client",
                    },
                    newParticipants: [],
                }).catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

    return (
        <Center fontSize="xl" h={`calc(100vh - 32px)`}>
            <VStack maxW="80%" maxH="80%" bg={bg} p={10} borderRadius={6} spacing={8}>
                {reponse ? (
                    <>
                        <Text>Nous vous remercions de votre réponse.</Text>
                    </>
                ) : result?.data?.proposition.statut !== "En attente" ? (
                    <>
                        <Text>Vous avez déjà répondu à cette proposition.</Text>
                    </>
                ) : (
                    <>
                        <HStack>
                            <Text>Nous vous proposons le geste suivant : </Text>
                            <Text>{result?.data?.proposition.geste}</Text>
                        </HStack>
                        <RadioGroup mb={8} onChange={setStatut} value={statut}>
                            <HStack spacing={16}>
                                <Radio value="Acceptée">J'accepte</Radio>
                                <Radio value="Rejetée">Je refuse</Radio>
                            </HStack>
                        </RadioGroup>
                        <Textarea
                            label="Commentaire"
                            placeholder="Commentaire"
                            onChange={(e) => setCommentaire(e.target.value)}
                            value={commentaire}
                            isRequired={statut === "Rejetée"}
                        />
                        <Button
                            colorScheme="blue"
                            isDisabled={statut === "Rejetée" && !commentaire}
                            onClick={sendAnswer}
                        >
                            Valider
                        </Button>
                    </>
                )}
            </VStack>
        </Center>
    );
};

export default ConfirmationGesteCommercial;
