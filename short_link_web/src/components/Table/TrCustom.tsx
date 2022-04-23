import { Td, Tooltip, Tr } from "@chakra-ui/react";
import { memo } from "react";

type LinkType = {
  id: string;
  url: string;
  visits: number;
};

interface TrCustomProps {
  data: LinkType;
}

const BaseComponent = ({ data }: TrCustomProps) => {
  return (
    <Tr>
      <Td textAlign="center">{data.visits}</Td>
      <Tooltip hasArrow label={data.url} aria-label="URL" openDelay={500}>
        <Td
          maxW={["200px", "200px", "500px"]}
          textOverflow="ellipsis"
          overflowX="hidden"
        >
          {data.url}
        </Td>
      </Tooltip>
    </Tr>
  );
};

export const TrCustom = memo(BaseComponent, (prevProps, nextProps) => {
  return (
    prevProps.data.id === nextProps.data.id &&
    prevProps.data.visits === nextProps.data.visits
  );
});
