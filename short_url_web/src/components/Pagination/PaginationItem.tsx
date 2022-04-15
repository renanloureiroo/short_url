import { Button, ButtonProps } from "@chakra-ui/react";

interface PaginationItemProps extends ButtonProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export const PaginationItem = ({
  isCurrent = false,
  number,
  onPageChange,
  ...rest
}: PaginationItemProps) => {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        colorScheme="purple"
        disabled
        _disabled={{
          bg: "purple.500",
          cursor: "default",
        }}
        {...rest}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      colorScheme="purple"
      bg="gray.600"
      _hover={{
        bg: "gray.400",
      }}
      onClick={() => onPageChange(number)}
      {...rest}
    >
      {number}
    </Button>
  );
};
