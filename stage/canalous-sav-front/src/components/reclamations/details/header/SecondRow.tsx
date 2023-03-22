import { useState } from "react";
import axios from "axios";
import { AttachmentIcon } from "@chakra-ui/icons";
import {
   Button,
   HStack,
   IconButton,
   Input,
   Popover,
   PopoverArrow,
   PopoverBody,
   PopoverCloseButton,
   PopoverContent,
   PopoverHeader,
   PopoverTrigger,
   Spacer,
   Text,
   Tooltip,
   useBreakpointValue,
   useDisclosure,
   VStack,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import CustomDeleteRecla from "./CustomDeleteRecla";

import { getToken } from "../../../../utils/token";
import { useReclamationStore } from "../../../../stores/useReclamationStore";
import { useApplicationStore } from "../../../../stores/useApplicationStore";
import { useAccountStore } from "../../../../stores/useAccountStore";

type SecondRowProps = {
   reclamation: {
      participants: [{ id: number; nom: string; email: string; role: string }];
      responsable: {
         id: number;
      };
      questionnaire: {
         id: number;
      };
   };
};

const SecondRow = ({ reclamation }: SecondRowProps) => {
   const { participants, responsable, questionnaire } = reclamation;

   // Store
   const { role } = useAccountStore();
   const { id } = useReclamationStore();
   const { openOrCloseNewRapport, openAttachments } = useApplicationStore();

   // State
   // Partie Ajouter une pièce jointe
   const [fileList, setFileList] = useState<FileList | null>(null);

   const { onOpen, onClose, isOpen } = useDisclosure();

   // Fonction
   const uploadFile = async () => {
      const files = fileList && [...fileList];

      if (files) {
         const formData = new FormData();

         const operations = {
            query: "mutation UploadFile($file: Upload!, $reclamationId: Float!) { uploadFile(file: $file, reclamationId: $reclamationId) }",
            variables: { file: null, reclamationId: id },
         };
         const map = {
            0: ["variables.file"],
         };

         formData.append("operations", JSON.stringify(operations));
         formData.append("map", JSON.stringify(map));
         formData.append("0", files[0]);

         // Placer l'URL dans un fichier séparé
         try {
            const response = await axios({
               method: "post",
               url: "https://serviceclient.lescanalous.com/graphql",
               data: formData,
               headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${getToken()}`,
               },
            });
            if (response) {
               setFileList(null);
               onClose();
               openAttachments();
            }
            console.log(response);
         } catch (error) {
            console.log(error);
         }
      }
   };

   // Pour le responcive des Button
   const size = useBreakpointValue({ sm: "xs", md: "xs", lg: "sm", xl: "sm", base: "sm" });

   return (
      <HStack spacing={1}>
         <Text fontSize={14} whiteSpace="nowrap">
            Responsable :
         </Text>

         {participants.map(({ id, nom, email, role }: any) => (
            // Cette balise est là pour la key, à check pour le rendu final
            <HStack key={email}>
               {id === responsable.id && (
                  <>
                     {/* InfoBulle Responsable */}
                     <Tooltip hasArrow label={`${email} - Rôle : ${role}`}>
                        <Text fontSize={14} whiteSpace="nowrap" color="yellow.400" pr={1}>
                           {nom}
                        </Text>
                     </Tooltip>

                     <Text fontSize={14} pr={1}>
                        |
                     </Text>
                  </>
               )}
            </HStack>
         ))}

         {/* InfoBulle autre participant */}
         <Tooltip
            hasArrow
            label={participants.map(({ id, nom, role }: any) => (
               // Cette balise est là pour la key, à check pour le rendu final
               <HStack key={id}>
                  {id !== responsable.id && (
                     <Text fontSize={14} whiteSpace="nowrap" pr={1}>
                        {nom} ({role})
                     </Text>
                  )}
               </HStack>
            ))}
         >
            <Text fontSize={14} whiteSpace="nowrap">
               {participants.length - 1} autre
               {participants.length - 1 > 1 ? "s " : " "}
               participant
               {participants.length - 1 > 1 ? "s " : " "}
            </Text>
         </Tooltip>

         <Spacer />

         {/* Pour le PopOver, useDisclosure -> Chakra UI */}
         <Popover placement="left" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <PopoverTrigger>
               <IconButton aria-label="Pièce jointe" size={size} icon={<AttachmentIcon />} />
            </PopoverTrigger>

            <PopoverContent w="100%">
               <PopoverArrow />
               <PopoverCloseButton />
               <PopoverHeader>Ajouter une pièce jointe</PopoverHeader>
               <PopoverBody>
                  <VStack>
                     <Input type="file" onChange={(e) => setFileList(e.target.files)} />

                     <Button colorScheme="blue" onClick={uploadFile}>
                        Valider
                     </Button>
                  </VStack>
               </PopoverBody>
            </PopoverContent>
         </Popover>

         <Button
            leftIcon={<AiFillEdit />}
            size={size}
            px="24px !important"
            colorScheme="blue"
            onClick={openOrCloseNewRapport}
         >
            Rapport
         </Button>

         {role === "direction" && <CustomDeleteRecla questionnaireId={questionnaire?.id} />}
      </HStack>
   );
};

export default SecondRow;
