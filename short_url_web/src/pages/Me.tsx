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
} from "@chakra-ui/react";
import { HiClipboardCopy } from "react-icons/hi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useQuery } from "react-query";
import { api } from "../services/api";

type Link = {
  id: string;
  url: string;
  shortUrl: string;
  visits: number;
};

export const Me = () => {
  const { data, isLoading } = useQuery("myLinks", async () => {
    const { data } = await api.get<Link[]>("links/me");
    console.log(data);

    return data;
  });
  return (
    <Box bg="gray.800" minH="100vh">
      <Box as="header" h="300px" bg="purple.600"></Box>
      <Flex direction="column" alignItems="center" w="100%" h="100%">
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
                <Th>SHORT</Th>
                <Th>VISITAS</Th>
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
                      <Td textOverflow="ellipsis" overflowX="hidden">
                        {link.url}
                      </Td>
                    </Tooltip>
                    <Td>{link.shortUrl}</Td>
                    <Td textAlign="center">{link.visits}</Td>
                    <Td>
                      <IconButton
                        colorScheme="purple"
                        size="lg"
                        aria-label="Copiar link curto"
                        icon={<HiClipboardCopy fontSize={20} />}
                      />
                    </Td>
                    <Td>
                      <IconButton
                        colorScheme="red"
                        bg="red.700"
                        size="lg"
                        aria-label="Copiar link curto"
                        icon={<RiDeleteBin5Fill fontSize={20} />}
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Box>
  );
};
