import { DeleteIcon, WarningTwoIcon } from "@chakra-ui/icons";
import {
   Button,
   HStack,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
   useBreakpointValue,
   useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "urql";

import { useReclamationStore } from "../../../../stores/useReclamationStore";

const removeReclamationMutation = `
mutation Mutation($removeReclamationId: Int!) {
    removeReclamation(id: $removeReclamationId) {
      id
    }
  }
`;

const updateQuestionnaireMutation = `
mutation Mutation($updateQuestionnaireInput: UpdateQuestionnaireInput!) {
   updateQuestionnaire(updateQuestionnaireInput: $updateQuestionnaireInput) {
     id
   }
 }
`;

const CustomDeleteRecla = ({ questionnaireId }: any) => {
   // Store
   const { id } = useReclamationStore();

   const navigate = useNavigate();

   const size = useBreakpointValue({ sm: "xs", md: "xs", lg: "sm", xl: "sm", base: "sm" });
   const { isOpen, onOpen, onClose } = useDisclosure();

   const [_, executeRemoveReclamationMutation] = useMutation(removeReclamationMutation);
   const [__, executeUpdateQuestionnaireMutation] = useMutation(updateQuestionnaireMutation);

   const removeReclamation = () => {
      executeRemoveReclamationMutation({
         removeReclamationId: id,
      })
         .then((resRemove) => {
            if (questionnaireId) {
               executeUpdateQuestionnaireMutation({
                  updateQuestionnaireInput: {
                     id: questionnaireId,
                     statut: "Consulté",
                  },
               });
            }
         })
         .then(() => {
            // window.location.reload();
            navigate("/reclamations");
         })
         .catch((err) => console.log(err));
   };

   return (
      <>
         <Button leftIcon={<DeleteIcon />} size={size} px="20px !important" colorScheme="red" onClick={onOpen}>
            Supprimer
         </Button>

         <Modal onClose={onClose} isOpen={isOpen} size="xl">
            <ModalOverlay />
            <ModalContent>
               <ModalHeader textAlign="center" textDecoration="underline">
                  <WarningTwoIcon color="orange.400" />
                  Warning !
               </ModalHeader>
               <ModalCloseButton />

               <ModalBody m="auto" py={5}>
                  <HStack>
                     <Text textAlign="center">Confirmez-vous la suppression définitive de la réclamation ?</Text>
                  </HStack>
               </ModalBody>

               <ModalFooter m="auto">
                  <HStack spacing={5}>
                     <Button bg="red.600" _hover={{ bg: "red.800" }} fontStyle="italic" onClick={onClose}>
                        Non
                     </Button>
                     <Button
                        bg="green"
                        _hover={{ bg: "green.600" }}
                        fontStyle="italic"
                        onClick={() => {
                           removeReclamation();
                           onClose;
                        }}
                     >
                        Oui
                     </Button>
                  </HStack>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

export default CustomDeleteRecla;
