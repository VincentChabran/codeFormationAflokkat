import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, VStack, HStack, useBreakpointValue } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useQuery, useSubscription } from "urql";

import { useAccountStore } from "../../stores/useAccountStore";
import { useApplicationStore } from "../../stores/useApplicationStore";
import { useReclamationStore } from "../../stores/useReclamationStore";
import { useClientStore } from "../../stores/useClientStore";

import FirstRow from "./details/header/FirstRow";
import SecondRow from "./details/header/SecondRow";
import ThirdRow from "./details/header/ThirdRow";
import AccordionRow from "./details/header/AccordionRow";
import Rapport from "./details/Rapport";
import LeftButtonsBar from "./details/body/LeftButtonsBar";
import RapportsWindow from "./details/body/RapportsWindow";
import AttachementsWindow from "./details/body/AttachementsWindow";
import PropositionsWindow from "./details/body/PropositionsWindow";
import LogsWindow from "./details/body/LogsWindow";
import MessagerieWindow from "./details/body/MessagerieWindow";
import SendMailWindow from "./details/SendMailWindow";
import RapportList from "./details/body/RapportList";

const getReclamationQuery = `
  query Reclamation($id: Int!) {
    reclamation(id: $id) {
      id 
      reclamation 
      statut 
      geste
      client {
        nom email tel
      }
      responsable {
        id nom email role
      }
      reservation {
        id prix bateau datedepart datearrivee nombasedepart nombasearrivee
      }
      questionnaire {
        id
      }
      rapports {
        clientImmobilise clientImmobiliseRaison dureeImmobilisation 
        gesteCommercial geste montantGeste 
        sinistre natureSinistre 
        rapport
        auteur {
          nom
        }
        createdAt
      }
      messages {
        message
        auteur {
          nom
        }
        createdAt
      }
      propositions {
        id geste statut commentaire createdAt
      }
      participants {
        id nom email role
      }
      files { id filename }
      logs { log createdAt }
      createdAt
    }
  }
`;

const getNewNotificationsSubscription = `
  subscription Subscription {
    newRapportNotification {
      id
    }
  }
`;

const getNewMessageSubscription = `
  subscription Subscription {
    newMessageNotification {
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

const Details = () => {
    const bg = useColorModeValue("gray.400", "gray.600");
    // BreakPoint MarginTop for info window
    const mtBp = useBreakpointValue({ sm: 6, md: 6, lg: 0, xl: 0 });

    const { id: reclamationId } = useParams();

    // Store
    // Toutes les variables du store Application pour ouvrir/fermer les différentes parties de cette page
    const {
        panelsState: {
            isReclamationOpen,
            isMessagerieOpen,
            isRapportOpen,
            isNewRapportOpen,
            isMailOpen,
            isPropositionsOpen,
            isAttachmentsOpen,
            isLogsOpen,
        },
    } = useApplicationStore();

    const { id: utilisateurId } = useAccountStore();
    const { id, setStatut } = useReclamationStore();
    const { setEmail: setClientEmail } = useClientStore();

    const [{ data, fetching, error }, reexecuteQuery] = useQuery({
        query: getReclamationQuery,
        variables: { id: id || parseInt(reclamationId || "1") },
    });

    useEffect(() => {
        setStatut(data?.reclamation?.statut);
        // Passe par le store a la palce d'un state
        setClientEmail(data?.reclamation.client.email);
    }, [fetching]);

    const [rapportToDisplay, setRapportToDisplay] = useState(0);
    const [emailSend, setEmailSend] = useState(false);

    const handleSubscription = (previous: any, res: any) => {
        return res?.newRapportNotification?.id;
    };

    const handleMessageSubscription = (previous: any, res: any) => {
        return res?.newMessageNotification?.id;
    };

    const [res] = useSubscription(
        {
            query: getNewNotificationsSubscription,
        },
        handleSubscription
    );

    const [res2] = useSubscription(
        {
            query: getNewMessageSubscription,
        },
        handleMessageSubscription
    );

    const [resRefetchingSubscription] = useSubscription(
        {
            query: refetching,
        },
        (previous: any, res: any) => {
            return res?.refetching?.ids;
        }
    );

    useEffect(() => {
        if (
            res?.data === utilisateurId ||
            res2?.data === utilisateurId ||
            resRefetchingSubscription?.data?.includes(utilisateurId)
        ) {
            reexecuteQuery({ requestPolicy: "network-only" });
        }
    }, [res, res2, resRefetchingSubscription]);

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollBottom = (behavior: ScrollBehavior) => {
        messagesEndRef?.current?.scrollIntoView({
            behavior,
            block: "end",
            inline: "nearest",
        });
    };

    useEffect(() => {
        if (!isReclamationOpen && isMessagerieOpen) scrollBottom("smooth");
    }, [data?.reclamation?.messages.length]);

    useEffect(() => {
        if (!isReclamationOpen && isMessagerieOpen) scrollBottom("auto");
    }, [isReclamationOpen, isMessagerieOpen]);

    return (
        <>
            {data && (
                <>
                    {/* Partie supérieure toujours visible */}
                    <Box m={4} p={4} bg={bg} borderRadius={10}>
                        <VStack spacing={3} align="items-start">
                            {/* Première ligne */}
                            <FirstRow reclamation={data.reclamation} />

                            {/* Deuxième ligne */}
                            <SecondRow reclamation={data.reclamation} />

                            {/* Troisième ligne */}
                            {data.reclamation.geste && (
                                <ThirdRow
                                    reclamation={data.reclamation}
                                    emailSend={emailSend}
                                    setEmailSend={setEmailSend}
                                />
                            )}

                            {/* Partie Accordéon */}
                            <AccordionRow reclamation={data.reclamation} />
                        </VStack>
                    </Box>

                    {/* Partie rapport ouvert et fermé avec le bouton Rapport */}
                    {isNewRapportOpen && <Rapport reclamation={data.reclamation} bg={bg} />}

                    <HStack m={4} spacing={4} align="start" mt={mtBp}>
                        {/* Boutons de gauche - Application Store */}
                        <LeftButtonsBar />

                        {/* Fenêtre Messagerie */}
                        {isMessagerieOpen && (
                            <MessagerieWindow reclamation={data.reclamation} messagesEndRef={messagesEndRef} bg={bg} />
                        )}

                        {/* Fenêtre rapport */}
                        {isRapportOpen && (
                            <RapportsWindow
                                reclamation={data.reclamation}
                                rapportToDisplay={rapportToDisplay}
                                bg={bg}
                            />
                        )}

                        {/* Fenêtre propositions */}
                        {isPropositionsOpen && <PropositionsWindow reclamation={data.reclamation} bg={bg} />}

                        {/* Fenêtre Pièces jointes */}
                        {isAttachmentsOpen && <AttachementsWindow bg={bg} reclamation={data.reclamation} />}

                        {/* Fenêtre historique */}
                        {isLogsOpen && (
                            <LogsWindow reclamation={data.reclamation} bg={bg} messagesEndRef={messagesEndRef} />
                        )}

                        {/* Fenêtre mail */}
                        {isMailOpen && (
                            <SendMailWindow
                                reclamation={data.reclamation}
                                bg={bg}
                                emailSend={emailSend}
                                setEmailSend={setEmailSend}
                            />
                        )}

                        {/* Liste des rapports */}
                        {(isMessagerieOpen || isRapportOpen || 1) && (
                            <RapportList reclamation={data.reclamation} setRapportToDisplay={setRapportToDisplay} />
                        )}
                    </HStack>
                </>
            )}
        </>
    );
};

export default Details;
