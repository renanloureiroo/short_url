import { Button, Stack, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { Input } from "./Form/Input";
import { InputPassword } from "./Form/InputPassword";
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

export const SignIn = () => {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleSignIn: SubmitHandler<FormData> = async (data, e) => {
    e?.preventDefault();
    console.log(data, e);
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      navigate("/home");
    } catch (err) {
      if (err instanceof Error) {
        toast({
          position: "top",
          title: err.message,
          description: "Verifique seu e-mail e senha",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  return (
    <Stack
      flex="1"
      spacing={4}
      as="form"
      maxW="96"
      align="center"
      onSubmit={handleSubmit(handleSignIn)}
    >
      <Input placeholder="E-mail" {...register("email")} error={errors.email} />

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
        isLoading={isLoading}
      >
        Entrar
      </Button>
    </Stack>
  );
};
