import { Box, useFocusEffect, VStack } from "@chakra-ui/react";
import { React } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputControl, SubmitButton } from "formik-chakra-ui";

const validationSchema = Yup.object({
    email: Yup.string().required("Email obligatoire").email("Vous devez renseigner un email"),
    password: Yup.string().required("Mot de passe obligatoire"),
});

const initialValues = {
    email: "",
    password: "",
};

const Formulaire = () => {
    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ handleSubmit, values }) => (
                <VStack as="form" onSubmit={handleSubmit} spacing={4}>
                    <InputControl name="email" label="Email" />
                    <InputControl name="password" label="Mot de pass" />
                    <SubmitButton>Soumettre</SubmitButton>
                </VStack>
            )}
        </Formik>
    );
};

export default Formulaire;
