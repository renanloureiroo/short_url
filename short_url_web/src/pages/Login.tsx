import { Button, Flex, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineLink } from "react-icons/hi";
import Lottie from "react-lottie";
import * as Yup from "yup";
import { Input } from "../components/Form/Input";
import { InputPassword } from "../components/Form/InputPassword";
import LinkAnimation from "../public/images/linkAnimation.json";

interface FormData {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido!")
    .required("E-mail é obrigatório!"),
  password: Yup.string().required("Senha é obrigatória!"),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleSignIn: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    // try {
    //   const response = await api.post("/accounts/authenticate", {});

    //   console.log(response.data);
    // } catch (err) {
    //   console.log(err);
    // }
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
        <Stack
          flex="1"
          spacing={4}
          as="form"
          maxW="96"
          align="center"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <HiOutlineLink size={72} color="#E2E8F0" />

          <Input
            placeholder="E-mail"
            {...register("email")}
            error={errors.email}
          />

          <InputPassword
            placeholder="Senha"
            {...register("password")}
            error={errors.password}
          />

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
