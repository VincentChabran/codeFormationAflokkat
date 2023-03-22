import { useNavigate } from "react-router-dom";
import { Heading, Button, Box, useColorModeValue, HStack, VStack, Radio } from "@chakra-ui/react";
import { RadioGroupControl } from "formik-chakra-ui";
import { Form, Formik } from "formik";
import InputField from "../form/InputField";
import * as yup from "yup";
import { useMutation } from "urql";

const creerCompteMutation = `
    mutation Mutation($input: SignupUserInput!) {
        SignUp(signupUserInput: $input) {
        id
        nom
        email
        role
        }
    }
`;

const schema = yup.object().shape({
   nom: yup
      .string()
      .matches(/^[a-zA-ZÀ-ÿ-. ]*$/, "Merci de renseigner un nom valide...")
      .required("Nom requis..."),
   role: yup.string(),
   email: yup.string().email("Format non valide pour un email...").required("Email requis..."),
   password: yup.string().required("Mot de passe requis..."),
});

const CreerCompte = () => {
   const bg = useColorModeValue("gray.400", "gray.600");
   const navigate = useNavigate();

   const [_, executeMutation] = useMutation(creerCompteMutation);

   const submit = (values: any, actions: any) => {
      const variables = {
         input: {
            nom: values.nom,
            role: values.role,
            email: values.email,
            password: values.password,
         },
      };
      actions.setSubmitting(true);
      executeMutation(variables).then(({ data }) => {
         console.log(data);
         if (data) {
            navigate("/comptes");
         }
      });
      actions.setSubmitting(false);
   };
   return (
      <>
         <Heading as="h4" size="md">
            Créer un compte
         </Heading>
         <Box m={4} p={4} bg={bg} borderRadius={10}>
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
                        <RadioGroupControl name="role">
                           <HStack spacing={8}>
                              <Radio value="commercial">Commercial</Radio>
                              <Radio value="base">Base</Radio>
                              <Radio value="direction">Direction</Radio>
                           </HStack>
                        </RadioGroupControl>
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

export default CreerCompte;
