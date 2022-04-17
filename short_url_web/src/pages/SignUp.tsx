import { Box, Flex } from "@chakra-ui/react";
import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import Lottie from "react-lottie";
import LinkAnimation from "../assets/images/linkAnimation.json";
import { SingUpForm } from "../components/SignUpForm";

interface SignUpFormData {
  email: string;
  password: string;
  passwordConfirm: string;
}

export const SignUp = () => {
  const handleRegister: SubmitHandler<SignUpFormData> = useCallback(
    async (data) => {
      console.log(data);
    },
    []
  );

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
