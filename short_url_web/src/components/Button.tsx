import {
  Button as ButtonChakra,
  ButtonProps as ButtonChakraProps,
} from "@chakra-ui/react";

interface ButtonProps extends ButtonChakraProps {
  title: string;
}

export const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <ButtonChakra colorScheme={"purple"} w={"100%"} {...rest}>
      {title}
    </ButtonChakra>
  );
};
