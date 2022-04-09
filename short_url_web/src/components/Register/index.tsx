import { Button, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiUserAddFill } from "react-icons/ri";
import * as Yup from "yup";
import { Input } from "../Form/Input";
import { InputPassword } from "../Form/InputPassword";

interface RegisterForm {
  email: string;
  password: string;
  passwordConfirm: string;
}

const schema = Yup.object().shape({
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

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });

  const handleRegister: SubmitHandler<RegisterForm> = (data) => {
    console.log(data);
  };

  return (
    <Stack
      flex="1"
      spacing={4}
      as="form"
      maxW="96"
      align="center"
      onSubmit={handleSubmit(handleRegister)}
    >
      <RiUserAddFill size={72} color="#E2E8F0" />

      <Input placeholder="E-mail" {...register("email")} error={errors.email} />

      <InputPassword
        placeholder="Senha"
        {...register("password")}
        error={errors.password}
      />

      <Button title="Entrar" colorScheme="purple" type="submit" width="100%">
        Entrar
      </Button>
    </Stack>
  );
};
