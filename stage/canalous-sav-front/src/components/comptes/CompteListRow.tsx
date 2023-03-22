import { CheckIcon, DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import {
   Button,
   HStack,
   IconButton,
   Popover,
   PopoverArrow,
   PopoverBody,
   PopoverCloseButton,
   PopoverContent,
   PopoverTrigger,
   Td,
   Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "urql";

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

const removeUtilisateurMutation = `
mutation RemoveUtilisateur($removeUtilisateurId: Int!) {
   removeUtilisateur(id: $removeUtilisateurId) {
     id
   }
 }
`;

const updateResponsableReclamation = `
mutation Mutation($newParticipants: [UtilisateurInput!]!, $updateReclamationInput: UpdateReclamationInput!) {
   updateReclamation(newParticipants: $newParticipants, updateReclamationInput: $updateReclamationInput) {
     id
   }
 }
`;

const CompteListRow = ({ nom, email, role, id, estResponsable, reExecuteGetUtilisateurQuery }: any) => {
   const [check, setCheck] = useState(-1);

   // Reste Password
   const [, executeMutation] = useMutation(updateUtilisateurQuery);

   const resetPassword = (id: number) => {
      const variables = {
         updateUtilisateurInput: {
            id,
            password: "password",
         },
      };
      executeMutation(variables).then(({ data, error }) => {
         setCheck(id);
         console.log(error);
      });
   };

   // Delete User
   const [, executeRemoveUtilisateurMutation] = useMutation(removeUtilisateurMutation);
   const [, executeUpdateResponsableRecla] = useMutation(updateResponsableReclamation);

   const deleteAccount = (utilisateurId: number) => {
      if (estResponsable.length > 0) {
         estResponsable.forEach(({ id }: any) => {
            executeUpdateResponsableRecla({
               updateReclamationInput: {
                  id,
                  responsableId: 1,
               },
               newParticipants: [],
            })
               .then(() => {
                  executeRemoveUtilisateurMutation({ removeUtilisateurId: utilisateurId }).then((res) => {
                     reExecuteGetUtilisateurQuery({ requestPolicy: "network-only" });
                  });
               })
               .catch((err) => console.log(err));
         });
      } else {
         executeRemoveUtilisateurMutation({ removeUtilisateurId: utilisateurId })
            .then((res) => {
               reExecuteGetUtilisateurQuery({ requestPolicy: "network-only" });
            })
            .catch((err) => console.log(err));
      }
   };

   return (
      <>
         <Td>{nom}</Td>
         <Td>{email}</Td>
         <Td>{role.charAt(0).toUpperCase() + role.slice(1)}</Td>

         <Td pr={0}>
            <Popover placement="left">
               <PopoverTrigger>
                  <IconButton
                     icon={check === id ? <CheckIcon /> : <RepeatIcon />}
                     size="xs"
                     aria-label="Reset password"
                  />
               </PopoverTrigger>

               <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                     <HStack align="stretch">
                        <Text m="auto">Réinitialiser le mot de passe de {nom}</Text>
                        <Button colorScheme="blue" onClick={() => resetPassword(id)}>
                           Oui
                        </Button>
                     </HStack>
                  </PopoverBody>
               </PopoverContent>
            </Popover>
         </Td>

         <Td pr={0}>
            <Popover placement="left">
               <PopoverTrigger>
                  <IconButton
                     icon={check === id ? <CheckIcon /> : <DeleteIcon />}
                     size="xs"
                     aria-label="Delete account"
                  />
               </PopoverTrigger>

               <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                     <HStack align="stretch">
                        <Text m="auto">Supprimer le compte de {nom}</Text>
                        <Button colorScheme="blue" onClick={() => deleteAccount(id)}>
                           Oui
                        </Button>
                     </HStack>
                  </PopoverBody>
               </PopoverContent>
            </Popover>
         </Td>
      </>
   );
};

export default CompteListRow;
