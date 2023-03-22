import { VStack, Spinner, Grid, HStack, Button, Text, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery, useSubscription } from "urql";
import { useAccountStore } from "../../stores/useAccountStore";
import { useApplicationStore } from "../../stores/useApplicationStore";
import { useReclamationStore } from "../../stores/useReclamationStore";
import { scrollBarCSS } from "../../utils/scrollBarCss";
import ListHeader from "../global/ListHeader";

import ListItem from "./ListItem";

interface ReclamationsProps {
   id: number;
   reclamation: string;
   statut: string;
   client: {
      id: number;
      nom: string;
   };
   reservation: {
      id: number;
   };
   responsable: {
      id: number;
      nom: string;
   };
   propositions: [{ statut: string }];
   createdAt: string;
}

const ReclamationsQuery = `
  query Query($email: String!) {
    utilisateur(email: $email) {
      participe {
        id
        reclamation
        statut
        propositions {
          statut
        }
        client {
          id nom
        }
        reservation {
          id
        }
        responsable {
          id nom
        }
        createdAt
      }
    }
  }
`;

const refetching = `
  subscription Subscription {
    refetching {
      ids
    }
  }
`;

const List = () => {
   const { id: utilisateurId, email } = useAccountStore();
   const { searchClient, selectiveDisplay } = useApplicationStore();

   const [{ data, fetching, error }, reexecuteQuery] = useQuery({
      query: ReclamationsQuery,
      variables: { email },
   });

   const [resSubscription] = useSubscription(
      {
         query: refetching,
      },
      (previous: any, res: any) => {
         return res?.refetching?.ids;
      }
   );

   const NB_RECLAMATIONS_PER_PAGE = Math.floor((window.innerHeight - 160) / 70.0);
   const [page, setPage] = useState(1);
   const [nbPages, setNbPages] = useState(0);

   const [reclamations, setReclamations] = useState([]);

   useEffect(() => {
      if (data?.utilisateur && !fetching) {
         setReclamations(
            data?.utilisateur.participe
               .sort((a: any, b: any) => b.id - a.id)
               .filter(
                  ({ statut, nomclient }: any) =>
                     (!searchClient && selectiveDisplay.some((item) => statut === item)) ||
                     (searchClient && nomclient.toLowerCase().includes(searchClient.toLowerCase()))
               )
         );
      }
   }, [fetching, searchClient, selectiveDisplay]);

   useEffect(() => {
      setNbPages(
         Math.floor(reclamations.length / NB_RECLAMATIONS_PER_PAGE) +
            (reclamations.length % NB_RECLAMATIONS_PER_PAGE ? 1 : 0)
      );
   }, [reclamations]);

   useEffect(() => {
      if (resSubscription?.data?.includes(utilisateurId)) {
         reexecuteQuery({ requestPolicy: "network-only" });
      }
   }, [resSubscription]);

   if (error) return <div>On no... {error.message}</div>;

   return (
      <VStack p={4} align="stretch" spacing={4}>
         {fetching ? (
            <Spinner />
         ) : (
            <>
               {/* Header contains the Buttons & the pages numbers */}
               <ListHeader page={page} nbPages={nbPages} setPage={setPage} text1="Réservation" text2="Responsable" />

               {/* Displays the ListItem slice(to the current number of pages) */}
               <VStack sx={vStackStyle} spacing={4} css={scrollBarCSS}>
                  {reclamations
                     .slice((page - 1) * NB_RECLAMATIONS_PER_PAGE, page * NB_RECLAMATIONS_PER_PAGE)
                     .map(
                        ({
                           id,
                           reclamation,
                           client,
                           responsable,
                           reservation,
                           statut,
                           propositions,
                        }: ReclamationsProps) => (
                           <ListItem
                              key={id}
                              id={id}
                              reclamation={reclamation}
                              client={client}
                              responsable={responsable}
                              reservationId={reservation.id}
                              statut={statut}
                              color={propositions[propositions.length - 1]?.statut === "Acceptée" ? "green" : "red"}
                           />
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
