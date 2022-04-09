import {
  FormControl,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  error: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { error = null, ...rest },
  ref
) => {
  return (
    <FormControl>
      <ChakraInput
        placeholder="E-mail"
        size="lg"
        focusBorderColor="purple.500"
        color="gray.100"
        ref={ref}
        {...rest}
      />
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
