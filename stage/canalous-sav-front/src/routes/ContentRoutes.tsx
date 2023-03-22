import { Route, Routes } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Questionnaires from "../pages/Questionnaires";
import Questionnaire from "../pages/Questionnaire";
import Reclamations from "../pages/Reclamations";
import Reclamation from "../pages/Reclamation";
import CreerReclamation from "../pages/CreerReclamation";
import ConfirmationGesteCommercial from "../pages/ConfirmationGesteCommercial";
import Comptes from "../pages/Comptes";
import CreerCompte from "../components/comptes/CreerCompte";
import ModifierCompte from "../components/comptes/ModifierCompte";
import ModelesEmail from "../pages/ModelesEmail";

const ContentRoutes = () => {
    const bg = useColorModeValue("gray.300", "gray.700");

    return (
        <Box h="100%" w="100%" bg={bg} borderRadius={6} py={2} px={3}>
            <Routes>
                <Route path="/">
                    <Route index element={<Login />} />
                    <Route path="dashboard" element={<Dashboard />} />

                    <Route path="questionnaires">
                        <Route index element={<Questionnaires />} />
                        <Route path=":id" element={<Questionnaire />} />
                    </Route>

                    <Route path="reclamations" element={<Reclamations />} />
                    <Route path="reclamations/:id" element={<Reclamation />} />
                    <Route path="reclamations/creer" element={<CreerReclamation />} />

                    <Route
                        path="confirmation-geste-commercial/:reclamationId/:propositionId"
                        element={<ConfirmationGesteCommercial />}
                    />

                    <Route path="comptes" element={<Comptes />} />
                    <Route path="comptes/creer" element={<CreerCompte />} />
                    <Route path="comptes/modifier" element={<ModifierCompte />} />

                    <Route path="modeles-email" element={<ModelesEmail />} />
                </Route>
            </Routes>
        </Box>
    );
};
// element={<Content />}
export default ContentRoutes;
