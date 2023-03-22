import { Textarea, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";

type TextAreaProps = FieldHookConfig<string> & {
    label: string;
    placeholder?: string;
};

const TextArea = ({ label, placeholder, ...props }: TextAreaProps) => {
    const [field, meta] = useField(props);

    const hasError = Boolean(meta.touched && meta.error);
    return (
        <FormControl isInvalid={hasError} mb={8}>
            <FormLabel htmlFor={field.name} fontWeight="bold" fontSize="xs" textTransform="uppercase">
                {label}
            </FormLabel>
            <Textarea id={field.name} placeholder={placeholder} {...field} />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default TextArea;
