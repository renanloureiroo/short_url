import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import Lottie from "react-lottie";
import LinkAnimation from "../assets/images/linkAnimation.json";
import { SingUpForm } from "../components/SignUpForm";

export const SignUp = () => {
  const screenLarge = useBreakpointValue({
    base: false,
    lg: true,
  });

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
          w="100%"
          maxW={"400px"}
          padding="8"
          bg="gray.800"
          borderRadius="2xl"
        >
          <SingUpForm />
        </Box>
      </Flex>
    </Flex>
  );
};
