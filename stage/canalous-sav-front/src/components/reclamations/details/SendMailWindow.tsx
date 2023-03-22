import {
    Box,
    Button,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Spacer,
    Text,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";

import { useClientStore } from "../../../stores/useClientStore";
import { useReclamationStore } from "../../../stores/useReclamationStore";
import MyCustomTag from "../../global/MyCustomTag";

type SendMailWindowProps = {
    reclamation: {
        geste: string;
        client: {
            nom: string;
        };
    };
    bg: string;
    emailSend: boolean;
    setEmailSend: Dispatch<SetStateAction<boolean>>;
};

const sendEmailMutation = `
mutation Mutation($message: String!, $geste: String!, $nom: String!, $sujet: String!, $destinataire: String!, $propositionId: Float!, $reclamationId: Float!) {
  sendEmail(message: $message, geste: $geste, nom: $nom, sujet: $sujet, destinataire: $destinataire, propositionId: $propositionId, reclamationId: $reclamationId)
}
`;

const createPropositionMutation = `
  mutation Mutation($createPropositionInput: CreatePropositionInput!) {
    createProposition(createPropositionInput: $createPropositionInput) {
      id
      geste
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

const getEmailTemplateQuery = `
  query MailTemplate($mailTemplateId: Int!) {
    mailTemplate(id: $mailTemplateId) {
      id
      nom
      fr
      en
      de
    }
  }
`;

const SendMailWindow = ({ reclamation, bg, emailSend, setEmailSend }: SendMailWindowProps) => {
    // Store
    const { email: clientEmail, setEmail: setClientEmail } = useClientStore();
    const { id } = useReclamationStore();

    // Query / Mutation
    const [res4, executeSendEmailMutation] = useMutation(sendEmailMutation);
    const [res5, executeCreatePropositionMutation] = useMutation(createPropositionMutation);
    const [res6, executeUpdateReclamationMutation] = useMutation(updateReclamationMutation);

    const [{ data: mailTemplateData }] = useQuery({
        query: getEmailTemplateQuery,
        variables: { mailTemplateId: 4 },
    });

    // State
    const [sujetEmail, setSujetEmail] = useState("Les Canalous - Proposition de geste commercial");
    const [email, setEmail] = useState("");
    const [emailLangage, setEmailLangage] = useState("FR");

    // set le langage
    useEffect(() => {
        if (mailTemplateData) {
            if (emailLangage === "FR")
                setEmail(
                    mailTemplateData.mailTemplate.fr
                        .replace("#geste", reclamation?.geste)
                        .replace("#nom", reclamation?.client.nom)
                );
            if (emailLangage === "EN") setEmail(mailTemplateData.mailTemplate.en);
            if (emailLangage === "DE") setEmail(mailTemplateData.mailTemplate.de);
        }
    }, [reclamation?.geste, emailLangage, mailTemplateData]);

    // Fonction
    const sendEmail = () => {
        executeCreatePropositionMutation({
            createPropositionInput: {
                geste: reclamation.geste,
                statut: "En attente",
                reclamationId: id,
            },
        })
            .then((resCreateProposition) => {
                executeSendEmailMutation({
                    destinataire: clientEmail,
                    sujet: sujetEmail,
                    nom: reclamation.client.nom,
                    reclamationId: id,
                    propositionId: resCreateProposition.data.createProposition.id,
                    geste: resCreateProposition.data.createProposition.geste,
                    message: email,
                })
                    .then((resSendEmail) => {
                        console.log(resSendEmail);
                        setEmailSend(true);
                        executeUpdateReclamationMutation({
                            updateReclamationInput: {
                                id,
                                statut: "Proposition au client",
                            },
                            newParticipants: [],
                        }).catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

    return (
        <Box
            flex="1"
            h={`calc(100vh - 309px)`}
            p="10px"
            color="white"
            bg={bg}
            rounded="md"
            shadow="md"
            position="relative"
        >
            {emailSend ? (
                <Text p={4} fontSize={18}>
                    Le mail a bien été envoyé au client !
                </Text>
            ) : (
                <>
                    <HStack pl={2} pr={4}>
                        {/* Vignette pour sélectionner le langage */}
                        <MyCustomTag setEmailLangage={setEmailLangage} />

                        <Spacer />

                        <Heading size="md">Email</Heading>
                    </HStack>

                    <VStack align="stretch" m={2} h="80%" spacing={4}>
                        <HStack spacing={4}>
                            <InputGroup w="75%">
                                <InputLeftAddon children="Email" />

                                <Input
                                    placeholder="Email client"
                                    variant="filled"
                                    value={clientEmail}
                                    onChange={(e) => setClientEmail(e.target.value)}
                                />
                            </InputGroup>

                            <InputGroup>
                                <InputLeftAddon children="Sujet" />
                                <Input
                                    placeholder="Sujet"
                                    w="100%"
                                    variant="filled"
                                    value={sujetEmail}
                                    onChange={(e) => setSujetEmail(e.target.value)}
                                />
                            </InputGroup>
                        </HStack>

                        <Textarea
                            placeholder="Message..."
                            h="100%"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </VStack>

                    <Button
                        colorScheme="blue"
                        size="sm"
                        position="absolute"
                        right={2}
                        bottom={2}
                        onClick={() => {
                            sendEmail();
                        }}
                    >
                        Envoyer
                    </Button>
                </>
            )}
        </Box>
    );
};

export default SendMailWindow;
