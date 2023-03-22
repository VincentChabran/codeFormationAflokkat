import {
    Radio,
    RadioGroup as RadioGroupChakra,
    FormControl,
    FormLabel,
    FormErrorMessage,
    HStack,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";

type InputFieldProps = FieldHookConfig<string> & {
    label: string;
    placeholder?: string;
    isRequired?: boolean;
};

const RadioGroup = ({ label, placeholder, isRequired = false, type = "text", ...props }: InputFieldProps) => {
    const [field, meta] = useField(props);

    const hasError = Boolean(meta.touched && meta.error);
    return (
        <FormControl isInvalid={hasError}>
            <FormLabel htmlFor={field.name} fontWeight="bold" fontSize="xs" textTransform="uppercase">
                {label}
            </FormLabel>
            <RadioGroupChakra id={field.name} {...field}>
                <HStack spacing={8}>
                    <Radio value="commercial">Commercial</Radio>
                    <Radio value="base">Base</Radio>
                    <Radio value="direction">Direction</Radio>
                </HStack>
            </RadioGroupChakra>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default RadioGroup;
