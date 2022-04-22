import { Avatar, Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ActiveLink } from "./ActiveLink";
import { Button } from "./Button";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    navigate("/");
  }, []);
  const { authenticated, signOut, user } = useAuth();

  return (
    <Box as="header" width={"100%"} h="300px" bg="purple.600">
      <Flex
        width={"100%"}
        maxW="1920px"
        m="0 auto"
        py={6}
        px={8}
        alignItems="center"
        justifyContent={"flex-start"}
      >
        <Heading mr={20} color={"white"}>
          SHORTLINK
        </Heading>
        <Stack direction="row" spacing={6}>
          <ActiveLink to={"/home"}>Início</ActiveLink>
          {authenticated && <ActiveLink to={"/me"}>Meus Links</ActiveLink>}
        </Stack>
        <Flex ml="auto">
          <Button
            size={"lg"}
            maxW="100px"
            bg={"gray.700"}
            color="gray.100"
            _hover={{
              bg: "gray.900",
            }}
            _active={{
              bg: "purple.600",
            }}
            mx={"10"}
            title={authenticated ? "Sair" : "Login"}
            onClick={authenticated ? signOut : handleLogin}
          />
          {authenticated && (
            <Avatar data-testid="avatar" size={"md"} name={user?.name} />
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
