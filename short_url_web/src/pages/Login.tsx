import { Box, Button, Fade, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import Lottie from "react-lottie";
import LinkAnimation from "../assets/images/linkAnimation.json";
import { Register } from "../components/Register";
import { SignIn } from "../components/SigIn";
import { useAuth } from "../hooks/useAuth";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  passwordConfirm: string;
}

export const Login = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { signIn } = useAuth();

  const handleSignIn = () => {};

  const handleRegister: SubmitHandler<RegisterData> = useCallback(
    async (data) => {
      console.log(data);
    },
    []
  );

  const handleToggle = useCallback(() => {
    onClose();
  }, []);

  return (
    <Flex minHeight="100vh" bgColor="gray.900" width="100%">
      <Flex
        flex="1"
        bgColor="purple.600"
        padding="10"
        alignItems="center"
        justifyContent="center"
        borderRadius="0 0.5rem 0.5rem 0"
      >
        <Lottie
          options={{
            animationData: LinkAnimation,
            loop: true,
            autoplay: true,
          }}
        />
      </Flex>
      <Flex flex="2" alignItems="center" justifyContent="center" padding=" 0 2">
        {!isOpen ? (
          <Fade in={!isOpen}>
            <Box padding="8" bg="gray.800" borderRadius="2xl">
              <SignIn />

              <Text color="gray.300" mt="4">
                Não tem uma conta?{" "}
                <Button
                  onClick={onOpen}
                  _hover={{
                    color: "purple.100",
                    textDecoration: "underline",
                  }}
                  variant="unstyled"
                  p="0 2"
                >
                  Crie aqui!
                </Button>
              </Text>
            </Box>
          </Fade>
        ) : (
          <Fade in={isOpen}>
            <Box>
              <Register handleRegister={handleRegister} goBack={handleToggle} />
            </Box>
          </Fade>
        )}
      </Flex>
    </Flex>
  );
};
