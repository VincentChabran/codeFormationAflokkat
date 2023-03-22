import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
    Box,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Grid,
    GridItem,
    IconButton,
    useDisclosure,
} from "@chakra-ui/react";
import jwtDecode from "jwt-decode";

import { getToken } from "./utils/token";
import { useAccountStore } from "./stores/useAccountStore";
import SidebarRoutes from "./routes/SidebarRoutes";
import ContentRoutes from "./routes/ContentRoutes";
import ConfirmationGesteCommercial from "./pages/ConfirmationGesteCommercial";

export const App = () => {
    const navigate = useNavigate();
    const { setAccount, email } = useAccountStore();

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const token = getToken();
        if (window.location.pathname.includes("/confirmation-geste-commercial")) {
            navigate(window.location.pathname);
        } else if (token) {
            setAccount(jwtDecode(token));
            if (window.location.pathname === "/") {
                navigate("/reclamations");
            } else {
                navigate(window.location.pathname);
            }
        } else {
            navigate("/");
        }
    }, [email]);

    return (
        <>
            {window.location.pathname.includes("/confirmation-geste-commerciale") ? (
                <ConfirmationGesteCommercial />
            ) : (
                <>
                    <Grid
                        h={`calc(100vh - 32px)`}
                        overflow="hidden"
                        m={4}
                        gap={4}
                        templateRows="repeat(4, 1fr)"
                        templateColumns="repeat(4, 1fr)"
                    >
                        <GridItem
                            rowSpan={{ base: 0, xl: 4 }}
                            colSpan={{ base: 0, xl: 1 }}
                            display={{ base: "none", xl: "initial" }}
                        >
                            {/* Side Bar */}
                            <SidebarRoutes />
                        </GridItem>

                        {/* Side Bar Mode Hamburger */}
                        <Drawer isOpen={isOpen} placement="right" size="sm" onClose={onClose}>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerBody overflowX="hidden">
                                    <SidebarRoutes />
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>

                        <GridItem rowSpan={{ base: 4, xl: 4 }} colSpan={{ base: 4, xl: 3 }}>
                            {/* Main Content */}
                            <Box position="relative" h="100%">
                                <IconButton
                                    display={{ base: "initial", xl: "none" }}
                                    aria-label="menu"
                                    position="absolute"
                                    right={0}
                                    top={0}
                                    icon={<HamburgerIcon />}
                                    size="lg"
                                    variant="ghost"
                                    onClick={onOpen}
                                />

                                <ContentRoutes />
                            </Box>
                        </GridItem>
                    </Grid>
                </>
            )}
        </>
    );
};

export default App;
