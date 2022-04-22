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
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiClipboardCopy } from "react-icons/hi";
import { MdAddLink } from "react-icons/md";
import { useMutation } from "react-query";
import { Header } from "../components/Header";
import { Pagination } from "../components/Pagination";
import { useLinks } from "../hooks/useLinks";
import { api } from "../services/api";
import { queryClient } from "../services/queryClient";

interface IResponseCreateLink {
  id: string;
  shortUrl: string;
  url: string;
}

export const Home = () => {
  const [link, setLink] = useState("");
  const { isOpen, onOpen } = useDisclosure();

  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error: errorLinks } = useLinks(page);

  const toast = useToast();

  const handleCopyShortLink = (shortLink: string) => {
    navigator.clipboard.writeText(`http://localhost:3333/${shortLink}`);

    toast({
      status: "success",
      title: "Copiado",
      description: "Short link copiado",
      duration: 2000,
      position: "top",
    });
  };

  const {
    mutateAsync,
    data: responseData,
    isLoading: isLoadingCreate,
    error,
  } = useMutation(
    async (link: string) => {
      const { data } = await api.post<IResponseCreateLink>("/links/shorten", {
        link,
      });

      return data;
    },
    {
      onError: () => {
        toast({
          status: "error",
          title: "Short link",
          description: "Não foi possível criar o short link",
          duration: 3000,
          position: "top",
        });
      },

      onSuccess: () => {
        queryClient.invalidateQueries("myLinks");
      },
    }
  );

  const handleShortingLink = async () => {
    if (!!link) {
      try {
        await mutateAsync(link);
        onOpen();
        setLink("");
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
        <Collapse in={true} animateOpacity>
          {isLoading ? (
            <Spinner />
          ) : (
            !!responseData && (
              <Flex
                color={"gray.100"}
                height={"10"}
                borderRadius="base"
                textAlign={"center"}
                align="center"
                justifyContent={"center"}
                p="8"
                mb={8}
              >
                <Stack direction={"row"} alignItems="center" spacing={4}>
                  <Text fontSize="lg" fontWeight="bold">
                    {`http://localhost:3333/${responseData?.shortUrl}`}
                  </Text>
                  <Divider
                    orientation="vertical"
                    height={8}
                    colorScheme={"purple"}
                  />
                  <IconButton
                    colorScheme="purple"
                    size="lg"
                    aria-label="Copiar link curto"
                    icon={<HiClipboardCopy fontSize={20} />}
                    onClick={() => handleCopyShortLink(responseData?.shortUrl)}
                  />
                </Stack>
              </Flex>
            )
          )}
        </Collapse>

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
              {isLoading ? (
                <Text> Loading...</Text>
              ) : errorLinks ? (
                <Text> Erro ao carregar dados</Text>
              ) : (
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
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>

        {!isLoading && !error && (
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
