import { Box, Divider, Heading, HStack, List, ListItem, Spacer, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

import { scrollBarCSS } from "../../../../utils/scrollBarCss";

type PropositionsWindowProps = {
    reclamation: {
        geste: string;
        propositions: [
            {
                geste: string;
                statut: string;
                createdAt: string;
                commentaire: string;
            }
        ];
    };
    bg: string;
};

const PropositionsWindow = ({ reclamation, bg }: PropositionsWindowProps) => {
    const { geste, propositions } = reclamation;

    return (
        <Box
            bg={bg}
            h={`calc(100vh - 265px - ${geste ? "44px" : "0px"})`}
            flex="1"
            p="10px"
            overflowY="auto"
            color="white"
            rounded="md"
            shadow="md"
        >
            <HStack>
                <Spacer />

                <Heading size="md" pr={8}>
                    Propositions
                </Heading>
            </HStack>

            <Divider my={2} />

            <List spacing={4} sx={ListCss} h={`calc(100vh - 350px - ${geste ? "44px" : "0px"})`} css={scrollBarCSS}>
                {propositions.map((proposition: any, index: number) => (
                    <ListItem key={proposition.createdAt}>
                        <HStack spacing={4}>
                            <Text fontWeight="bold">{proposition.geste}</Text>

                            <Text>proposé le</Text>

                            <Text fontWeight="">
                                {dayjs(parseInt(proposition.createdAt)).format("DD/MM/YYYY à HH:mm:ss ")}
                            </Text>

                            <Text>-</Text>

                            <Text fontWeight="bold">{proposition.statut}</Text>
                        </HStack>

                        {proposition.commentaire && <Text>Commentaire du client : {proposition.commentaire}</Text>}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default PropositionsWindow;

const ListCss = {
    w: "100%",
    mb: 2,
    p: 2,
    pr: 4,
    display: "inline-block",
    overflowY: "auto",
};
