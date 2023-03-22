import { Box, Divider, Heading, HStack, IconButton, List, ListItem, Spacer, Text } from "@chakra-ui/react";
import { AiOutlineDownload } from "react-icons/ai";
import { useParams } from "react-router-dom";

import { scrollBarCSS } from "../../../../utils/scrollBarCss";

type AttachementsWindowProps = {
    reclamation: {
        geste: string;
        files: [];
    };
    bg: string;
};

const AttachementsWindow = ({ reclamation, bg }: AttachementsWindowProps) => {
    const { geste, files } = reclamation;

    const { id: reclamationId } = useParams();

    return (
        <Box
            flex="1"
            h={`calc(100vh - 265px - ${geste ? "44px" : "0px"})`}
            p="10px"
            overflowY="auto"
            color="white"
            bg={bg}
            rounded="md"
            shadow="md"
        >
            <HStack>
                <Spacer />
                <Heading size="md" pr={8}>
                    Pièces jointes
                </Heading>
            </HStack>
            <Divider my={2} />

            <List spacing={4} sx={ListCss} h={`calc(100vh - 350px - ${geste ? "44px" : "0px"})`} css={scrollBarCSS}>
                {files.map(({ id, filename }: any) => (
                    <ListItem key={id}>
                        <HStack spacing={4} align="start">
                            {console.log(id)}

                            <IconButton
                                aria-label="Télécharger"
                                color="white"
                                size="sm"
                                icon={<AiOutlineDownload />}
                                onClick={() =>
                                    window.open(
                                        `https://wss.sc.lescanalous.com/files/${reclamationId}/${filename}`,
                                        "_blank"
                                    )
                                }
                            />
                            <Text fontWeight="bold">{filename}</Text>
                        </HStack>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default AttachementsWindow;

const ListCss = {
    w: "100%",
    mb: 2,
    p: 2,
    pr: 4,
    display: "inline-block",
    overflowY: "auto",
};
