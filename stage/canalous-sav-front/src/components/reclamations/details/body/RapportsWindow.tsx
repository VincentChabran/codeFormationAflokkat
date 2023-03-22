import { Box, Divider, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react";

type RapportsWindowProps = {
   reclamation: {
      geste: string;
      rapports: [];
   };
   rapportToDisplay: number;
   bg: string;
};

const RapportsWindow = ({ reclamation, rapportToDisplay, bg }: any) => {
   const { geste, rapports } = reclamation;
   return (
      <Box
         flex="1"
         h={`calc(100vh - 265px - ${geste ? "44px" : "0px"})`}
         overflowY="auto"
         p="10px"
         color="white"
         bg={bg}
         rounded="md"
         shadow="md"
      >
         <VStack align="start">
            <Text fontWeight="bold">{rapports[rapportToDisplay]?.auteur?.nom || "Auteur delete"}</Text>

            <Divider />

            <HStack spacing={1}>
               <Text>Client immobilisé : </Text>
               <Text fontWeight="bold">{rapports[rapportToDisplay]?.clientImmobilise ? "Oui" : "Non"}</Text>
            </HStack>

            {rapports[rapportToDisplay]?.clientImmobilise && (
               <>
                  <HStack spacing={1}>
                     <Text fontWeight="light">Raison : </Text>
                     <Text>{rapports[rapportToDisplay]?.clientImmobiliseRaison}</Text>
                  </HStack>
                  <HStack spacing={1}>
                     <Text fontWeight="light">Durée : </Text>
                     <Text>{rapports[rapportToDisplay]?.dureeImmobilisation}</Text>
                  </HStack>
               </>
            )}

            <Divider />

            <HStack spacing={1}>
               <Text>Geste commercial proposé : </Text>
               <Text fontWeight="bold">{rapports[rapportToDisplay]?.gesteCommercial ? "Oui" : "Non"}</Text>
            </HStack>

            {rapports[rapportToDisplay]?.gesteCommercial && (
               <>
                  <HStack spacing={1}>
                     <Text fontWeight="light">Geste : </Text>
                     <Text>{rapports[rapportToDisplay]?.geste}</Text>
                  </HStack>

                  <HStack spacing={1}>
                     <Text fontWeight="light">Montant : </Text>
                     <Text>{rapports[rapportToDisplay]?.montantGeste}</Text>
                  </HStack>
               </>
            )}

            <Divider />

            <HStack spacing={1}>
               <Text>Y a-t-il eu un sinistre ? : </Text>
               <Text fontWeight="bold">{rapports[rapportToDisplay]?.sinistre ? "Oui" : "Non"}</Text>
            </HStack>

            {rapports[rapportToDisplay]?.sinistre && (
               <>
                  <HStack spacing={1}>
                     <Text fontWeight="light">Nature du sinistre : </Text>
                     <Text>{rapports[rapportToDisplay]?.natureSinistre}</Text>
                  </HStack>
               </>
            )}

            <Divider />

            {rapports[rapportToDisplay]?.rapport && (
               <HStack spacing={1}>
                  <Text fontWeight="light">Commentaires supplémentaires : </Text>
                  <Text>{rapports[rapportToDisplay]?.rapport}</Text>
               </HStack>
            )}
         </VStack>
      </Box>
   );
};

export default RapportsWindow;
