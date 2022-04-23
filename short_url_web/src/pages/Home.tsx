import {
  Box,
  Collapse,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { HiClipboardCopy } from "react-icons/hi";
import { MdAddLink } from "react-icons/md";
import { useMutation } from "react-query";
import { CreateLink } from "../components/CreateLink";
import { Header } from "../components/Header";
import { ListLinks } from "../components/ListLinks";
import { Pagination } from "../components/Pagination";
import { Table } from "../components/Table";
import { useLinks } from "../hooks/useLinks";
import { api } from "../services/api";
import { queryClient } from "../services/queryClient";

interface IResponseCreateLink {
  id: string;
  shortUrl: string;
  url: string;
}

export const Home = () => {
  return (
    <Box bg="gray.900" height={"100%"} minHeight="100vh">
      <Header />
      <CreateLink />
      <Flex
        direction="column"
        w="100%"
        mt="10"
        alignItems="center"
        justifyContent="center"
      >
        <Heading color={"gray.100"} fontSize="md" fontWeight={"bold"}>
          Ranking Top 100
        </Heading>
        <ListLinks />
      </Flex>
    </Box>
  );
};
