import { HStack, Text, Badge, Table, Tbody, Tr, Td } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { MyRating } from "../ListItem";

const MyTableRow = ({ text, value }: any) => {
   return (
      <>
         {value && (
            <Tr>
               <Td>
                  <Text fontWeight="light" whiteSpace="nowrap">
                     {text}
                  </Text>
               </Td>
               <Td>{typeof value === "number" ? <MyRating value={value} pt={1} /> : <Text>{value}</Text>}</Td>
            </Tr>
         )}
      </>
   );
};

const SumUp = ({ questionnaire }: any) => {
   const navigate = useNavigate();

   return (
      <>
         <HStack spacing={4} mb={2}>
            <Text fontWeight="bold">Questionnaire</Text>

            <Badge
               variant="solid"
               m="auto"
               colorScheme={
                  questionnaire.statut === "Bon"
                     ? "green"
                     : questionnaire.statut === "Moyen"
                     ? "orange"
                     : questionnaire.statut === "Réclamation"
                     ? "red"
                     : "blue"
               }
               cursor={questionnaire.reclamation ? "pointer" : "initial"}
               onClick={() => {
                  if (questionnaire.reclamation) navigate(`/reclamations/${questionnaire.reclamation.id}`);
               }}
            >
               {questionnaire.reclamation
                  ? questionnaire.statut + " n° " + questionnaire.reclamation.id
                  : questionnaire.statut}
            </Badge>
         </HStack>

         <Table variant="striped" size="sm" border="2px solid" borderColor="gray.700">
            <Tbody>
               <MyTableRow text="Simplicité réservation en ligne" value={questionnaire.booking_online_simplicity} />
               <MyTableRow text="Informations réservation en ligne" value={questionnaire.booking_online_information} />
               <MyTableRow
                  text="Accueil réservation service commercial"
                  value={questionnaire.booking_commercial_reception}
               />
               <MyTableRow text="Temps de réponse réservation service commercial" value={questionnaire.response_time} />
               <MyTableRow
                  text="Informations fournies par service commercial"
                  value={questionnaire.booking_commercial_information}
               />
               <MyTableRow text="Accueil embarquement" value={questionnaire.stay_reception_boarding} />
               <MyTableRow text="Accueil débarquement" value={questionnaire.stay_reception_landing} />
               <MyTableRow text="Accueil escales" value={questionnaire.stay_reception_stopover} />
               <MyTableRow text="Confort bateau" value={questionnaire.boat_comfort} />
               <MyTableRow text="Propreté bateau" value={questionnaire.boat_cleanliness} />
               <MyTableRow text="Equipement bateau" value={questionnaire.boat_equipment} />
               <MyTableRow text="Instructions claires" value={questionnaire.instruction_clear} />
               <MyTableRow text="Instructions adaptées" value={questionnaire.instruction_suitable} />
               <MyTableRow text="Instructions suffisantes" value={questionnaire.instruction_sufficient} />
               <MyTableRow text="Service technique disponible" value={questionnaire.technical_service_available} />
               <MyTableRow text="Service technique rapide" value={questionnaire.technical_service_timeliness} />
               <MyTableRow text="Service technique relationnel" value={questionnaire.technical_service_relational} />
               <MyTableRow text="Appréciation générale" value={questionnaire.general_appreciation_stay} />
               <MyTableRow text="Recommanderiez-vous ?" value={questionnaire.recommend_us} />
            </Tbody>
         </Table>
      </>
   );
};

export default SumUp;
