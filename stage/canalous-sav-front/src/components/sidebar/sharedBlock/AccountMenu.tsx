import {
    Divider,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Spacer,
    Text,
    Tooltip,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { ColorModeSwitcher } from "../../../ColorModeSwitcher";

import { deleteToken } from "../../../utils/token";
import { useAccountStore } from "../../../stores/useAccountStore";

const AccountMenu = () => {
    const navigate = useNavigate();

    const { email, role, setAccount } = useAccountStore();

    const deconnection = () => {
        deleteToken();
        setAccount({ id: 0, nom: "", email: "", role: "" });
    };

    return (
        <Menu>
            <Tooltip hasArrow label="Mon compte">
                <MenuButton as={IconButton} icon={<MdAccountCircle />} fontSize="xl" variant="ghost"></MenuButton>
            </Tooltip>

            <MenuList zIndex={3}>
                <HStack px={4}>
                    <Text fontSize="14px" color="gray">
                        {email}
                    </Text>
                    <Spacer />

                    <ColorModeSwitcher />
                </HStack>
                <MenuGroup title="Actions">
                    <MenuItem pl={10} onClick={() => navigate("/comptes/modifier")}>
                        Modifier mon compte
                    </MenuItem>
                    {role === "direction" && (
                        <>
                            <Divider />
                            <MenuItem pl={10} onClick={() => navigate("/comptes/creer")}>
                                Créer un compte
                            </MenuItem>
                            <MenuItem pl={10} onClick={() => navigate("/comptes")}>
                                Gérer les comptes
                            </MenuItem>
                            <MenuItem pl={10} onClick={() => navigate("/modeles-email")}>
                                Modèles d'email
                            </MenuItem>
                        </>
                    )}
                </MenuGroup>

                <Divider />

                <MenuGroup title="Déconnexion">
                    <MenuItem pl={10}>
                        <RouterLink to="/" onClick={deconnection}>
                            Se déconnecter
                        </RouterLink>
                    </MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    );
};

export default AccountMenu;
