import { Input, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";

type InputFieldProps = FieldHookConfig<string> & {
    label: string;
    login?: boolean;
    placeholder?: string;
    isRequired?: boolean;
};

const InputField = ({
    label,
    login = false,
    placeholder,
    isRequired = false,
    type = "text",
    ...props
}: InputFieldProps) => {
    const [field, meta] = useField(props);

    const hasError = Boolean(meta.touched && meta.error);
    return (
        <FormControl isInvalid={hasError} isRequired={isRequired} mb={login ? 8 : 0}>
            <FormLabel htmlFor={field.name} fontWeight="bold" fontSize="xs" textTransform="uppercase">
                {label}
            </FormLabel>
            <Input id={field.name} placeholder={placeholder} w={login ? "300px" : "full"} {...field} type={type} />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default InputField;
