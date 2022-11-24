import { useQuery } from "@apollo/client";
import { gql } from "apollo-server-core";

export const useUserCharacterList = () => {
  const { data, loading } = useQuery(gql`
    query Characters {
      characters {
        id
        class
        name
        level
        picture
      }
    }
  `);

  return {
    characters: data?.characters,
    isLoading: loading,
  };
};
