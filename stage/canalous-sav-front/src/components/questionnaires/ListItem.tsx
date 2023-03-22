import { useNavigate } from "react-router-dom";
import { Grid, Text, Badge, HStack, Divider } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useColorModeValue } from "@chakra-ui/react";
import { useMutation } from "urql";

type ListItemProps = {
    id: number;
    nomClient: string;
    appreciation: number;
    recommandation: number;
    tag: string;
};

const updateQuestionnaireMutation = `
  mutation Mutation($updateQuestionnaireInput: UpdateQuestionnaireInput!) {
    updateQuestionnaire(updateQuestionnaireInput: $updateQuestionnaireInput) {
      id
    }
  }
`;

export const MyRating = ({ value, ...props }: any) => {
    return (
        <HStack spacing={1} {...props}>
            {Array.from(Array(value), (index) => (
                <StarIcon key={index} color="yellow.500" />
            ))}{" "}
            {Array.from(Array(4 - value), (index) => (
                <StarIcon key={index} color={"gray"} />
            ))}
        </HStack>
    );
};

const ListItem = ({ id, nomClient, appreciation, recommandation, tag }: ListItemProps) => {
    const navigate = useNavigate();
    const bg = useColorModeValue("gray.400", "gray.600");

    const [_, executeUpdateQuestionnaireMutation] = useMutation(updateQuestionnaireMutation);

    const createQuestionnaire = (id: number) => {
        if (tag === "Non consulté")
            executeUpdateQuestionnaireMutation({
                updateQuestionnaireInput: {
                    id,
                    statut: "Consulté",
                },
            }).then((res) => navigate(`/questionnaires/${id}`));
        else navigate(`/questionnaires/${id}`);
    };

    return (
        <Grid
            sx={gridCss}
            bg={bg}
            border={tag === "Non consulté" ? "2px solid orange" : ""}
            onClick={() => createQuestionnaire(id)}
        >
            {/* Numero */}
            <Text>n° {id}</Text>

            {/* Nom du Client */}
            <Text fontWeight="bold" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" pr={4}>
                {nomClient}
            </Text>

            {/* Etoile appreciation */}

            <HStack>
                <Divider orientation="vertical" h="100%" />
                <MyRating value={appreciation} />
            </HStack>

            {/* Etoile recommandation */}
            <HStack>
                <Divider orientation="vertical" h="100%" />
                <MyRating value={recommandation} />
            </HStack>

            {/* Badge de Fin "l'etat" */}
            <Badge
                variant="solid"
                m="auto"
                colorScheme={
                    tag === "Bon"
                        ? "green"
                        : tag === "Moyen"
                        ? "orange"
                        : tag === "Réclamation"
                        ? "red"
                        : tag === "Non consulté"
                        ? "yellow"
                        : "blue"
                }
            >
                {tag}
            </Badge>
        </Grid>
    );
};

export default ListItem;

// Css for main Grid component
const gridCss = {
    gridTemplateColumns: {
        base: "75px 175px 125px 1fr 100px",
        lg: "75px 250px 150px 1fr 100px",
    },
    p: 4,
    borderRadius: 10,
    cursor: "pointer",
    overflow: "hidden",
    _hover: {
        bg: "gray.500",
        transform: "scale(1.01)",
        transitionDuration: "0.2s",
    },
};
