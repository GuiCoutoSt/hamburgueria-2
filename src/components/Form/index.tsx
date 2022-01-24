import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as CahkraInputProps,
  InputGroup,
} from "@chakra-ui/react";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface IInputProps extends CahkraInputProps {
  name: string;
  label: string;
  error?: string;
  register: any;
}

export const Input = ({
  name,
  label,
  error,
  register,
  ...rest
}: IInputProps) => {
  return (
    <FormControl isInvalid={error ? true : false}>
      <InputGroup flexDirection="column">
        <FormLabel fontSize="sm">{label}</FormLabel>
        <ChakraInput
          {...rest}
          _placeholder={{ fontSize: "xs" }}
          border="2px"
          borderColor="gray.700"
          {...register(name)}
        />

        <FormErrorMessage fontSize="xs" mt="2" color="red.500">
          {error}
        </FormErrorMessage>
      </InputGroup>
    </FormControl>
  );
};
