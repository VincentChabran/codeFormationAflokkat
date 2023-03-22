import { Box, Button, Heading, HStack, useColorModeValue, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { CheckboxSingleControl, InputControl, TextareaControl } from "formik-chakra-ui";
import { useMutation } from "urql";
import * as yup from "yup";

import { scrollBarCSS } from "../../../utils/scrollBarCss";
import { useApplicationStore } from "../../../stores/useApplicationStore";
import { useAccountStore } from "../../../stores/useAccountStore";
import { useReclamationStore } from "../../../stores/useReclamationStore";

type RapportProps = {
   reclamation: {
      geste: string;
   };
   bg: string;
};

const validationSchema = yup.object().shape({
   clientImmobilise: yup.boolean().required(),
   clientImmobiliseRaison: yup.string().when("clientImmobilise", {
      is: true,
      then: yup.string().required("Obligatoire"),
   }),
   dureeImmobilisation: yup.string().when("clientImmobilise", {
      is: true,
      then: yup.string().required("Obligatoire"),
   }),
   gesteCommercial: yup.boolean().required(),
   geste: yup.string().when("gesteCommercial", {
      is: true,
      then: yup.string().required("Obligatoire"),
   }),
   montantGeste: yup.number().nullable().typeError("Merci de renseigner un nombre"),
   sinistre: yup.boolean().required(),
   natureSinistre: yup.string().when("sinistre", {
      is: true,
      then: yup.string().required("Obligatoire"),
   }),
   rapport: yup.string(),
});

const createRapportMutation = `
  mutation Mutation($createRapportInput: CreateRapportInput!) {
    createRapport(createRapportInput: $createRapportInput) {
      id
    }
  }
`;

const Rapport = ({ reclamation, bg }: RapportProps) => {
   // Store
   const { openRapport } = useApplicationStore();
   const { id: utilisateurId } = useAccountStore();
   const { id } = useReclamationStore();

   // Mutation
   const [_, executeMutation] = useMutation(createRapportMutation);

   const submit = (values: any, actions: any) => {
      executeMutation({
         createRapportInput: {
            clientImmobilise: values.clientImmobilise,
            clientImmobiliseRaison: values.clientImmobiliseRaison,
            dureeImmobilisation: values.dureeImmobilisation,
            gesteCommercial: values.gesteCommercial,
            geste: values.geste,
            montantGeste: parseInt(values.montantGeste),
            sinistre: values.sinistre,
            natureSinistre: values.natureSinistre,
            rapport: values.rapport,
            auteurId: utilisateurId,
            reclamationId: id,
         },
      }).then((res) => {
         openRapport();
      });
   };

   return (
      <Box m={4} p={4} bg={bg} borderRadius={10}>
         <VStack
            align="stretch"
            mx={1}
            spacing={4}
            overflowY="auto"
            h={`calc(100vh - 295px - ${reclamation.geste ? "44px" : "0px"})`}
            css={scrollBarCSS}
         >
            <Heading as="h5" size="sm">
               Remplir le rapport
            </Heading>
            <Formik
               initialValues={{
                  clientImmobilise: false,
                  clientImmobiliseRaison: "",
                  dureeImmobilisation: "",
                  gesteCommercial: false,
                  geste: "",
                  montantGeste: "",
                  sinistre: false,
                  natureSinistre: "",
                  rapport: "",
               }}
               onSubmit={submit}
               validationSchema={validationSchema}
            >
               {({ values }) => (
                  <Form>
                     <VStack px={2} align="stretch">
                        <CheckboxSingleControl name="clientImmobilise">
                           Le client a-t-il été immobilisé ?
                        </CheckboxSingleControl>

                        {values.clientImmobilise && (
                           <HStack spacing={2} align="stretch">
                              <InputControl name="clientImmobiliseRaison" label="Raison" />
                              <InputControl name="dureeImmobilisation" label="Durée" w="30%" />
                           </HStack>
                        )}

                        <CheckboxSingleControl name="gesteCommercial">
                           Avez-vous fait un geste commercial ?
                        </CheckboxSingleControl>

                        {values.gesteCommercial && (
                           <HStack spacing={2} align="stretch">
                              <InputControl name="geste" label="Geste Proposé" />
                              <InputControl name="montantGeste" label="Montant (€)" w="30%" />
                           </HStack>
                        )}

                        <CheckboxSingleControl name="sinistre">
                           Y a-t-il eu un sinistre pour ce client ?
                        </CheckboxSingleControl>

                        {values.sinistre && <InputControl name="natureSinistre" label="Nature du sinistre" />}

                        <TextareaControl name="rapport" label="Commentaires (optionnel)" py={4} />
                     </VStack>

                     <Button type="submit" colorScheme="blue">
                        Créer rapport
                     </Button>
                  </Form>
               )}
            </Formik>
         </VStack>
      </Box>
   );
};

export default Rapport;
