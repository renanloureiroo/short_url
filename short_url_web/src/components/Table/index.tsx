import { TableContainer, Tbody, Table as TableChakra } from "@chakra-ui/react";
import { Head } from "./Head";
import { TrCustom } from "./TrCustom";

type LinkType = {
  id: string;
  url: string;
  visits: number;
};

interface TableProps {
  data: LinkType[];
}

export const Table = ({ data }: TableProps) => {
  return (
    <TableContainer>
      <TableChakra
        size={"lg"}
        color="gray.300"
        colorScheme="whiteAlpha"
        variant="simple"
      >
        <Head />
        <Tbody>
          {data.map((link) => (
            <TrCustom key={link.id} data={link} />
          ))}
        </Tbody>
      </TableChakra>
    </TableContainer>
  );
};
