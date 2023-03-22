import { Heading, Button, Box, useColorModeValue, HStack, VStack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../form/InputField";
import * as yup from "yup";
import { useMutation } from "urql";
import { useAccountStore } from "../../stores/useAccountStore";
import { setToken } from "../../utils/token";

const updateUtilisateurQuery = `
    mutation Mutation($updateUtilisateurInput: UpdateUtilisateurInput!) {
        updateUtilisateur(updateUtilisateurInput: $updateUtilisateurInput) {
            access_token
            utilisateur {
                id nom email role
            }
        }
    }
`;

const schema = yup.object().shape({
    nom: yup.string().matches(/^[a-zA-ZÀ-ÿ-. ]*$/, "Merci de renseigner un nom valide..."),
    email: yup.string().email("Format non valide pour un email..."),
    password: yup.string(),
});

const ModifierCompte = () => {
    const bg = useColorModeValue("gray.400", "gray.600");

    const { id: utilisateurId, nom, email, role, setAccount } = useAccountStore();

    const [, executeMutation] = useMutation(updateUtilisateurQuery);

    const submit = (values: any, actions: any) => {
        const variables = {
            updateUtilisateurInput: {
                id: utilisateurId,
                ...(values.nom && { nom: values.nom }),
                ...(values.email && { email: values.email }),
                ...(values.password && { password: values.password }),
            },
        };
        actions.setSubmitting(true);
        executeMutation(variables).then(({ data }) => {
            if (data) {
                values.nom = "";
                values.email = "";
                values.password = "";
                const { access_token, utilisateur } = data.updateUtilisateur;
                if (access_token) {
                    setToken(access_token);
                    setAccount(utilisateur);
                }
            }
        });
        actions.setSubmitting(false);
    };

    return (
        <>
            <Heading as="h4" size="md">
                Modifier mon compte
            </Heading>
            <HStack m={4} spacing={1}>
                <Text fontWeight={"bold"}>{nom} - </Text>
                <Text>{email} - </Text>
                <Text fontWeight={"light"}>{role}</Text>
            </HStack>
            <Box m={4} p={4} bg={bg} borderRadius={10}>
                <Text mb={4}>Modifier : </Text>
                <Formik
                    initialValues={{
                        nom: "",
                        role: "",
                        email: "",
                        password: "",
                    }}
                    onSubmit={submit}
                    validationSchema={schema}
                >
                    {(formikProps) => (
                        <Form
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <VStack align="stretch" spacing={4} mb={4}>
                                <HStack align="start">
                                    <InputField label="Nom" name="nom" placeholder="Nom" />
                                    <InputField label="Email" name="email" placeholder="Email" />
                                    <InputField label="Mot de passe" name="password" placeholder="Mot de passe" />
                                </HStack>
                            </VStack>
                            <Button type="submit" colorScheme="blue" w="100px" isLoading={formikProps.isSubmitting}>
                                Valider
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </>
    );
};

export default ModifierCompte;
