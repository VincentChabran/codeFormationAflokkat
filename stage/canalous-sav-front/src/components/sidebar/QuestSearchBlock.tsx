import { MinusIcon, SmallAddIcon } from "@chakra-ui/icons";
import { Box, HStack, Text, Divider, Input, VStack, Checkbox, CheckboxGroup } from "@chakra-ui/react";

import { useApplicationStore } from "../../stores/useApplicationStore";

const QuestSearchBlock = () => {
    const {
        searchClientForQuestionnaire,
        selectiveDisplayForQuestionnaire,
        setSearchClientForQuestionnaire,
        setSelectiveDisplayForQuestionnaire,
        displayInitials,
    } = useApplicationStore();

    const nbDisplay: number = selectiveDisplayForQuestionnaire.length;

    return (
        <>
            <VStack spacing={8} align="stretch">
                <Box>
                    <Input
                        placeholder="Rechercher..."
                        variant="filled"
                        value={searchClientForQuestionnaire}
                        onChange={(e) => setSearchClientForQuestionnaire(e.target.value)}
                    />
                </Box>
                <HStack spacing={4} align="start">
                    <Text whiteSpace="nowrap">Afficher :</Text>
                    <CheckboxGroup
                        value={selectiveDisplayForQuestionnaire}
                        onChange={(e) => setSelectiveDisplayForQuestionnaire(e.map((value) => value.toString()))}
                    >
                        <VStack align="start">
                            {/* Checkbox pour activer ou désactiver All en fonction de la length de selectiveDisplayForQuestionnaire */}
                            <Checkbox
                                // Style de l'icon si la length > 2 affiche un - sinon  +
                                icon={nbDisplay > 2 ? <MinusIcon h={3} w={3} /> : <SmallAddIcon h={5} w={5} />}
                                isChecked={true}
                                // Si la length > 2 set un tableau vide sinon réassigne les valeurs initiales
                                onChange={() => {
                                    if (nbDisplay > 2) setSelectiveDisplayForQuestionnaire([]);
                                    else displayInitials();
                                }}
                            >
                                All
                            </Checkbox>

                            <Checkbox value="Non consulté">Non consulté</Checkbox>
                            <Checkbox value="Consulté">Consulté</Checkbox>
                            <Checkbox value="Bon">Bon</Checkbox>
                            <Checkbox value="Moyen">Moyen</Checkbox>
                            <Checkbox value="Réclamation">Réclamation</Checkbox>
                        </VStack>
                    </CheckboxGroup>
                </HStack>
            </VStack>

            <Divider my={8} />
        </>
    );
};

export default QuestSearchBlock;
