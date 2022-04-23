import {
  Avatar,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  IconButtonProps,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ActiveLink } from "./ActiveLink";
import { Button } from "./Button";
import { IoMenu } from "react-icons/io5";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    navigate("/");
  }, []);
  const { authenticated, signOut, user } = useAuth();

  const isWideScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  if (!isWideScreen) {
    return (
      <>
        <Flex
          as="header"
          width={"100%"}
          h="200px"
          bg="purple.600"
          alignItems={"center"}
          justifyContent={"center"}
          pt={authenticated ? "0" : "50px"}
        >
          <IconButton
            position="absolute"
            colorScheme={"whiteAlpha"}
            bg="gray.700"
            aria-label="Menu"
            icon={<IoMenu />}
            top={4}
            left={4}
            ref={btnRef}
            onClick={onOpen}
            zIndex={1}
          />
          <Heading color={"white"}>SHORTLINK</Heading>
        </Flex>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          colorScheme="whiteAlpha"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton color={"white"} size={"lg"} />
            {authenticated && (
              <DrawerHeader
                display="flex"
                alignItems={"center"}
                justifyContent="center"
                w={"100%"}
                bg={"purple.700"}
              >
                <Avatar data-testid="avatar" size={"2xl"} name={user?.name} />
              </DrawerHeader>
            )}
            <DrawerBody pt={authenticated ? "0" : "16"} bg={"purple.700"}>
              <Stack direction="column" spacing={4}>
                <Box>
                  <ActiveLink to={"/home"}>Início</ActiveLink>
                  <Divider />
                </Box>
                {authenticated && (
                  <Box>
                    <ActiveLink to={"/me"}>Meus Links</ActiveLink>
                    <Divider />
                  </Box>
                )}
              </Stack>
            </DrawerBody>

            <DrawerFooter bg={"purple.700"}>
              <Button
                size={"lg"}
                bg={"gray.700"}
                color="gray.100"
                _hover={{
                  bg: "gray.900",
                }}
                _active={{
                  bg: "purple.600",
                }}
                title={authenticated ? "Sair" : "Login"}
                onClick={authenticated ? signOut : handleLogin}
              />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

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
