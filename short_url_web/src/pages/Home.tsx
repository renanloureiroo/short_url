import {
  Box,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdAddLink } from "react-icons/md";
import { Header } from "../components/Header";
import { Pagination } from "../components/Pagination";
import { useLinks } from "../hooks/useLinks";
import { api } from "../services/api";

export const Home = () => {
  const [link, setLink] = useState("");

  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useLinks(page);

  const handleShortingLink = async () => {
    if (link) {
      try {
        const { data } = await api.post("/links/shorten", { link });
        setLink("");
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Box bg="gray.800" minHeight="100vh">
      <Header />
      <Flex w="100%" maxW="1240px" m="0 auto" p="0 8">
        <InputGroup mt="-31px">
          <InputLeftAddon
            p="8"
            children="URL"
            color="purple.600"
            fontWeight="bold"
          />

          <Input
            type="url"
            size="lg"
            bg="white"
            py="8"
            pr={"50px"}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <InputRightElement
            w="4rem"
            height={"100%"}
            display="flex"
            alignItems={"center"}
            justifyContent="center"
          >
            <IconButton
              p="8"
              _hover={{ color: "purple.600" }}
              _focus={{ border: "none" }}
              aria-label="Gerar url curta"
              icon={<MdAddLink size={32} />}
              onClick={handleShortingLink}
              variant="unstyled"
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex
        direction="column"
        w="100%"
        mt="10"
        alignItems="center"
        justifyContent="center"
      >
        <Heading color={"gray.100"} fontSize="md" fontWeight={"bold"}>
          Ranking Top 100 {!isLoading && isFetching && <Spinner size={"md"} />}
        </Heading>

        <TableContainer>
          <Table
            size={"lg"}
            color="gray.300"
            colorScheme="whiteAlpha"
            variant="simple"
          >
            <Thead>
              <Tr>
                <Th>URL</Th>
                <Th>VISITAS</Th>
              </Tr>
            </Thead>

            <Tbody>
              {!isLoading &&
                data?.links.map((link) => (
                  <Tr key={link.id}>
                    <Tooltip
                      hasArrow
                      label={link.url}
                      aria-label="URL"
                      openDelay={500}
                    >
                      <Td
                        maxW="500px"
                        textOverflow="ellipsis"
                        overflowX="hidden"
                      >
                        {link.url}
                      </Td>
                    </Tooltip>
                    <Td textAlign="center">{link.visits}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>

        {!isLoading && (
          <Pagination
            totalCount={data!.totalCount}
            onPageChange={setPage}
            currentPage={page}
            itensPerPage={5}
          />
        )}
      </Flex>
    </Box>
  );
};
