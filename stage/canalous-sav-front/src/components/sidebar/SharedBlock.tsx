import { useNavigate, Outlet, useParams, useLocation } from "react-router-dom";
import { useAccountStore } from "../../stores/useAccountStore";
import { Button, HStack, Heading, Divider, VStack, Text, Spacer } from "@chakra-ui/react";
import { useQuery, useSubscription } from "urql";
import { useEffect } from "react";

import { useClientStore } from "../../stores/useClientStore";
import { useReservationStore } from "../../stores/useReservationStore";
import AccountMenu from "./sharedBlock/AccountMenu";
import NotifMenu from "./sharedBlock/NotifMenu";

const getUtilisateurQuery = `
  query Query($email: String!) {
    utilisateur(email: $email) {
      nom
      participe {
        id
      }
      notifications {
        id
        notification
        reclamation {
          id
          reclamation
          responsable {
            id
          }
          client {
            id
          }          
        }
      }
    }
  }
`;

const getNewNotificationsSubscription = `
  subscription Subscription {
    sendNotification {
      id
    }
  }
`;

const SharedBlock = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { id, nom, email, role } = useAccountStore();
    const { resetClient } = useClientStore();
    const { resetReservation } = useReservationStore();

    const { id: idCheck } = useParams();

    const [{ data, fetching, error }, reexecuteQuery] = useQuery({
        query: getUtilisateurQuery,
        variables: { email },
    });

    useEffect(() => {
        reexecuteQuery({ requestPolicy: "network-only" });
    }, [nom, email]);

    useEffect(() => {
        if (
            location.pathname.includes("reclamations/") &&
            idCheck &&
            data &&
            !data.utilisateur.participe.some(({ id }: any) => id === parseInt(idCheck))
        ) {
            navigate("/reclamations");
        }
    }, [data]);

    const handleSubscription = (previous: any, res: any) => {
        return res?.sendNotification?.id;
    };

    const [res] = useSubscription(
        {
            query: getNewNotificationsSubscription,
        },
        handleSubscription
    );

    useEffect(() => {
        if (res?.data === id) {
            reexecuteQuery({ requestPolicy: "network-only" });
        }
    }, [res]);

    return (
        <>
            <VStack align="stretch" spacing={3}>
                <HStack>
                    <VStack spacing={0} align="start" pt={2}>
                        <Heading fontSize="lg" flexGrow={1}>
                            SERVICE CLIENT
                        </Heading>

                        <Text fontSize="14px" color="gray">
                            {nom} / {role}
                        </Text>
                    </VStack>

                    <Spacer />

                    {/* Notification Menu */}
                    <NotifMenu data={data} idCheck={idCheck} />

                    {/* Mon Compte Menu */}
                    <AccountMenu />
                </HStack>

                <HStack align="stretch">
                    <Button size="sm" onClick={() => navigate("/questionnaires")}>
                        Questionnaires
                    </Button>
                    <Divider orientation="vertical" height="auto" />
                    <Button size="sm" onClick={() => navigate("/reclamations")}>
                        Réclamations
                    </Button>
                </HStack>

                <HStack align="start">
                    <Button
                        size="md"
                        colorScheme="blue"
                        mr={2}
                        onClick={() => {
                            resetClient();
                            resetReservation();
                            navigate("/reclamations/creer");
                        }}
                    >
                        Créer une réclamation
                    </Button>
                    <Button size="sm" my="auto !important" onClick={() => navigate("/dashboard")}>
                        Dashboard
                    </Button>
                </HStack>
            </VStack>

            <Divider my={4} />

            <Outlet />
        </>
    );
};

export default SharedBlock;
