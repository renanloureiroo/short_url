import {
  Box,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { HiClipboardCopy } from "react-icons/hi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useMutation, useQuery } from "react-query";
import { Header } from "../components/Header";
import { api } from "../services/api";
import { formatDate } from "../services/formatDate";
import { queryClient } from "../services/queryClient";

type Link = {
  id: string;
  url: string;
  shortUrl: string;
  visits: number;
  createdAt: string;
};

export const Me = () => {
  const { data, isLoading } = useQuery<Link[]>("myLinks", async () => {
    const response = await api.get<Link[]>("links/me");

    const data = response.data.map((link) => {
      return {
        id: link.id,
        url: link.url,
        shortUrl: link.shortUrl,
        visits: link.visits,
        createdAt: formatDate(link.createdAt),
      };
    });
    console.log(data);
    return data;
  });

  const deleteLink = useMutation(
    async (id: string) => {
      await api.delete(`/links/`, {
        params: { id },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("myLinks");
      },
    }
  );

  const toast = useToast();

  const handleDelete = async (id: string) => {
    try {
      await deleteLink.mutateAsync(id);
    } catch (err) {
      console.log(err);
    }
  };

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
  return (
    <Box bg="gray.800" minH="100vh">
      <Header />
      <Flex direction="column" alignItems="center" w="100%" h="100%">
        <Box as="main" w={"100%"} maxW="1240px" p={8}>
          <TableContainer>
            <Table
              size="lg"
              color="gray.300"
              colorScheme="whiteAlpha"
              variant="simple"
            >
              <Thead>
                <Tr>
                  <Th>URL</Th>
                  <Th textAlign="center">SHORT</Th>
                  <Th textAlign="center">VISITAS</Th>
                  <Th textAlign="center">DATA</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>

              <Tbody>
                {!isLoading &&
                  data &&
                  data.map((link) => (
                    <Tr key={link.id}>
                      <Tooltip
                        hasArrow
                        label={link.url}
                        aria-label="URL"
                        openDelay={500}
                      >
                        <Td
                          maxWidth={"500px"}
                          textOverflow="ellipsis"
                          overflowX="hidden"
                        >
                          {link.url}
                        </Td>
                      </Tooltip>
                      <Td>{link.shortUrl}</Td>
                      <Td textAlign="center">{link.visits}</Td>
                      <Td textAlign="center">{link.createdAt}</Td>
                      <Td>
                        <IconButton
                          colorScheme="purple"
                          size="lg"
                          aria-label="Copiar link curto"
                          icon={<HiClipboardCopy fontSize={20} />}
                          onClick={() => handleCopyShortLink(link.shortUrl)}
                        />
                      </Td>
                      <Td>
                        <IconButton
                          colorScheme="red"
                          bg="red.700"
                          size="lg"
                          aria-label="Excluir"
                          icon={<RiDeleteBin5Fill fontSize={20} />}
                          onClick={() => handleDelete(link.id)}
                        />
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </Box>
  );
};
