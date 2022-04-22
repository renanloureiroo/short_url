import { Flex, Spinner, useDisclosure, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

import { InputCreateLink } from "./InputCreateLink";
import { ShowLinkCreated } from "./ShowLinkCreated";

interface IResponseCreateLink {
  id: string;
  shortUrl: string;
  url: string;
}

export const CreateLink = () => {
  const { isOpen, onOpen } = useDisclosure();

  const toast = useToast();

  const { mutateAsync, data, isLoading } = useMutation(
    async (link: string) => {
      const { data } = await api.post<IResponseCreateLink>("/links/shorten", {
        link,
      });
      console.log(data);
      return data;
    },
    {
      onError: () => {
        toast({
          status: "error",
          title: "Short link",
          description: "Não foi possível criar o short link",
          duration: 3000,
          position: "top",
        });
      },

      onSuccess: () => {
        queryClient.invalidateQueries("myLinks");
      },
    }
  );

  const handleCreateLink = useCallback(async (url: string) => {
    if (!!url) {
      try {
        await mutateAsync(url);
        onOpen();
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <Flex
      direction="column"
      justifyContent="flex-start"
      w="100%"
      maxW="1240px"
      m="0 auto"
      p="0 8"
    >
      <InputCreateLink onCreate={handleCreateLink} />
      {isLoading ? (
        <Spinner />
      ) : (
        !!data && <ShowLinkCreated isOpen={isOpen} link={data.shortUrl} />
      )}
    </Flex>
  );
};
