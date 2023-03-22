import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Text,
    useBreakpointValue,
} from "@chakra-ui/react";

import { scrollBarCSS } from "../../../../utils/scrollBarCss";
import { useApplicationStore } from "../../../../stores/useApplicationStore";

type AccordionRowProps = {
    reclamation: {
        geste: string;
        reclamation: string;
    };
};

const AccordionRow = ({ reclamation: recla }: AccordionRowProps) => {
    const { geste, reclamation } = recla;

    const {
        panelsState: { isReclamationOpen },
        openOrCloseReclamation,
    } = useApplicationStore();

    // Responcive du mb AccordionItem
    const mb = useBreakpointValue({ sm: 4, md: 4, lg: 0, xl: 0 });

    return (
        <Accordion allowToggle reduceMotion index={isReclamationOpen ? 0 : 1}>
            <AccordionItem pt={2} borderBottom="none" pb={isReclamationOpen ? mb : 0}>
                <AccordionButton sx={AccordionButtonCss} onClick={() => openOrCloseReclamation()}>
                    <AccordionIcon mx="auto" />
                </AccordionButton>

                <AccordionPanel
                    h={`calc(100vh - 246px - ${geste ? "44px" : "0px"})`}
                    overflowY="auto"
                    css={scrollBarCSS}
                >
                    <Text>{reclamation}</Text>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default AccordionRow;

const AccordionButtonCss = {
    m: "auto",
    pl: "5px",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    bg: "#2D3748",
};
