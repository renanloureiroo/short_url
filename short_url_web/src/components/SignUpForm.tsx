import { Button, Flex, Stack, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiUserAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { api } from "../services/api";
import { Input } from "./Form/Input";
import { InputPassword } from "./Form/InputPassword";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório!"),
  email: Yup.string()
    .email("E-mail inválido!")
    .required("E-mail é obrigatório!"),
  password: Yup.string()
    .required("Senha é obrigatória!")
    .min(6, "A senha deve ter pelo menos 6 caracteres!"),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "As senhas não conferem!"
  ),
});

export const SingUpForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  const toast = useToast();

  const navigate = useNavigate();
  const handleSignUp = async ({ email, name, password }: SignUpFormData) => {
    setLoading(true);
    try {
      await api.post("/account/signup", {
        name,
        email,
        password,
      });

      navigate("/signin");
    } catch (err) {
      if (err instanceof Error) {
        toast({
          status: "error",
          title: err.message,
          description: "Falha ao criar uma conta!",
          duration: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      w={"100%"}
      flex="1"
      spacing={4}
      as="form"
      align="center"
      onSubmit={handleSubmit(handleSignUp)}
    >
      <RiUserAddFill size={72} color="#E2E8F0" />

      <Input
        type={"text"}
        placeholder="Name"
        {...register("name")}
        error={errors.name}
      />
      <Input
        type={"email"}
        placeholder="E-mail"
        {...register("email")}
        error={errors.email}
      />

      <InputPassword
        placeholder="Senha"
        {...register("password")}
        error={errors.password}
      />

      <InputPassword
        placeholder="Confirmar senha"
        {...register("passwordConfirm")}
        error={errors.passwordConfirm}
      />
      <Flex w="100%">
        <Button
          title="Entrar"
          colorScheme="purple"
          type="submit"
          width="100%"
          isLoading={loading}
        >
          Criar
        </Button>
      </Flex>
    </Stack>
  );
};
