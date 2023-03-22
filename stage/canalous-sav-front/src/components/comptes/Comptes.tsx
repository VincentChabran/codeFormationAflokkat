import {
   Box,
   Button,
   HStack,
   Select,
   Spacer,
   Spinner,
   Table,
   Tbody,
   Tr,
   useColorModeValue,
   VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQuery } from "urql";
import { useAccountStore } from "../../stores/useAccountStore";
import { scrollBarCSS } from "../../utils/scrollBarCss";
import CompteListRow from "./CompteListRow";

interface UtilisateurProps {
   id: number;
   nom: string;
   email: string;
   role: string;
   estResponsable: [];
}

const synchronizeBasesMutation = `
  mutation Mutation {
    SynchronizeBases {
      id
    }
  }
`;

const getUtilisateursQuery = `
  query Query {
    utilisateurs {
      id
      nom
      email
      role
      estResponsable {
         id
       }
      }
  }
`;

const ComptesList = () => {
   const bg = useColorModeValue("gray.400", "gray.600");

   const [sortBy, setSortBy] = useState("nom");
   const [displayOnly, setDisplayOnly] = useState("");

   const { id } = useAccountStore();

   const [, executeSynchronizeBasesMutation] = useMutation(synchronizeBasesMutation);

   const synchronizeBases = () => {
      executeSynchronizeBasesMutation().then((res) => {
         console.log(res);
         window.location.reload();
      });
   };

   const [{ data, fetching, error }, reExecuteGetUtilisateurQuery] = useQuery({
      query: getUtilisateursQuery,
   });

   if (error) return <div>Impossible de récupérer ces données... {error.message}</div>;

   return (
      <Box m={4} px={4} py={2} bg={bg} borderRadius={10}>
         <VStack p={4} align="stretch" spacing={4}>
            {fetching && (
               <div>
                  <Spinner />
               </div>
            )}

            <HStack align="start" spacing={2}>
               <Select
                  placeholder="Trier par..."
                  size="sm"
                  w="150px"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
               >
                  <option value="nom">Nom</option>
                  <option value="email">Email</option>
               </Select>
               <Select
                  placeholder="Afficher tout"
                  size="sm"
                  w="200px"
                  value={displayOnly}
                  onChange={(e) => setDisplayOnly(e.target.value)}
               >
                  <option value="direction">Direction</option>
                  <option value="commercial">Commercial</option>
                  <option value="base">Base</option>
               </Select>
               <Spacer />
               {id === 1 && (
                  <Button size="sm" onClick={synchronizeBases}>
                     Synchronize
                  </Button>
               )}
            </HStack>

            <Box pr={4} h={`calc(100vh - 195px)`} overflowY="auto" css={scrollBarCSS}>
               <Table size="sm" variant="striped" border="2px solid" borderColor="gray.700">
                  <Tbody>
                     {data?.utilisateurs
                        .sort((a: any, b: any) => {
                           if (sortBy) {
                              if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) return -1;
                              if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) return 1;
                           }
                           return 0;
                        })
                        .map(({ id, nom, email, role, estResponsable }: UtilisateurProps) => (
                           <Tr key={id}>
                              {(!displayOnly || role === displayOnly) && (
                                 <CompteListRow
                                    id={id}
                                    nom={nom}
                                    email={email}
                                    role={role}
                                    estResponsable={estResponsable}
                                    reExecuteGetUtilisateurQuery={reExecuteGetUtilisateurQuery}
                                 />
                              )}
                           </Tr>
                        ))}
                  </Tbody>
               </Table>
            </Box>
         </VStack>
      </Box>
   );
};

export default ComptesList;
