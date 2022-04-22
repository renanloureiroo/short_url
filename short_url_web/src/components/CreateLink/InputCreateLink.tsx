import {
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdAddLink } from "react-icons/md";

interface InputCreateLinkProps extends InputProps {
  onCreate: (url: string) => Promise<void>;
}

export const InputCreateLink = ({
  onCreate,
  ...rest
}: InputCreateLinkProps) => {
  const [link, setLink] = useState("");
  return (
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
        {...rest}
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
          onClick={() => onCreate(link)}
          variant="unstyled"
        />
      </InputRightElement>
    </InputGroup>
  );
};
