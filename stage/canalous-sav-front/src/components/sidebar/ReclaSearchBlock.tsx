import { MinusIcon, SmallAddIcon } from "@chakra-ui/icons";
import { Box, HStack, Text, Divider, Input, VStack, Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useApplicationStore } from "../../stores/useApplicationStore";

const ReclaSearchBlock = () => {
    const { searchClient, selectiveDisplay, setSearchClient, setSelectiveDisplay, displayInitials } =
        useApplicationStore();

    const checboxChoise: string[] = [
        "Nouvellement créée",
        "Constitution du dossier",
        "Proposition du geste commercial",
        "Geste commercial validé",
        "Proposition au client",
        "Retour client",
        "Cloturée",
    ];

    const nbDisplay: number = selectiveDisplay.length;

    return (
        <>
            <VStack spacing={8} align="stretch">
                <Box>
                    <Input
                        placeholder="Rechercher..."
                        variant="filled"
                        value={searchClient}
                        onChange={(e) => setSearchClient(e.target.value)}
                    />
                </Box>
                <HStack spacing={4} align="start">
                    <Text whiteSpace="nowrap">Afficher :</Text>
                    <CheckboxGroup
                        value={selectiveDisplay}
                        onChange={(e) => setSelectiveDisplay(e.map((value) => value.toString()))}
                    >
                        <VStack align="start">
                            <Checkbox
                                // Style de l'icon si la length > 2 affiche un - sinon  +
                                icon={nbDisplay > 2 ? <MinusIcon h={3} w={3} /> : <SmallAddIcon h={5} w={5} />}
                                isChecked={true}
                                // Si la length > 2 set un tableau vide sinon réassigne les valeurs initiales
                                onChange={() => {
                                    if (nbDisplay > 2) setSelectiveDisplay([]);
                                    else displayInitials();
                                }}
                            >
                                All
                            </Checkbox>

                            {checboxChoise.map((el) => (
                                <Checkbox key={el} value={el}>
                                    {el}
                                </Checkbox>
                            ))}
                        </VStack>
                    </CheckboxGroup>
                </HStack>
            </VStack>

            <Divider my={4} />
        </>
    );
};

export default ReclaSearchBlock;
