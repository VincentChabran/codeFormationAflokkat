import { Tr, Td, Text } from "@chakra-ui/react";

const MyTableRowForInfos = ({ value, text }: any) => {
    return (
        <Tr>
            <Td>
                <Text
                    fontWeight="light"
                    whiteSpace="nowrap"
                    color={value ? "inherit" : "gray"}
                    fontStyle={value ? "inherit" : "italic"}
                >
                    {value ?? text}
                </Text>
            </Td>
        </Tr>
    );
};

export default MyTableRowForInfos;
