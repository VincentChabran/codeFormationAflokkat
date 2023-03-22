import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Text, useColorModeValue, Button, VStack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useMutation } from "urql";
import * as yup from "yup";

import { setToken } from "../utils/token";
import InputField from "../components/form/InputField";
import { useAccountStore } from "../stores/useAccountStore";

const loginMutation = `
  mutation Mutation($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      utilisateur {
        id
        nom
        email
        role
      }
      access_token
    }
  }
`;

const schema = yup.object().shape({
   email: yup.string().email("Format non valide pour un email...").required("Email requis..."),
   password: yup.string().required("Mot de passe requis..."),
});

const initialValues = {
   email: "",
   password: "",
};

const Login = () => {
   const bg = useColorModeValue("gray.300", "gray.600");

   const navigate = useNavigate();
   const [errorMessage, setErrorMessage] = useState("Connectez-vous");

   const { setAccount } = useAccountStore();

   const [_, executeMutation] = useMutation(loginMutation);

   const submit = (values: any, actions: any) => {
      const variables = {
         input: {
            email: values.email,
            password: values.password,
         },
      };
      console.log(variables);

      actions.setSubmitting(true);
      executeMutation(variables).then(({ data, error }) => {
         console.log(data);

         if (data) {
            const { access_token, utilisateur } = data.login;

            if (access_token) {
               setToken(access_token);
               setAccount(utilisateur);
               window.location.reload();
            }
         }
         if (error) {
            values.email = "";
            values.password = "";
            setErrorMessage("Mauvais identifiants... Veuillez réessayer.");
         }
      });
      actions.setSubmitting(false);
   };

   return (
      <Center fontSize="xl" h={`calc(100vh - 32px)`}>
         <VStack minW="400px" bg={bg} p={10} borderRadius={6}>
            <Text mb={4}>{errorMessage}</Text>
            <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schema}>
               {(formikProps) => (
                  <Form
                     style={{
                        display: "flex",
                        flexDirection: "column",
                     }}
                  >
                     <InputField login={true} label="Email" name="email" placeholder="Email" />
                     <InputField
                        login={true}
                        label="Mot de passe"
                        name="password"
                        placeholder="Mot de passe"
                        type="password"
                     />
                     <Button type="submit" colorScheme="blue">
                        Se connecter
                     </Button>
                  </Form>
               )}
            </Formik>
         </VStack>
      </Center>
   );
};

export default Login;
