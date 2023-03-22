import { useNavigate } from "react-router-dom";
import { Box, Button, HStack, Radio, useColorModeValue, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { RadioGroupControl, TextareaControl } from "formik-chakra-ui";
import { useMutation } from "urql";
import * as yup from "yup";

import { scrollBarCSS } from "../../../utils/scrollBarCss";
import { useAccountStore } from "../../../stores/useAccountStore";
import { useClientStore } from "../../../stores/useClientStore";
import { useReclamationStore } from "../../../stores/useReclamationStore";
import { useReservationStore } from "../../../stores/useReservationStore";

const schema = yup.object().shape({
   reclamation: yup.string().required("Il manque le plus important..."),
});

const createClientMutation = `
  mutation Mutation($createClientInput: CreateClientInput!) {
    createClient(createClientInput: $createClientInput) {
      id
    }
  }
`;

const createReservationMutation = `
  mutation Mutation($createReservationInput: CreateReservationInput!) {
    createReservation(createReservationInput: $createReservationInput) {
      id
    }
  }
`;

const createReclamationMutation = `
  mutation Mutation($langue: String, $reservationId: Int!, $baseIds: [Int!]!, $participants: [UtilisateurInput!]!, $createReclamationInput: CreateReclamationInput!) {
    createReclamation(langue: $langue, reservationId: $reservationId, baseIds: $baseIds, participants: $participants, createReclamationInput: $createReclamationInput) {
      id
      reclamation
      client {
        id
        nom
      }
      responsable {
        id
        nom
      }
      participants {
        nom
      }
    }
  }
`;

const FormForCreate = ({ clientData }: any) => {
   const bg = useColorModeValue("gray.300", "gray.600");

   const navigate = useNavigate();

   const { setReclamation } = useReclamationStore();
   const { id: responsableId, nom, email, role } = useAccountStore();
   const { id: clientId } = useClientStore();
   const {
      id: reservationId,
      prix,
      bateau,
      basedepart,
      basearrivee,
      nombasedepart,
      nombasearrivee,
      datedepart,
      datearrivee,
   } = useReservationStore();

   const [_, executeCreateClientMutation] = useMutation(createClientMutation);
   const [__, executeCreateReservationMutation] = useMutation(createReservationMutation);
   const [___, executeCreateReclamationMutation] = useMutation(createReclamationMutation);

   const submit = (values: any, actions: any) => {
      actions.setSubmitting(true);

      executeCreateClientMutation({
         createClientInput: {
            id: clientId,
            nom: clientData.getClientInfos[0].nom,
            email: clientData.getClientInfos[0].email,
            tel: clientData.getClientInfos[0].tel,
            portable: clientData.getClientInfos[0].portable,
            adresse: clientData.getClientInfos[0].adresse,
            codepostal: clientData.getClientInfos[0].codepostal,
            ville: clientData.getClientInfos[0].ville,
            pays: clientData.getClientInfos[0].pays,
         },
      }).then((resCreateClient) => {
         if (resCreateClient.data)
            executeCreateReservationMutation({
               createReservationInput: {
                  id: reservationId,
                  prix,
                  bateau,
                  basedepart,
                  basearrivee,
                  nombasedepart,
                  nombasearrivee,
                  datedepart,
                  datearrivee,
               },
            }).then((resCreateReservation) => {
               if (resCreateReservation.data) {
                  const variables = {
                     createReclamationInput: {
                        reclamation: values.reclamation,
                        clientId,
                        responsableId,
                     },
                     reservationId,
                     participants: [
                        {
                           id: responsableId,
                           nom,
                           email,
                           role,
                        },
                     ],
                     baseIds: basedepart === basearrivee ? [basedepart] : [basedepart, basearrivee],
                     langue: values.langue,
                  };
                  executeCreateReclamationMutation(variables).then((resCreateReclamation) => {
                     if (resCreateReclamation.data) {
                        setReclamation({
                           id: resCreateReclamation.data.createReclamation.id,
                           reclamation: resCreateReclamation.data.createReclamation.reclamation,
                           responsableId: resCreateReclamation.data.createReclamation.responsable?.id,
                           clientId: resCreateReclamation.data.createReclamation.client.id,
                        });
                        navigate(`/reclamations/${resCreateReclamation.data.createReclamation.id}`);
                     }
                  });
               }
            });
      });
      actions.setSubmitting(false);
   };

   return (
      <Box m={4} p={4} borderRadius={10} bg={bg}>
         <VStack align="stretch" spacing={4}>
            <Formik
               initialValues={{
                  reclamation: "",
                  langue: "",
               }}
               onSubmit={submit}
               validationSchema={schema}
            >
               {(formikProps) => (
                  <Form>
                     <VStack align="stretch" spacing={4} mb={4}>
                        <TextareaControl
                           label="Réclamation"
                           placeholder="Réclamation"
                           name="reclamation"
                           maxH={`calc(100vh - 270px)`}
                           pr={2}
                           overflowY="auto"
                           css={scrollBarCSS}
                        />
                        <RadioGroupControl name="langue">
                           <HStack spacing={8}>
                              <Radio value="fr">Fr</Radio>
                              <Radio value="en">En</Radio>
                              <Radio value="de">De</Radio>
                           </HStack>
                        </RadioGroupControl>
                     </VStack>
                     <Button
                        type="submit"
                        colorScheme="blue"
                        disabled={!(clientId && formikProps.values.langue && formikProps.values.reclamation)}
                     >
                        Créer réclamation
                     </Button>
                  </Form>
               )}
            </Formik>
         </VStack>
      </Box>
   );
};

export default FormForCreate;
