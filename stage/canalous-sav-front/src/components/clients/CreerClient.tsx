import { Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../form/InputField";
import * as yup from "yup";
import { useMutation } from "urql";
import { useClientStore } from "../../stores/useClientStore";

const creerClientMutation = `
  mutation Mutation($input: CreateClientInput!) {
    createClient(createClientInput: $input) {
      id
      nom
      email
      tel
    }
  }
`;

const schema = yup.object().shape({
    nom: yup
        .string()
        .matches(/^[A-Za-z ]*$/, "Merci de renseigner un nom valide...")
        .required("Nom requis..."),
    email: yup.string().email("Format non valide pour un email...").required("Email requis..."),
    tel: yup.string(),
});

const CreerClient = ({ setAddClient }: any) => {
    const { setClient } = useClientStore();

    const [state, executeMutation] = useMutation(creerClientMutation);

    const submit = (values: any, actions: any) => {
        const variables = {
            input: {
                nom: values.nom,
                email: values.email,
                tel: values.tel,
            },
        };
        actions.setSubmitting(true);
        executeMutation(variables).then(({ data }) => {
            if (data) {
                setClient(data.createClient);
                setAddClient(false);
            }
        });
        actions.setSubmitting(false);
    };

    return (
        <Formik
            initialValues={{
                nom: "",
                email: "",
                tel: "",
            }}
            onSubmit={submit}
            validationSchema={schema}
        >
            {(formikProps) => (
                <Form>
                    <Flex mx={8}>
                        <InputField label="Nom" name="nom" placeholder="Nom" />
                        <InputField label="Email" name="email" placeholder="Email" />
                        <InputField label="Téléphone" name="tel" placeholder="0123456789" />
                        <Button
                            type="submit"
                            colorScheme="teal"
                            mt={"26px"}
                            // isLoading={formikProps.isSubmitting}
                        >
                            OK
                        </Button>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
};

export default CreerClient;
