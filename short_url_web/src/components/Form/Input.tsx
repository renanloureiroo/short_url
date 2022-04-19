import {
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <ChakraInput
        size="lg"
        focusBorderColor="purple.500"
        color="gray.100"
        ref={ref}
        {...rest}
      />
      {!!error && (
        <FormErrorMessage data-testId="errorMessage">
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
