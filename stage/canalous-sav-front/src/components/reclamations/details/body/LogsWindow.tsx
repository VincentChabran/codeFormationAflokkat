import { MutableRefObject } from "react";
import { Box, Divider, Heading, HStack, List, ListItem, Spacer, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

import { scrollBarCSS } from "../../../../utils/scrollBarCss";

type LogsWindowProps = {
    reclamation: {
        geste: string;
        logs: [
            {
                log: string;
                createdAt: string;
            }
        ];
    };
    bg: string;
    messagesEndRef: MutableRefObject<HTMLDivElement | null>;
};
const LogsWindow = ({ reclamation, bg, messagesEndRef }: LogsWindowProps) => {
    const { geste, logs } = reclamation;

    return (
        <Box
            flex="1"
            h={`calc(100vh - 265px - ${geste ? "44px" : "0px"})`}
            overflowY="auto"
            p="10px"
            color="white"
            bg={bg}
            rounded="md"
            shadow="md"
        >
            <HStack>
                <Spacer />

                <Heading size="md" pr={8}>
                    Historique
                </Heading>
            </HStack>

            <Divider my={2} />

            <List spacing={2} sx={ListCss} h={`calc(100vh - 350px - ${geste ? "44px" : "0px"})`} css={scrollBarCSS}>
                {logs.map(({ log, createdAt }: any, index: number) => (
                    <ListItem key={index}>
                        <HStack>
                            <Text fontSize={13}>{dayjs(parseInt(createdAt)).format("HH:mm:ss DD/MM/YY")} |</Text>
                            <Text fontSize={14}>{log}</Text>
                        </HStack>
                    </ListItem>
                ))}

                <div ref={messagesEndRef} />
            </List>
        </Box>
    );
};

export default LogsWindow;

const ListCss = {
    w: "100%",
    mb: 2,
    p: 2,
    display: "inline-block",
    overflowY: "auto",
};
