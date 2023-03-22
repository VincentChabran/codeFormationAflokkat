import { Route, Routes } from "react-router-dom";
import ConfirmationGesteCommercial from "../pages/ConfirmationGesteCommercial";

const ClientRoutes = () => {
    return (
        <Routes>
            <Route path="/confirmation-geste-commercial" element={<ConfirmationGesteCommercial />} />
        </Routes>
    );
};

export default ClientRoutes;
