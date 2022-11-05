import { useMutation, useQuery } from "@apollo/client";
import { gql } from "apollo-server-core";
import Router from "next/router";
import { useEffect } from "react";

export const useDeleteCharacter = (id: string) => {
  const [DeleteCharacter, { data }] = useMutation(
    gql`
      mutation DeleteCharacter($id: String!) {
        deleteCharacter(id: $id)
      }
    `
  );

  useEffect(() => {
    if (data?.deleteCharacter) Router.reload();
  }, [data]);

  return {
    deleteCharacter: () =>
      DeleteCharacter({
        variables: {
          id,
        },
      }),
  };
};
