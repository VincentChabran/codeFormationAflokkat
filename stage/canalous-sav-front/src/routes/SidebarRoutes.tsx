import { Route, Routes } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";

import SharedBlock from "../components/sidebar/SharedBlock";
import QuestSearchBlock from "../components/sidebar/QuestSearchBlock";
import QuestActionsBlock from "../components/sidebar/QuestActionsBlock";
import ReclaActionsBlock from "../components/sidebar/ReclaActionsBlock";
import ClientBlock from "../components/sidebar/ClientBlock";
import ReclaSearchBlock from "../components/sidebar/ReclaSearchBlock";

const SidebarRoutes = () => {
    const bg = useColorModeValue("gray.300", "gray.700");

    return (
        <Box h="100%" w="100%" bg={bg} borderRadius={6} py={2} px={4}>
            <Routes>
                <Route path="/">
                    <Route path="dashboard" element={<SharedBlock />} />

                    <Route path="questionnaires" element={<SharedBlock />}>
                        <Route index element={<QuestSearchBlock />} />
                        <Route path=":id" element={<QuestActionsBlock />}></Route>
                    </Route>

                    <Route path="reclamations" element={<SharedBlock />}>
                        <Route index element={<ReclaSearchBlock />} />
                        <Route path="creer" element={<ClientBlock />} />
                        <Route path=":id" element={<ReclaActionsBlock />}></Route>
                    </Route>

                    <Route path="comptes/*" element={<SharedBlock />} />
                    {/* <Route path="comptes/creer" element={<SharedBlock />} />
                    <Route path="comptes/modifier" element={<SharedBlock />} /> */}

                    <Route path="modeles-email" element={<SharedBlock />} />
                </Route>
            </Routes>
        </Box>
    );
};
// element={<Sidebar />}
export default SidebarRoutes;
