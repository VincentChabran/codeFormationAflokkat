import {
   Box,
   Divider,
   Heading,
   HStack,
   Select,
   Spinner,
   Stat,
   StatLabel,
   StatNumber,
   Table,
   TableCaption,
   Tbody,
   Th,
   Thead,
   Tr,
   useColorModeValue,
   VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "urql";

import { useApplicationStore } from "../stores/useApplicationStore";

const getReclamationsQuery = `
  query Query {
    reclamations {
      createdAt
      statut
      propositions {
        createdAt
        geste
        statut
      }
      rapports {
        createdAt
      }
    }
  }
`;

const getBasesQuery = `
  query Bases {
    bases { 
      id
      nom
      chef
      reclamations {
        id
        statut
        geste
        createdAt
        propositions {
          createdAt
          geste
          statut
        }
        rapports {
          createdAt
        }
      }
    }
  }
`;

const Dashboard = () => {
   const bg = useColorModeValue("gray.400", "gray.600");

   const { displaySpecificStatut } = useApplicationStore();
   const navigate = useNavigate();

   const [{ data, fetching, error }, reexecuteQuery] = useQuery({
      query: getReclamationsQuery,
   });

   const [{ data: basesData, fetching: basesFetching, error: basesError }, reexecuteGetBasesQuery] = useQuery({
      query: getBasesQuery,
   });

   const [statistics, setStatistics] = useState({
      delaiReponseClient: [0, 0, 0],
      delaiRapport: [0, 0, 0],
      montantGeste: [0, 0, 0],
      delaiMoyenAvantPremiereProposition: 0,
      delaiMoyenAvantPremierRapport: 0,
   });

   const [base, setBase] = useState({ idx: -1, nom: "" });

   const calculateStatistics = () => {
      if (!data || !basesData) {
         return 0;
      }

      const reclamations = base.nom ? basesData.bases[base.idx].reclamations : data.reclamations;

      let delaiReponseClient = [0, 0, 0];
      let delaiRapport = [0, 0, 0];
      let montantGeste = [0, 0, 0];

      let delaiMoyenAvantPremiereProposition = 0;
      let delaiAvantPremiereProposition = 0;
      reclamations.forEach(({ createdAt, propositions }: any) => {
         delaiAvantPremiereProposition = 0;

         if (propositions[0]) {
            delaiAvantPremiereProposition = Math.trunc((propositions[0].createdAt - createdAt) / 1000 / 3600 / 24);
         } else delaiAvantPremiereProposition = Math.trunc((Date.now() - createdAt) / 1000 / 3600 / 24);
         delaiMoyenAvantPremiereProposition += delaiAvantPremiereProposition;

         if (delaiAvantPremiereProposition <= 7) delaiReponseClient[0]++;
         else if (delaiAvantPremiereProposition <= 14) delaiReponseClient[1]++;
         else delaiReponseClient[2]++;
      });

      let delaiMoyenAvantPremierRapport = 0;
      let delaiAvantPremierRapport = 0;
      reclamations.forEach(({ createdAt, rapports }: any) => {
         delaiAvantPremierRapport = 0;

         if (rapports[0]) {
            delaiAvantPremierRapport = Math.trunc((rapports[0].createdAt - createdAt) / 1000 / 3600);
            if (delaiAvantPremierRapport <= 24) delaiRapport[0]++;
            else delaiRapport[1]++;
         } else {
            delaiAvantPremierRapport = Math.trunc((Date.now() - createdAt) / 1000 / 3600);
            delaiRapport[2]++;
         }
         delaiMoyenAvantPremierRapport += delaiAvantPremierRapport;
      });

      reclamations.forEach(({ propositions }: any) => {
         if (propositions.length && propositions.some((proposition: any) => proposition.statut === "Acceptée")) {
            const gesteDetails = propositions
               .reverse()
               .find(({ statut }: any) => statut === "Acceptée")
               .geste.split(" de ");
            gesteDetails[1] = parseFloat(gesteDetails[1].substring(0, gesteDetails[1].length - 1));
            if (gesteDetails[0] === "Geste commercial") {
               montantGeste[0] += gesteDetails[1];
            } else if (gesteDetails[0] === "Remboursement") {
               montantGeste[1] += gesteDetails[1];
            } else if (gesteDetails[0] === "Chèque croisière") {
               montantGeste[2] += gesteDetails[1];
            }
         }
      });

      setStatistics({
         delaiReponseClient,
         delaiRapport,
         montantGeste,
         delaiMoyenAvantPremiereProposition,
         delaiMoyenAvantPremierRapport,
      });

      return 1;
   };

   useEffect(() => {
      calculateStatistics();
   }, [base.nom, data, basesData]);

   return (
      <>
         <Heading as="h4" size="md">
            Dashboard
         </Heading>

         {fetching && basesFetching ? (
            <Spinner />
         ) : (
            <>
               {data && basesData && (
                  <VStack align="start" m={4} spacing={4}>
                     <Select
                        placeholder="Toutes les bases"
                        size="sm"
                        w="150px"
                        value={base.nom}
                        onChange={(e) =>
                           setBase({
                              idx: basesData.bases.findIndex(({ nom }: any) => nom === e.target.value),
                              nom: e.target.value,
                           })
                        }
                     >
                        {basesData &&
                           basesData.bases.map(({ id, nom }: any, idx: number) => (
                              <option key={id} value={nom}>
                                 {nom}
                              </option>
                           ))}
                     </Select>
                     <HStack align="start" spacing={4}>
                        <Box p={4} bg={bg} borderRadius={10}>
                           <Stat>
                              <StatLabel>Nb. de réclamations</StatLabel>
                              <StatNumber>
                                 {base.nom ? basesData.bases[base.idx].reclamations.length : data.reclamations.length}
                              </StatNumber>
                           </Stat>
                        </Box>
                        <Box p={4} bg={bg} borderRadius={10}>
                           <Stat>
                              <StatLabel>Réclamations en cours</StatLabel>
                              <StatNumber>
                                 {
                                    (base.nom ? basesData.bases[base.idx].reclamations : data.reclamations).filter(
                                       ({ statut }: any) => statut !== "Cloturée"
                                    ).length
                                 }{" "}
                                 (
                                 {(
                                    ((base.nom ? basesData.bases[base.idx].reclamations : data.reclamations).filter(
                                       ({ statut }: any) => statut !== "Cloturée"
                                    ).length /
                                       (base.nom
                                          ? basesData.bases[base.idx].reclamations.length
                                          : data.reclamations.length)) *
                                    100
                                 ).toFixed(2)}
                                 %)
                              </StatNumber>
                           </Stat>
                        </Box>
                        <Box
                           p={4}
                           bg={bg}
                           borderRadius={10}
                           sx={{ cursor: "pointer" }}
                           _hover={{
                              bg: "gray.500",
                              transform: "scale(1.01)",
                              transitionDuration: "0.2s",
                           }}
                           onClick={() => {
                              displaySpecificStatut("Cloturée");
                              navigate("/reclamations");
                           }}
                        >
                           <Stat>
                              <StatLabel>Réclamations cloturées</StatLabel>
                              <StatNumber>
                                 {
                                    (base.nom ? basesData.bases[base.idx].reclamations : data.reclamations).filter(
                                       ({ statut }: any) => statut === "Cloturée"
                                    ).length
                                 }{" "}
                                 (
                                 {(
                                    ((base.nom ? basesData.bases[base.idx].reclamations : data.reclamations).filter(
                                       ({ statut }: any) => statut === "Cloturée"
                                    ).length /
                                       (base.nom ? basesData.bases[base.idx].reclamations : data.reclamations).length) *
                                    100
                                 ).toFixed(2)}
                                 %)
                              </StatNumber>
                           </Stat>
                        </Box>
                        <Divider orientation="vertical" h="88px" />
                        <Box
                           p={4}
                           bg={bg}
                           borderRadius={10}
                           sx={{ cursor: "pointer" }}
                           _hover={{
                              bg: "gray.500",
                              transform: "scale(1.01)",
                              transitionDuration: "0.2s",
                           }}
                           onClick={() => {
                              displaySpecificStatut("Proposition du geste commercial");
                              navigate("/reclamations");
                           }}
                        >
                           <Stat>
                              <StatLabel>Geste à valider</StatLabel>
                              <StatNumber>
                                 {
                                    (base.nom ? basesData.bases[base.idx].reclamations : data.reclamations).filter(
                                       ({ statut }: any) => statut === "Proposition du geste commercial"
                                    ).length
                                 }{" "}
                              </StatNumber>
                           </Stat>
                        </Box>
                        <Box
                           p={4}
                           bg={bg}
                           borderRadius={10}
                           sx={{ cursor: "pointer" }}
                           _hover={{
                              bg: "gray.500",
                              transform: "scale(1.01)",
                              transitionDuration: "0.2s",
                           }}
                           onClick={() => {
                              displaySpecificStatut("Retour client");
                              navigate("/reclamations");
                           }}
                        >
                           <Stat>
                              <StatLabel>Retour client</StatLabel>
                              <StatNumber>
                                 {
                                    (base.nom ? basesData.bases[base.idx].reclamations : data.reclamations).filter(
                                       ({ statut }: any) => statut === "Retour client"
                                    ).length
                                 }{" "}
                              </StatNumber>
                           </Stat>
                        </Box>
                     </HStack>
                     <Divider />
                     <HStack align="start" spacing={4}>
                        <Box p={4} bg={bg} borderRadius={10}>
                           <Table variant="simple" size="sm">
                              <TableCaption>Délai de réponse au client</TableCaption>
                              <Thead>
                                 <Tr>
                                    <Th>Nb. de jours</Th>
                                    <Th>Nb. de dossiers</Th>
                                 </Tr>
                              </Thead>
                              <Tbody>
                                 <Tr>
                                    <Th>de 0 à 7 jours</Th>
                                    <Th>{statistics.delaiReponseClient[0]}</Th>
                                 </Tr>
                                 <Tr>
                                    <Th>de 8 à 14 jours</Th>
                                    <Th>{statistics.delaiReponseClient[1]}</Th>
                                 </Tr>
                                 <Tr>
                                    <Th>plus de 14 jours</Th>
                                    <Th>{statistics.delaiReponseClient[2]}</Th>
                                 </Tr>
                              </Tbody>
                           </Table>
                        </Box>
                        <Box p={4} bg={bg} borderRadius={10}>
                           <Table variant="simple" size="sm">
                              <TableCaption>Délai de réponse retour base</TableCaption>
                              <Thead>
                                 <Tr>
                                    <Th>Nb. d'heures</Th>
                                    <Th>Nb. de dossiers</Th>
                                 </Tr>
                              </Thead>
                              <Tbody>
                                 <Tr>
                                    <Th>de 0 à 24h</Th>
                                    <Th>{statistics.delaiRapport[0]}</Th>
                                 </Tr>
                                 <Tr>
                                    <Th>plus de 24h</Th>
                                    <Th>{statistics.delaiRapport[1]}</Th>
                                 </Tr>
                                 <Tr>
                                    <Th>Non reçu</Th>
                                    <Th>{statistics.delaiRapport[2]}</Th>
                                 </Tr>
                              </Tbody>
                           </Table>
                        </Box>
                        <Box p={4} bg={bg} borderRadius={10}>
                           <VStack align="start" spacing={9}>
                              <Stat>
                                 <StatLabel>Délai moyen de réponse au client</StatLabel>
                                 <StatNumber>
                                    {(
                                       statistics.delaiMoyenAvantPremiereProposition /
                                       (base.nom ? basesData.bases[base.idx].reclamations : data.reclamations).length
                                    ).toFixed(2)}{" "}
                                    jours
                                 </StatNumber>
                              </Stat>
                              <Stat>
                                 <StatLabel>Délai moyen de retour base</StatLabel>
                                 <StatNumber>
                                    {(
                                       statistics.delaiMoyenAvantPremierRapport /
                                       ((base.nom ? basesData.bases[base.idx].reclamations : data.reclamations).length -
                                          statistics.delaiRapport[2])
                                    ).toFixed(2)}{" "}
                                    heures
                                 </StatNumber>
                              </Stat>
                           </VStack>
                        </Box>
                     </HStack>
                     <Divider />
                     <HStack align="start" spacing={4}>
                        <Box p={4} bg={bg} borderRadius={10}>
                           <Table variant="simple" size="sm">
                              <TableCaption>Montant des gestes</TableCaption>
                              <Tbody>
                                 <Tr>
                                    <Th>Montant total geste sur base</Th>
                                    <Th>{statistics.montantGeste[0]}€</Th>
                                 </Tr>
                                 <Tr>
                                    <Th>Montant total des remboursements</Th>
                                    <Th>{statistics.montantGeste[1]}€</Th>
                                 </Tr>
                                 <Tr>
                                    <Th>Montant total des chèques Croisière</Th>
                                    <Th>{statistics.montantGeste[2]}€</Th>
                                 </Tr>
                              </Tbody>
                           </Table>
                        </Box>
                     </HStack>
                  </VStack>
               )}
            </>
         )}
      </>
   );
};

export default Dashboard;
