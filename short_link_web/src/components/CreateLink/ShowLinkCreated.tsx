import {
  Collapse,
  Divider,
  Flex,
  IconButton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { HiClipboardCopy } from "react-icons/hi";

interface ShowLinkCreatedProps {
  link: string;
  isOpen: boolean;
}

export const ShowLinkCreated = ({ link, isOpen }: ShowLinkCreatedProps) => {
  const toast = useToast();

  const handleCopyShortLink = () => {
    navigator.clipboard.writeText(`http://localhost:3333/${link}`);

    toast({
      status: "success",
      title: "Copiado",
      description: "Short link copiado",
      duration: 2000,
      position: "top",
    });
  };

  return (
    <Collapse in={isOpen} animateOpacity>
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
            {`http://localhost:3333/${link}`}
          </Text>
          <Divider orientation="vertical" height={8} colorScheme={"purple"} />
          <IconButton
            colorScheme="purple"
            size="lg"
            aria-label="Copiar link curto"
            icon={<HiClipboardCopy fontSize={20} />}
            onClick={handleCopyShortLink}
          />
        </Stack>
      </Flex>
    </Collapse>
  );
};
