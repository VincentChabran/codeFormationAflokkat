import { Box, Divider, Heading, HStack, Input, List, ListItem, Spacer, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { MutableRefObject, useState } from "react";
import { useMutation } from "urql";

import { scrollBarCSS } from "../../../../utils/scrollBarCss";
import { useAccountStore } from "../../../../stores/useAccountStore";
import { useReclamationStore } from "../../../../stores/useReclamationStore";

type MessagerieWindow = {
   reclamation: {
      geste: string;
      messages: [];
   };
   messagesEndRef: MutableRefObject<HTMLDivElement | null>;
   bg: string;
};

const createMessageMutation = `
  mutation Mutation($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      id
    }
  }
`;

const MessagerieWindow = ({ reclamation, messagesEndRef, bg }: MessagerieWindow) => {
   // Store
   const { id: utilisateurId } = useAccountStore();
   const { id } = useReclamationStore();

   //
   const [message, setMessage] = useState("");

   const handleChange = (event: any) => setMessage(event.target.value);

   const handleKeyPress = (event: any) => {
      if (event.key === "Enter") {
         setMessage("");
         sendMessage();
      }
   };

   const [res3, executeMessageMutation] = useMutation(createMessageMutation);

   const sendMessage = () => {
      const variables = {
         createMessageInput: {
            message,
            auteurId: utilisateurId,
            reclamationId: id,
         },
      };
      executeMessageMutation(variables);
   };

   return (
      <Box
         h={`calc(100vh - 265px - ${reclamation.geste ? "44px" : "0px"})`}
         bg={bg}
         flex="1"
         p="10px"
         color="white"
         w="50%"
         rounded="md"
         shadow="md"
      >
         <HStack>
            <Spacer />

            <Heading size="md" pr={8}>
               Messagerie
            </Heading>
         </HStack>

         <Divider my={2} />

         <List
            spacing={2}
            sx={ListCss}
            css={scrollBarCSS}
            h={`calc(100vh - 380px - ${reclamation.geste ? "44px" : "0px"})`}
         >
            {reclamation.messages.map(({ message, auteur, createdAt }: any, index: number) => (
               <ListItem key={index}>
                  <HStack>
                     <Text fontWeight="bold">{auteur?.nom || "Auteur delete"}</Text>
                     <Text fontSize={13}>{dayjs(parseInt(createdAt)).format("HH:mm:ss DD/MM/YY")}</Text>
                  </HStack>

                  <Text>{message}</Text>
               </ListItem>
            ))}

            <div ref={messagesEndRef} />
         </List>

         <Input
            placeholder="Mon message..."
            label="message"
            value={message}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
         />
      </Box>
   );
};

export default MessagerieWindow;

const ListCss = {
   w: "100%",
   mb: 2,
   p: 2,
   display: "inline-block",
   overflowY: "auto",
};
