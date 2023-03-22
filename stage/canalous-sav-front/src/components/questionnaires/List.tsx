import { Spinner, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "urql";

import { useAccountStore } from "../../stores/useAccountStore";
import { useApplicationStore } from "../../stores/useApplicationStore";
import { scrollBarCSS } from "../../utils/scrollBarCss";

import ListHeader from "../global/ListHeader";
import ListItem from "./ListItem";

interface QuestionnairesProps {
   id: number;
   nomclient: string;
   general_appreciation_stay: number;
   recommend_us: number;
   statut: string;
}

const AllQuestionnairesQuery = `
  query Query {
    fetchNewQuestionnaires {
      id date nomclient bateau general_appreciation_stay recommend_us statut
    }
  }
`;

const SpecificQuestionnairesQuery = `
  query Query($email: String!) {
    utilisateur(email: $email) {
      participe {
        questionnaire {
          id date nomclient bateau general_appreciation_stay recommend_us statut
        }
      }
    }
  }
`;

const List = () => {
   const { email, role } = useAccountStore();
   const { searchClientForQuestionnaire, selectiveDisplayForQuestionnaire } = useApplicationStore();

   const [{ data: questionnairesData, fetching, error }, reexecuteQuery] = useQuery({
      query: role === "direction" ? AllQuestionnairesQuery : SpecificQuestionnairesQuery,
      variables: { email },
   });

   const NB_QUESTIONNAIRES_PER_PAGE = Math.floor((window.innerHeight - 160) / 70.0);
   const [page, setPage] = useState(1);
   const [nbPages, setNbPages] = useState(0);

   const [questionnaires, setQuestionnaires] = useState([]);

   useEffect(() => {
      if (questionnairesData && !fetching) {
         if (role === "direction") {
            setQuestionnaires(
               questionnairesData.fetchNewQuestionnaires.filter(
                  ({ statut, nomclient }: any) =>
                     (!searchClientForQuestionnaire &&
                        selectiveDisplayForQuestionnaire.some((item) => statut === item)) ||
                     (searchClientForQuestionnaire &&
                        nomclient.toLowerCase().includes(searchClientForQuestionnaire.toLowerCase()))
               )
            );
         } else {
            const temporaryQuestionnaires: any = [];
            questionnairesData.utilisateur.participe.forEach(({ questionnaire }: any) => {
               if (questionnaire) temporaryQuestionnaires.push(questionnaire);
            });
            if (temporaryQuestionnaires.length)
               setQuestionnaires(
                  temporaryQuestionnaires.filter(
                     ({ statut, nomclient }: any) =>
                        (!searchClientForQuestionnaire &&
                           selectiveDisplayForQuestionnaire.some((item) => statut === item)) ||
                        (searchClientForQuestionnaire &&
                           nomclient.toLowerCase().includes(searchClientForQuestionnaire.toLowerCase()))
                  )
               );
         }
      }
   }, [fetching, searchClientForQuestionnaire, selectiveDisplayForQuestionnaire]);

   useEffect(() => {
      setNbPages(
         Math.floor(questionnaires.length / NB_QUESTIONNAIRES_PER_PAGE) +
            (questionnaires.length % NB_QUESTIONNAIRES_PER_PAGE ? 1 : 0)
      );
   }, [questionnaires]);

   return (
      <VStack p={4} align="stretch" spacing={4}>
         {fetching ? (
            <Spinner />
         ) : (
            <>
               {/* Header contains the Buttons & the pages numbers */}
               <ListHeader
                  nbPages={nbPages}
                  page={page}
                  setPage={setPage}
                  text1="Appreciation"
                  text2="Recommandation"
               />

               {/* Displays the ListItem slice(to the current number of pages) */}
               <VStack sx={vStackStyle} css={scrollBarCSS} spacing="4">
                  {(questionnairesData.fetchNewQuestionnaires || questionnairesData.utilisateur) &&
                     questionnaires
                        .slice((page - 1) * NB_QUESTIONNAIRES_PER_PAGE, page * NB_QUESTIONNAIRES_PER_PAGE)
                        .map(
                           ({
                              id,
                              nomclient,
                              general_appreciation_stay,
                              recommend_us,
                              statut,
                           }: QuestionnairesProps) => (
                              // à Check si ça casse pas l'affichage, la div sert juste pour la Key
                              <div key={id}>
                                 {id > 2511 && (
                                    <ListItem
                                       id={id}
                                       nomClient={nomclient}
                                       appreciation={general_appreciation_stay}
                                       recommandation={recommend_us}
                                       tag={statut}
                                    />
                                 )}
                              </div>
                           )
                        )}
               </VStack>
            </>
         )}
      </VStack>
   );
};

export default List;

// css style for the parent VStack of the ListItem
const vStackStyle = {
   alignItems: "stretch",
   paddingLeft: 2,
   paddingRight: 2,
   overflowY: "auto",
   h: `calc(100vh - 150px)`,
};
