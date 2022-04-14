import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdAddLink } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

export const Home = () => {
  const [link, setLink] = useState("");

  const { authenticated, user, signOut, loading } = useAuth();

  const navigate = useNavigate();

  const handleMyLinks = async () => {
    const response = await api.get("/links/me");

    console.log(response.data);
  };

  const handleShortingLink = async () => {
    try {
      await api.post("/links/shorten", { link });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!loading && !authenticated) {
      navigate("/login");
    }
  }, []);

  return (
    <Box bg="gray.800" minHeight="100vh">
      <Box as="header" h="300px" bg="purple.600">
        <Button onClick={signOut}>Sair</Button>
        <Button onClick={handleMyLinks}>Get my links</Button>
        <Avatar name={user?.name} />
      </Box>
      <Flex w="100%" maxW="1240px" m="0 auto" p=" 0 16">
        <InputGroup mt="-31px">
          <InputLeftAddon
            p="8"
            children="URL"
            color="purple.600"
            fontWeight="bold"
          />
          <Input type="url" size="lg" bg="white" p="8" />
          <InputRightElement padding="8">
            <IconButton
              _hover={{ color: "purple.600" }}
              _focus={{ border: "none" }}
              aria-label="Gerar url curta"
              icon={<MdAddLink size={32} />}
              variant="unstyled"
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
};
