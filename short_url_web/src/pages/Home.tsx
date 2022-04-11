import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdAddLink } from "react-icons/md";
import { api } from "../services/api";

export const Home = () => {
  const [link, setLink] = useState("");

  const handleShortingLink = async () => {
    try {
      await api.post("/links/shorten", { link });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box bg="gray.800" minHeight="100vh">
      <Box h="300px" bg="purple.600"></Box>
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
