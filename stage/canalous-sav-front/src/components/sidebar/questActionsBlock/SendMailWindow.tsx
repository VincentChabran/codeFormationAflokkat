import {
    Button,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Textarea,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import { useReclamationStore } from "../../../stores/useReclamationStore";
import MyCustomTag from "../../global/MyCustomTag";

const updateQuestionnaireMutation = `
  mutation Mutation($updateQuestionnaireInput: UpdateQuestionnaireInput!) {
    updateQuestionnaire(updateQuestionnaireInput: $updateQuestionnaireInput) {
      id
    }
  }
`;

const sendEmailMutation = `
  mutation Mutation($message: String!, $sujet: String!, $destinataire: String!) {
    sendRetourQuestionnaireEmail(message: $message, sujet: $sujet, destinataire: $destinataire)
  }
`;

const getEmailTemplateQuery = `
  query MailTemplate($mailTemplateId: Int!) {
    mailTemplate(id: $mailTemplateId) {
      id nom fr en de
    }
  }
`;

const SendMailWindow = ({ statut, id, data, onClose, isOpen }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [clientEmail, setClientEmail] = useState("");
    const [sujetEmail, setSujetEmail] = useState("Les Canalous - Merci de votre retour");

    const [emailLangage, setEmailLangage] = useState("FR");

    const [email, setEmail] = useState("");

    const { setChangeQuestionnaireToReclamation } = useReclamationStore();

    const toast = useToast();

    const [res, executeUpdateQuestionnaireMutation] = useMutation(updateQuestionnaireMutation);

    const [_, executeSendEmailMutation] = useMutation(sendEmailMutation);

    const changeStatut = () => {
        if (statut !== "...")
            executeUpdateQuestionnaireMutation({
                updateQuestionnaireInput: {
                    id,
                    statut,
                },
            }).then(() => {
                if (statut === "Réclamation" && !data.questionnaire.reclamation) setChangeQuestionnaireToReclamation();
            });
    };

    const sendEmail = () => {
        executeSendEmailMutation({
            destinataire: clientEmail,
            sujet: sujetEmail,
            message: email,
        })
            .then((res) => {
                if (res.data && res.data.sendRetourQuestionnaireEmail) {
                    changeStatut();
                    onClose();
                    setIsLoading(false);
                } else if (res.data && !res.data.sendRetourQuestionnaireEmail) {
                    setIsLoading(false);
                } else if (res.error) {
                    toast({
                        title: "Mail non envoyé...",
                        description: `${res.error.message}`,
                        status: "error",
                        isClosable: true,
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    const [{ data: bonTemplate }] = useQuery({
        query: getEmailTemplateQuery,
        variables: { mailTemplateId: 1 },
    });

    const [{ data: moyenTemplate }] = useQuery({
        query: getEmailTemplateQuery,
        variables: { mailTemplateId: 2 },
    });

    const [{ data: reclamationTemplate }] = useQuery({
        query: getEmailTemplateQuery,
        variables: { mailTemplateId: 3 },
    });

    useEffect(() => {
        if (statut === "Bon") {
            if (emailLangage === "FR") setEmail(bonTemplate.mailTemplate.fr);
            if (emailLangage === "EN") setEmail(bonTemplate.mailTemplate.en);
            if (emailLangage === "DE") setEmail(bonTemplate.mailTemplate.de);
        }
        if (statut === "Moyen") {
            if (emailLangage === "FR") setEmail(moyenTemplate.mailTemplate.fr);
            if (emailLangage === "EN") setEmail(moyenTemplate.mailTemplate.en);
            if (emailLangage === "DE") setEmail(moyenTemplate.mailTemplate.de);
        }
        if (statut === "Réclamation") {
            if (emailLangage === "FR") setEmail(reclamationTemplate.mailTemplate.fr);
            if (emailLangage === "EN") setEmail(reclamationTemplate.mailTemplate.en);
            if (emailLangage === "DE") setEmail(reclamationTemplate.mailTemplate.de);
        }
    }, [statut, emailLangage, bonTemplate, moyenTemplate, reclamationTemplate]);

    return (
        <Modal size="4xl" onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <HStack pl={2} pr={4}>
                        {/* Vignette pour sélectionner le langage */}
                        <MyCustomTag setEmailLangage={setEmailLangage} />

                        <Spacer />

                        <Heading size="md">Email</Heading>
                    </HStack>
                </ModalHeader>
                <ModalBody>
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
                            minH="300px"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </VStack>
                </ModalBody>
                <ModalFooter justifyContent="left">
                    <Button
                        colorScheme="blue"
                        onClick={() => {
                            changeStatut();
                            onClose();
                        }}
                    >
                        Valider sans envoyer d'email
                    </Button>
                    <Spacer />
                    <HStack spacing={2}>
                        <Button onClick={onClose}>Fermer</Button>
                        <Button
                            colorScheme="blue"
                            isLoading={isLoading}
                            loadingText="Envoi en cours..."
                            onClick={() => {
                                setIsLoading(true);
                                sendEmail();
                            }}
                        >
                            Envoyer
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SendMailWindow;
