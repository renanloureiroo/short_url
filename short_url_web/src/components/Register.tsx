import { Button, Flex, IconButton, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { RiUserAddFill } from "react-icons/ri";
import * as Yup from "yup";
import { Input } from "./Form/Input";
import { InputPassword } from "./Form/InputPassword";

interface RegisterData {
  email: string;
  password: string;
  passwordConfirm: string;
}

interface RegisterProps {
  handleRegister: (data: RegisterData) => Promise<void>;
  goBack: () => void;
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

export const Register = ({ handleRegister, goBack }: RegisterProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(schema),
  });

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

      <InputPassword
        placeholder="Confirmar senha"
        {...register("password")}
        error={errors.password}
      />
      <Flex w="100%">
        <IconButton
          aria-label="Voltar"
          fontSize={22}
          mr={4}
          icon={<BiArrowBack />}
          onClick={goBack}
        />
        <Button title="Entrar" colorScheme="purple" type="submit" width="100%">
          Criar
        </Button>
      </Flex>
    </Stack>
  );
};
