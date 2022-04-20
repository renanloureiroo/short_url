import { Avatar, Box, Flex, Stack } from "@chakra-ui/react";
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
        maxW="1240px"
        m="0 auto"
        p={6}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Stack direction="row" spacing={6}>
          <ActiveLink to={"/home"}>Início</ActiveLink>
          {authenticated && <ActiveLink to={"/me"}>Meus Links</ActiveLink>}
        </Stack>
        <Flex>
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
