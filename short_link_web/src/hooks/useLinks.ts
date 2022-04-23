import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../services/api";

type Link = {
  id: string;
  url: string;
  visits: number;
  shortUrl: string;
  userId: string | null;
};

type GetLinksResponse = {
  totalCount: number;
  links: Link[];
};

const getLinks = async (page: number): Promise<GetLinksResponse> => {
  const { data: links, headers } = await api.get(`/links/paginate?`, {
    params: {
      page,
      limit: 5,
    },
  });

  const totalCount = Number(headers["x-total-count"]);

  return {
    totalCount,
    links,
  };
};

const useLinks = (page: number, options?: UseQueryOptions) => {
  return useQuery(["links", page], () => getLinks(page), {
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};

export { useLinks, getLinks };
