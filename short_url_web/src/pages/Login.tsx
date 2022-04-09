import { Button, Flex, Input, Stack } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import Lottie from "react-lottie";
import LinkAnimation from "../public/images/linkAnimation.json";
import { api } from "../services/api";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
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
        <Stack flex="1" gap="4" as="form" maxW="96" onSubmit={handleSubmit}>
          <Input
            placeholder="E-mail"
            type="email"
            size="lg"
            focusBorderColor="purple.500"
            color="gray.100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Senha"
            type="password"
            size="lg"
            focusBorderColor="purple.500"
            color="gray.100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button title="Entrar" colorScheme="purple" type="submit">
            Entrar
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};
