import { Link } from "@chakra-ui/react";
import {
  Link as RouterLink,
  LinkProps,
  useMatch,
  useResolvedPath,
} from "react-router-dom";

interface ActiveLinkProps extends LinkProps {}

export const ActiveLink = ({ children, to }: ActiveLinkProps) => {
  const resolved = useResolvedPath(to);
  console.log(resolved);
  const match = useMatch({ path: resolved.pathname, end: true });
  console.log(match);

  return (
    <Link
      fontSize={"2xl"}
      color={match ? "gray.100" : "purple.100"}
      _hover={{
        color: "gray.100",
      }}
      as={RouterLink}
      to={to}
    >
      {children}
    </Link>
  );
};
