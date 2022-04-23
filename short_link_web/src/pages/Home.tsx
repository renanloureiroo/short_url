import { Box, Flex, Heading } from "@chakra-ui/react";
import { CreateLink } from "../components/CreateLink";
import { Header } from "../components/Header";
import { ListLinks } from "../components/ListLinks";

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
