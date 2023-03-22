import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import {
    Box,
    Heading,
    HStack,
    IconButton,
    Spinner,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQuery } from "urql";

const getEmailTemplatesQuery = `
  query Query {
    mailTemplates {
      id nom fr en de
    }
  }
`;

const updateEmailTemplatesMutation = `
  mutation Mutation($updateMailTemplateInput: UpdateMailTemplateInput!) {
    updateMailTemplate(updateMailTemplateInput: $updateMailTemplateInput) {
      id nom fr en de
    }
  }
`;

const ModelesEmail = () => {
    const [{ data, fetching, error }, reexecuteQuery] = useQuery({
        query: getEmailTemplatesQuery,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [updatedTemplate, setUpdatedTemplate] = useState("");

    const [_, executeMutation] = useMutation(updateEmailTemplatesMutation);

    const updateEmailTemplate = (id: number, langue: string) => {
        executeMutation({
            updateMailTemplateInput: {
                id,
                ...(langue === "fr" && { fr: updatedTemplate }),
                ...(langue === "en" && { en: updatedTemplate }),
                ...(langue === "de" && { de: updatedTemplate }),
            },
        }).then((res) => console.log(res));
    };

    return (
        <>
            <Heading as="h4" size="md">
                Modèles d'email
            </Heading>
            {!data ? (
                <Spinner />
            ) : (
                <VStack p={4} align="stretch" spacing={4}>
                    <Tabs variant="soft-rounded" colorScheme="blue">
                        <TabList>
                            {data.mailTemplates.map(({ nom }: any) => (
                                <Tab key={nom}>{nom}</Tab>
                            ))}
                        </TabList>
                        <TabPanels>
                            {data.mailTemplates.map(({ id, fr, en, de }: any) => (
                                <TabPanel key={id}>
                                    <Tabs variant="soft-rounded" colorScheme="teal">
                                        <TabList>
                                            <Tab>FR</Tab>
                                            <Tab>EN</Tab>
                                            <Tab>DE</Tab>
                                        </TabList>
                                        <TabPanels>
                                            <TabPanel>
                                                <HStack spacing={4} align="start">
                                                    {isEditing ? (
                                                        <>
                                                            <IconButton
                                                                aria-label="check"
                                                                icon={<CheckIcon />}
                                                                size="sm"
                                                                onClick={() => {
                                                                    setIsEditing(false);
                                                                    if (updatedTemplate) updateEmailTemplate(id, "fr");
                                                                    setUpdatedTemplate("");
                                                                }}
                                                            />
                                                            <Textarea
                                                                h="400px"
                                                                defaultValue={fr}
                                                                onChange={(e) => setUpdatedTemplate(e.target.value)}
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <IconButton
                                                                aria-label="edit"
                                                                icon={<EditIcon />}
                                                                size="sm"
                                                                onClick={() => {
                                                                    setIsEditing(true);
                                                                }}
                                                            />
                                                            <Box>
                                                                <Text whiteSpace="pre-wrap">{fr}</Text>
                                                            </Box>
                                                        </>
                                                    )}
                                                </HStack>
                                            </TabPanel>

                                            <TabPanel>
                                                <HStack spacing={4} align="start">
                                                    {isEditing ? (
                                                        <>
                                                            <IconButton
                                                                aria-label="check"
                                                                icon={<CheckIcon />}
                                                                size="sm"
                                                                onClick={() => {
                                                                    setIsEditing(false);
                                                                    updateEmailTemplate(id, "en");
                                                                    setUpdatedTemplate("");
                                                                }}
                                                            />
                                                            <Textarea
                                                                h="400px"
                                                                defaultValue={en}
                                                                onChange={(e) => setUpdatedTemplate(e.target.value)}
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <IconButton
                                                                aria-label="edit"
                                                                icon={<EditIcon />}
                                                                size="sm"
                                                                onClick={() => {
                                                                    setIsEditing(true);
                                                                }}
                                                            />
                                                            <Text whiteSpace="pre-wrap">{en}</Text>
                                                        </>
                                                    )}
                                                </HStack>
                                            </TabPanel>

                                            <TabPanel>
                                                <HStack spacing={4} align="start">
                                                    {isEditing ? (
                                                        <>
                                                            <IconButton
                                                                aria-label="check"
                                                                icon={<CheckIcon />}
                                                                size="sm"
                                                                onClick={() => {
                                                                    setIsEditing(false);
                                                                    updateEmailTemplate(id, "de");
                                                                    setUpdatedTemplate("");
                                                                }}
                                                            />
                                                            <Textarea
                                                                h="400px"
                                                                defaultValue={de}
                                                                onChange={(e) => setUpdatedTemplate(e.target.value)}
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <IconButton
                                                                aria-label="edit"
                                                                icon={<EditIcon />}
                                                                size="sm"
                                                                onClick={() => {
                                                                    setIsEditing(true);
                                                                }}
                                                            />
                                                            <Text whiteSpace="pre-wrap">{de}</Text>
                                                        </>
                                                    )}
                                                </HStack>
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </Tabs>
                </VStack>
            )}
        </>
    );
};

export default ModelesEmail;
