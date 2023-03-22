// Used in ../questionnaires/List.tsx , ../reclamations/List.tsx

import { Dispatch, SetStateAction } from "react";
import { Button, Grid, HStack, Spacer, Text } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

type ListHeaderProps = {
    nbPages: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    text1: string;
    text2: string;
};

const ListHeader = ({ nbPages, page, setPage, text1, text2 }: ListHeaderProps) => {
    return (
        <Grid
            pr={8}
            templateColumns={{
                base: "275px 125px 1fr 100px",
                lg: "350px 150px 1fr 100px",
            }}
        >
            <HStack px={2}>
                {/* Start Step */}
                <Button size="sm" isDisabled={page === 1} onClick={() => setPage(1)}>
                    <ArrowLeftIcon />
                </Button>

                {/* Back - 1*/}
                <Button size="sm" isDisabled={page === 1} onClick={() => setPage(page - 1)}>
                    <ChevronLeftIcon h={6} w={6} />
                </Button>

                <Text>
                    Page {page}/{nbPages}
                </Text>

                {/* Next + 1*/}
                <Button size="sm" isDisabled={page === nbPages} onClick={() => setPage(page + 1)}>
                    <ChevronRightIcon h={6} w={6} />
                </Button>

                {/* End Step */}
                <Button size="sm" isDisabled={page === nbPages} onClick={() => setPage(nbPages)}>
                    <ArrowRightIcon />
                </Button>
            </HStack>

            <Text fontWeight="light" my="auto">
                {text1}
            </Text>

            <Text fontWeight="light" my="auto">
                {text2}
            </Text>
        </Grid>
    );
};

export default ListHeader;
