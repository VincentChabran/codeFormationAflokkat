import { EmailIcon } from "@chakra-ui/icons";
import {
   Button,
   HStack,
   Popover,
   PopoverArrow,
   PopoverContent,
   PopoverTrigger,
   Spacer,
   Tag,
   Text,
   Textarea,
   useBreakpointValue,
   useDisclosure,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useMutation } from "urql";

import { useAccountStore } from "../../../../stores/useAccountStore";
import { useApplicationStore } from "../../../../stores/useApplicationStore";
import { useReclamationStore } from "../../../../stores/useReclamationStore";

type ThirdRowProps = {
   reclamation: {
      geste: string;
      statut: string;
      propositions: [{ createdAt: string; geste: string; id: number; statut: string }];
      responsable: {
         id: number;
      };
   };
   emailSend: boolean;
   setEmailSend: Dispatch<SetStateAction<boolean>>;
};

// utiliser 2 fois , ici et dans Details.tsx
const updateReclamationMutation = `
  mutation Mutation($newParticipants: [UtilisateurInput!]!, $updateReclamationInput: UpdateReclamationInput!) {
    updateReclamation(newParticipants: $newParticipants, updateReclamationInput: $updateReclamationInput) {
      id
    }
  }
`;

const updatePropositionMutation = `
  mutation Mutation($updatePropositionInput: UpdatePropositionInput!) {
    updateProposition(updatePropositionInput: $updatePropositionInput) {
      id
    }
  }
`;

const ThirdRow = ({ reclamation, emailSend, setEmailSend }: ThirdRowProps) => {
   const { geste, statut, propositions, responsable } = reclamation;

   // Store
   const { role, id: utilisateurId } = useAccountStore();
   const { openMail } = useApplicationStore();
   const { id } = useReclamationStore();

   // State
   const [commentaire, setCommentaire] = useState("");

   const { onOpen, onClose, isOpen } = useDisclosure();

   // Mutation
   const [res6, executeUpdateReclamationMutation] = useMutation(updateReclamationMutation);

   const [__, executeUpdatePropositionMutation] = useMutation(updatePropositionMutation);

   // Fonction
   const validateGeste = () => {
      executeUpdateReclamationMutation({
         updateReclamationInput: {
            id,
            statut: "Geste commercial validé",
         },
         newParticipants: [],
      })
         .then((res) => console.log(res))
         .catch((err) => console.log(err));
   };

   const updateProposition = (statut: any, commentaire: any) => {
      executeUpdatePropositionMutation({
         updatePropositionInput: {
            id: propositions[propositions.length - 1].id,
            statut,
            commentaire,
         },
      })
         .then((resUpdateProposition) => {
            setCommentaire("");
            executeUpdateReclamationMutation({
               updateReclamationInput: {
                  id: id,
                  statut: "Retour client",
               },
               newParticipants: [],
            })
               .then((resUpdateReclamation) => {})
               .catch((err) => console.log(err));
         })
         .catch((err) => console.log(err));
   };

   // Pour le responcive des Button
   const size = useBreakpointValue({ sm: "xs", md: "xs", lg: "sm", xl: "sm", base: "sm" });

   return (
      <HStack>
         <Text fontWeight="bold" fontSize={14}>
            Proposition :{" "}
         </Text>

         <Text>{geste}</Text>

         {statut === "Geste commercial validé" ? (
            <Tag colorScheme="blue">Validé</Tag>
         ) : (
            geste === propositions[propositions.length - 1]?.geste && (
               <Tag
                  colorScheme={
                     propositions[propositions.length - 1].statut === "Acceptée"
                        ? "green"
                        : propositions[propositions.length - 1].statut === "Rejetée"
                        ? "red"
                        : "yellow"
                  }
               >
                  {propositions[propositions.length - 1].statut}
               </Tag>
            )
         )}
         <Spacer />

         {role === "direction" &&
         geste &&
         (statut === "Proposition du geste commercial" || statut === "Constitution du dossier") &&
         geste !== propositions[propositions.length - 1]?.geste ? (
            <Button colorScheme="blue" size="sm" onClick={validateGeste}>
               Valider la proposition
            </Button>
         ) : (
            <>
               {statut === "Proposition au client" && (
                  <HStack pr={4}>
                     {/* Pour le PopOver, useDisclosure */}
                     <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="bottom" closeOnBlur={true}>
                        <PopoverTrigger>
                           <Button leftIcon={<AiOutlineClose />} size={size} colorScheme="red">
                              Rejetée
                           </Button>
                        </PopoverTrigger>

                        <PopoverContent p={2} w={"460px"} minH="150px">
                           <PopoverArrow />
                           <Textarea
                              h="100%"
                              mb={2}
                              placeholder="Commentaires"
                              value={commentaire}
                              onChange={(e) => setCommentaire(e.target.value)}
                           />
                           <Button
                              colorScheme="blue"
                              onClick={() => {
                                 updateProposition("Rejetée", commentaire);
                                 onClose();
                              }}
                           >
                              Valider
                           </Button>
                        </PopoverContent>
                     </Popover>

                     <Button
                        leftIcon={<AiOutlineCheck />}
                        size={size}
                        colorScheme="green"
                        onClick={() => updateProposition("Acceptée", commentaire)}
                     >
                        Acceptée
                     </Button>
                  </HStack>
               )}
               <Button
                  colorScheme="blue"
                  size={statut === "Proposition au client" ? size : "sm"}
                  leftIcon={<EmailIcon />}
                  isDisabled={
                     !(
                        statut === "Geste commercial validé" ||
                        statut === "Proposition au client" ||
                        statut === "Retour client"
                     ) || !(role === "direction" || (role !== "direction" && utilisateurId === responsable.id))
                  }
                  onClick={() => {
                     openMail();
                     if (emailSend) setEmailSend(false);
                  }}
               >
                  {statut === "Proposition au client" ? "Email" : "Envoyer un mail au client"}
               </Button>
            </>
         )}
      </HStack>
   );
};

export default ThirdRow;
