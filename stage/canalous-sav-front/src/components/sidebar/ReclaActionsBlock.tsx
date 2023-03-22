import { useEffect, useState } from "react";
import { Button, HStack, Heading, Text, Select, VStack, Divider, Input } from "@chakra-ui/react";
import { useMutation, useQuery, useSubscription } from "urql";
import { useParams } from "react-router-dom";

import { useAccountStore } from "../../stores/useAccountStore";
import { useReclamationStore } from "../../stores/useReclamationStore";
import { scrollBarCSS } from "../../utils/scrollBarCss";

interface UtilisateurProps {
    id: number;
    nom: string;
}

const getUtilisateursQuery = `
  query Query {
    utilisateurs {
      id
      nom
      email
      role
    }
  }
`;

const updateReclamationMutation = `
  mutation Mutation($newParticipants: [UtilisateurInput!]!, $updateReclamationInput: UpdateReclamationInput!) {
    updateReclamation(newParticipants: $newParticipants, updateReclamationInput: $updateReclamationInput) {
      id
    }
  }
`;

const getParticipantsQuery = `
  query Query($reclamationId: Int!) {
    reclamation(id: $reclamationId) {
      id
      reclamation
      statut
      responsable {
        id
      }
      client {
        id
      }
      participants {
        id
        nom
        email
      }
    }
  }
`;

const createNotificationMutation = `
  mutation Mutation($createNotificationInput: CreateNotificationInput!) {
    createNotification(createNotificationInput: $createNotificationInput) {
      id
    }
  }
`;

const refetching = `
  subscription Subscription {
    refetching {
      ids
    }
  }
`;

const ReclaActionsBlock = () => {
    const { id: utilisateurId, role } = useAccountStore();
    const {
        id: reclamationId,
        responsableId,
        statut,
        geste,
        setReclamation,
        setStatut,
        setGeste,
    } = useReclamationStore();

    const { id: reclamationIdFromUrl } = useParams();

    const [newParticipantIdx, setNewParticipantIdx] = useState<number>(0);
    const [participantId, setParticipantId] = useState<number>(0);
    const [newResponsableId, setNewResponsableId] = useState<number>(0);

    const [{ data, fetching, error }] = useQuery({
        query: getUtilisateursQuery,
    });

    const [result, reexecuteQuery] = useQuery({
        query: getParticipantsQuery,
        variables: {
            reclamationId: reclamationId ? reclamationId : parseInt(reclamationIdFromUrl || "0"),
        },
    });

    const [_, executeMutation] = useMutation(updateReclamationMutation);

    const addNewParticipant = () => {
        executeMutation({
            newParticipants: [
                {
                    id: data?.utilisateurs[newParticipantIdx - 1].id,
                    nom: data?.utilisateurs[newParticipantIdx - 1].nom,
                    email: data?.utilisateurs[newParticipantIdx - 1].email,
                    role: data?.utilisateurs[newParticipantIdx - 1].role,
                },
            ],
            updateReclamationInput: {
                id: reclamationId,
            },
        }).then(() => {
            setNewParticipantIdx(0);
            result?.data?.reclamation?.participants.push({
                nom: data?.utilisateurs[newParticipantIdx - 1].nom,
                email: data?.utilisateurs[newParticipantIdx - 1].email,
            });
        });
    };

    const changeResponsable = () => {
        const variables = {
            updateReclamationInput: {
                id: reclamationId,
                responsableId: newResponsableId,
            },
            newParticipants: [],
        };
        executeMutation(variables).then(() => {
            setNewResponsableId(0);
        });
    };

    const changeStatut = (statut: string) => {
        executeMutation({
            updateReclamationInput: {
                id: reclamationId,
                statut,
            },
            newParticipants: [],
        }).then(() => {
            setStatut(statut);
        });
    };

    const [__, executeCreateNotificationMutation] = useMutation(createNotificationMutation);

    const askForRapport = () => {
        executeCreateNotificationMutation({
            createNotificationInput: {
                notification: `Vous avez été invité à remplir un rapport concernant la réclamation #${reclamationId}`,
                reclamationId,
                utilisateurId: participantId,
            },
        }).then(() => {
            setParticipantId(0);
            changeStatut("Constitution du dossier");
        });
    };

    const proposeGeste = () => {
        executeMutation({
            updateReclamationInput: {
                id: reclamationId,
                geste:
                    geste.type !== "Geste commercial"
                        ? `${geste.type} de ${geste.value}€`
                        : `${geste.type} : ${geste.value}`,
                statut: geste.type ? "Proposition du geste commercial" : "Constitution du dossier",
            },
            newParticipants: [],
        }).then(() => {
            setGeste("", "");
        });
    };

    const [resSubscription] = useSubscription(
        {
            query: refetching,
        },
        (previous: any, res: any) => {
            return res?.refetching?.ids;
        }
    );

    useEffect(() => {
        if (resSubscription?.data?.includes(utilisateurId)) {
            reexecuteQuery({ requestPolicy: "network-only" });
        }
    }, [resSubscription]);

    useEffect(() => {
        if (!reclamationId) {
            setReclamation({
                id: result?.data?.reclamation?.id,
                reclamation: result?.data?.reclamation?.reclamation,
                responsableId: result?.data?.reclamation?.responsable?.id,
                clientId: result?.data?.reclamation?.client?.id,
            });
            setStatut(result?.data?.reclamation?.statut);
        }
    }, [result]);

    return (
        <VStack align="start" spacing={4} h={`calc(100vh - 250px)`} overflowY="auto" css={scrollBarCSS}>
            <Heading as="h4" size="md">
                Actions
            </Heading>

            {utilisateurId !== result?.data?.reclamation.responsable.id && role !== "direction" && (
                <Text>Vous n'êtes pas le responsable de cette réclamation.</Text>
            )}

            {(utilisateurId === result?.data?.reclamation.responsable.id || role === "direction") && (
                <>
                    <HStack>
                        {/* <Text>Inviter </Text> */}
                        <Select
                            value={newParticipantIdx}
                            onChange={(e) => setNewParticipantIdx(parseInt(e.target.value))}
                            variant="filled"
                        >
                            <option value={0}>Inviter...</option>

                            {data?.utilisateurs
                                .sort((a: any, b: any) => {
                                    if (a["nom"].toLowerCase() < b["nom"].toLowerCase()) return -1;
                                    if (a["nom"].toLowerCase() > b["nom"].toLowerCase()) return 1;
                                    return 0;
                                })
                                .map(({ id, nom }: UtilisateurProps, index: number) => {
                                    if (!result?.data?.reclamation?.participants.some(({ id: ID }: any) => ID === id))
                                        return (
                                            <option key={id} value={index + 1}>
                                                {nom}
                                            </option>
                                        );
                                })}
                        </Select>

                        <Button isDisabled={newParticipantIdx === 0} colorScheme="blue" onClick={addNewParticipant}>
                            Ok
                        </Button>
                    </HStack>

                    <Text>Demander un rapport à :</Text>

                    <HStack>
                        <Select
                            value={participantId}
                            onChange={(e) => setParticipantId(parseInt(e.target.value))}
                            variant="filled"
                        >
                            <option value={0}>...</option>
                            {result?.data?.reclamation?.participants.map((participant: any) => {
                                if (participant.id !== utilisateurId)
                                    return (
                                        <option key={participant.id} value={participant.id}>
                                            {participant.nom}
                                        </option>
                                    );
                            })}
                        </Select>

                        <Button isDisabled={participantId === 0} colorScheme="blue" onClick={askForRapport}>
                            Valider
                        </Button>
                    </HStack>

                    <Text>Nommer un nouveau responsable :</Text>

                    <HStack>
                        <Select
                            value={newResponsableId}
                            onChange={(e) => setNewResponsableId(parseInt(e.target.value))}
                            variant="filled"
                        >
                            <option value={0}>...</option>
                            {result?.data?.reclamation?.participants.map((participant: any) => {
                                if (
                                    participant.id !== utilisateurId &&
                                    participant.id !== result?.data.reclamation.responsable.id
                                )
                                    return (
                                        <option key={participant.id} value={participant.id}>
                                            {participant.nom}
                                        </option>
                                    );
                            })}
                        </Select>

                        <Button isDisabled={newResponsableId === 0} colorScheme="blue" onClick={changeResponsable}>
                            Valider
                        </Button>
                    </HStack>

                    <Divider w="70%" />

                    <Text>Modifier le statut de la réclamation :</Text>

                    <HStack>
                        <Select
                            placeholder="..."
                            variant="filled"
                            value={statut}
                            onChange={(e) => changeStatut(e.target.value)}
                        >
                            <option value="Constitution du dossier">Constitution du dossier</option>
                            <option value="Proposition du geste commercial">Proposition du geste commercial</option>
                            <option value="Proposition au client">Proposition au client</option>
                            <option value="Cloturée">Cloturée</option>
                        </Select>
                    </HStack>

                    <Divider w="70%" />

                    <Text>Proposer un geste commercial :</Text>

                    <HStack align="end">
                        <VStack>
                            <Select
                                placeholder="..."
                                variant="filled"
                                value={geste?.type}
                                onChange={(e) => setGeste(e.target.value, "")}
                            >
                                <option value="Chèque croisière">Chèque croisière</option>
                                <option value="Remboursement">Remboursement</option>
                                <option value="Geste commercial">Geste commercial</option>
                            </Select>

                            {geste.type && (
                                <Input
                                    placeholder="Montant du geste"
                                    variant="filled"
                                    value={geste?.value}
                                    onChange={(e) => setGeste(geste.type, e.target.value)}
                                />
                            )}
                        </VStack>

                        <Button
                            colorScheme="blue"
                            onClick={proposeGeste}
                            isDisabled={geste.type && geste.value ? false : true}
                        >
                            Valider
                        </Button>
                    </HStack>
                </>
            )}
        </VStack>
    );
};

export default ReclaActionsBlock;
