import {
  FormControl,
  FormErrorMessage,
  IconButton,
  Input as ChakraInput,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import { FieldError } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

interface InputPasswordProps extends InputProps {
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputPasswordProps
> = ({ error = null, ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl isInvalid={!!error}>
      <InputGroup display="flex" alignItems="center" justifyContent="center">
        <ChakraInput
          type={showPassword ? "text" : "password"}
          size="lg"
          focusBorderColor="purple.500"
          color="gray.100"
          ref={ref}
          {...rest}
        />
        <InputRightElement h="100%">
          <IconButton
            size="lg"
            _focus={{ outline: "none" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            variant="unstyled"
            aria-label="Senha visível"
            color="gray.300"
            onClick={handleClick}
            icon={
              showPassword ? (
                <MdVisibilityOff size={24} />
              ) : (
                <MdVisibility size={24} />
              )
            }
          />
        </InputRightElement>
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputPassword = forwardRef(InputBase);
