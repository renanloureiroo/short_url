import { Text } from "@chakra-ui/react";

type Link = {
  url: string;
  shortUrl: string;
  userId: string | null;
};

interface ItemProps {
  data: Link;
}

export const Item = ({ data }: ItemProps) => {
  return (
    <Text color="gray.100" fontSize="lg">
      {data.url}
    </Text>
  );
};
