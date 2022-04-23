import { Box, Flex, Link, Text, useBreakpointValue } from "@chakra-ui/react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import LinkAnimation from "../assets/images/linkAnimation.json";
import { Button } from "../components/Button";
import { SignInForm } from "../components/SigInForm";

export const SignIn = () => {
  const navigate = useNavigate();

  const screenLarge = useBreakpointValue({
    base: false,
    lg: true,
  });

  const handleAnonymous = () => {
    navigate("/home");
  };
  return (
    <Flex
      direction={screenLarge ? "row" : "column"}
      minHeight="100vh"
      bgColor="gray.900"
      width="100%"
    >
      {screenLarge ? (
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
      ) : (
        <Flex
          height={"30vh"}
          bgColor="purple.600"
          padding="10"
          alignItems="center"
          justifyContent="center"
          borderRadius="0 0 0.5rem 0.5rem"
        >
          <Lottie
            options={{
              animationData: LinkAnimation,
              loop: true,
              autoplay: true,
            }}
          />
        </Flex>
      )}

      <Flex
        flex="2"
        alignItems={["flex-start", "flex-start", "center"]}
        justifyContent="center"
        padding={["4", "4", "10"]}
      >
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
