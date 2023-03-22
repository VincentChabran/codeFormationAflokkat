import { Button, List, ListItem, Text, VStack } from "@chakra-ui/react";

import { scrollBarCSS } from "../../../../utils/scrollBarCss";
import { useApplicationStore } from "../../../../stores/useApplicationStore";
import { Dispatch, SetStateAction } from "react";

type RapportListProps = {
   reclamation: {
      geste: string;
      rapports: [{ auteur: { nom: string } }];
   };
   setRapportToDisplay: Dispatch<SetStateAction<number>>;
};

const RapportList = ({ reclamation, setRapportToDisplay }: RapportListProps) => {
   const { openRapport } = useApplicationStore();

   return (
      <VStack>
         {reclamation.rapports.length && <Text>-- Rapports --</Text>}
         <List
            spacing={4}
            p={2}
            overflowY="auto"
            h={`calc(100vh - 295px- ${reclamation.geste ? "44px" : "0px"})`}
            css={scrollBarCSS}
         >
            {reclamation.rapports.map(({ auteur, createdAt }: any, index: number) => (
               <ListItem key={createdAt}>
                  <Button
                     w="150px"
                     onClick={() => {
                        openRapport();
                        setRapportToDisplay(index);
                     }}
                  >
                     <Text textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
                        {auteur?.nom || "Auteur delete"}
                     </Text>
                  </Button>
               </ListItem>
            ))}
         </List>
      </VStack>
   );
};

export default RapportList;
