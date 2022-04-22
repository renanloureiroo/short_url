import { Spinner, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useLinks } from "../../hooks/useLinks";
import { Pagination } from "../Pagination";
import { Table } from "../Table";

export const ListLinks = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isRefetching, isError } = useLinks(page);

  const handlePage = useCallback((page: number) => {
    setPage(page);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Text>Erro ao carregar links</Text>;
  }

  return (
    <>
      <Table data={data!.links} />
      <Pagination
        totalCount={data!.totalCount}
        onPageChange={handlePage}
        currentPage={page}
        itensPerPage={5}
      />
    </>
  );
};
