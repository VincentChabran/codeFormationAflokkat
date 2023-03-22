import { AttachmentIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip, VStack } from "@chakra-ui/react";
import { AiFillEuroCircle, AiOutlineUnorderedList } from "react-icons/ai";
import { FaComments } from "react-icons/fa";

import { useAccountStore } from "../../../../stores/useAccountStore";
import { useApplicationStore } from "../../../../stores/useApplicationStore";

const LeftButtonsBar = () => {
    // Store
    const { openMessagerie, openPropositions, openAttachments, openLogs } = useApplicationStore();
    const { role } = useAccountStore();

    return (
        <VStack spacing={4}>
            <Tooltip hasArrow label="Messagerie" placement="left">
                <IconButton borderRadius="50%" aria-label="Messages" icon={<FaComments />} onClick={openMessagerie} />
            </Tooltip>

            <Tooltip hasArrow label="Propositions" placement="left">
                <IconButton
                    borderRadius="50%"
                    aria-label="Propositions"
                    icon={<AiFillEuroCircle />}
                    onClick={openPropositions}
                />
            </Tooltip>

            <Tooltip hasArrow label="Pièces jointes" placement="left">
                <IconButton
                    borderRadius="50%"
                    aria-label="Pièces jointes"
                    icon={<AttachmentIcon />}
                    onClick={openAttachments}
                />
            </Tooltip>

            {role === "direction" && (
                <Tooltip hasArrow label="Historique" placement="left">
                    <IconButton
                        borderRadius="50%"
                        aria-label="Historique"
                        icon={<AiOutlineUnorderedList />}
                        onClick={openLogs}
                    />
                </Tooltip>
            )}
        </VStack>
    );
};

export default LeftButtonsBar;
