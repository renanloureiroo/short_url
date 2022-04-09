import { Button, Flex, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineLink } from "react-icons/hi";
import Lottie from "react-lottie";
import * as Yup from "yup";
import { Input } from "../components/Form/Input";
import { InputPassword } from "../components/Form/InputPassword";
import LinkAnimation from "../public/images/linkAnimation.json";
import { api } from "../services/api";

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const response = await api.post("/accounts/authenticate", {
        email,
        password,
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex minHeight="100vh" bgColor="gray.700" width="100%">
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
        <Stack flex="1" spacing={4} as="form" maxW="96" align="center">
          <HiOutlineLink size={72} color="#E2E8F0" />

          <Input />

          <InputPassword />

          <Button
            title="Entrar"
            colorScheme="purple"
            type="submit"
            width="100%"
          >
            Entrar
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};
