import { Tag, TagLabel } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

type MyCustomTagProps = {
    setEmailLangage: Dispatch<SetStateAction<string>>;
};

const MyCustomTag = ({ setEmailLangage }: MyCustomTagProps) => {
    const choixLangages = ["FR", "EN", "DE"];

    return (
        <>
            {choixLangages.map((el) => (
                <Tag
                    key={el}
                    size="sm"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="blue"
                    style={{ cursor: "pointer" }}
                    onClick={() => setEmailLangage(el)}
                >
                    <TagLabel>{el}</TagLabel>
                </Tag>
            ))}
        </>
    );
};

export default MyCustomTag;
