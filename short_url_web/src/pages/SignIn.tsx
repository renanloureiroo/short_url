import { Box, Flex, Link, Text } from "@chakra-ui/react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import LinkAnimation from "../assets/images/linkAnimation.json";
import { Button } from "../components/Button";
import { SignInForm } from "../components/SigInForm";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  passwordConfirm: string;
}

export const SignIn = () => {
  const navigate = useNavigate();

  const handleAnonymous = () => {
    navigate("/home");
  };
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
        <Box
          w={"100%"}
          maxW="400px"
          padding="8"
          bg="gray.800"
          borderRadius="2xl"
        >
          <SignInForm />

          <Text color="gray.300" mt="4">
            Não tem uma conta? <Link href="/signup">Crie aqui!</Link>
          </Text>

          <Button
            mt={"10"}
            title="Continue anônimo"
            bg={"purple.300"}
            color={"gray.100"}
            onClick={handleAnonymous}
          />
        </Box>
      </Flex>
    </Flex>
  );
};
