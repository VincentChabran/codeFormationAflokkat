import {
    Badge,
    Box,
    Divider,
    IconButton,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Tooltip,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { MdNotifications } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useMutation } from "urql";
import { useAccountStore } from "../../../stores/useAccountStore";
import { useApplicationStore } from "../../../stores/useApplicationStore";
import { useReclamationStore } from "../../../stores/useReclamationStore";
import { scrollBarCSS } from "../../../utils/scrollBarCss";

interface NotificationProps {
    id: number;
    notification: string;
    reclamation: {
        id: number;
    };
}

const removeNotificationMutation = `
  mutation RemoveUtilisateurNotification($notificationId: Int!, $id: Int!) {
    removeUtilisateurNotification(notificationId: $notificationId, id: $id) {
      id
    }
  }
`;

const NotifMenu = ({ data, idCheck }: any) => {
    const { setReclamation, setStatut } = useReclamationStore();
    const { id } = useAccountStore();

    const { openMessagerie, openRapport, openOrCloseReclamation, openPropositions, displayInitials } =
        useApplicationStore();

    const navigate = useNavigate();

    const [_, executeMutation] = useMutation(removeNotificationMutation);

    useEffect(() => {
        data?.utilisateur?.notifications.forEach((notification: any) => {
            if (notification.notification.includes(`#${idCheck}.`)) {
                acceptNotification(notification.id);
            }
        });
    }, [data?.utilisateur?.notifications.length]);

    const acceptNotification = (notificationId: number) => {
        const variables = {
            id,
            notificationId,
        };
        executeMutation(variables);
    };

    const handleReclamationStore = (index: number, notificationId: number, reclamationId: number) => {
        setReclamation({
            id: reclamationId,
            reclamation: data?.utilisateur?.notifications[index]?.reclamation?.reclamation,
            responsableId: data?.utilisateur?.notifications[index]?.reclamation?.responsable?.id,
            clientId: data?.utilisateur?.notifications[index]?.reclamation?.client?.id,
        });
        setStatut(data?.utilisateur?.notifications[index]?.reclamation?.statut);

        if (data?.utilisateur?.notifications[index]?.notification.includes("messages")) {
            openMessagerie();
        } else if (data?.utilisateur?.notifications[index]?.notification.includes("rapports")) {
            openRapport();
        } else if (data?.utilisateur?.notifications[index]?.notification.includes("remplir un rapport")) {
            openOrCloseReclamation();
        } else if (data?.utilisateur?.notifications[index]?.notification.includes("client")) {
            openPropositions();
        }

        acceptNotification(notificationId);
        navigate(`/reclamations/${reclamationId}`);
    };

    const removeAllNotifications = () => {
        data?.utilisateur?.notifications.forEach(({ id }: any) => {
            acceptNotification(id);
        });
    };

    return (
        <Box position="relative">
            <Menu>
                <Tooltip hasArrow label="Notifications">
                    <MenuButton as={IconButton} icon={<MdNotifications />} fontSize="xl" variant="ghost"></MenuButton>
                </Tooltip>

                <MenuList zIndex={3}>
                    <MenuGroup title="Mes notifications">
                        {data?.utilisateur?.notifications.length ? (
                            <>
                                <MenuItem onClick={removeAllNotifications}>Supprimer toutes les notifications</MenuItem>
                                <Divider />
                            </>
                        ) : null}

                        <Box maxH={`300px`} overflowY="auto" css={scrollBarCSS}>
                            {data?.utilisateur?.notifications.map(
                                (
                                    {
                                        id: notificationId,
                                        notification,
                                        reclamation: { id: reclamationId },
                                    }: NotificationProps,
                                    index: number
                                ) => (
                                    <MenuItem
                                        key={id}
                                        onClick={() => handleReclamationStore(index, notificationId, reclamationId)}
                                    >
                                        {index + 1} - {notification}
                                    </MenuItem>
                                )
                            )}
                        </Box>
                    </MenuGroup>
                </MenuList>

                <Badge position="fixed" ml={-4} colorScheme="red" variant="solid" borderRadius="50%">
                    {data?.utilisateur?.notifications.length ? data?.utilisateur?.notifications.length : null}
                </Badge>
            </Menu>
        </Box>
    );
};

export default NotifMenu;
