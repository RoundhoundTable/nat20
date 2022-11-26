import { useMutation } from "@apollo/client";
import { gql } from "apollo-server-core";
import Router from "next/router";
import { useEffect } from "react";
import { ICharacterForm } from "../components/Modals/CharacterCreationModal";
import useLoading from "./useLoading";

export const useCreateCharacter = (payload: ICharacterForm) => {
  const { toggleLoading } = useLoading();
  const [CreateCharacter, { data, loading }] = useMutation(
    gql`
      mutation CreateCharacter($payload: CharacterCreateInput!) {
        createCharacter(payload: $payload)
      }
    `
  );

  useEffect(() => {
    if (data?.createCharacter) {
      Router.reload();
      toggleLoading();
    }
  }, [data]);

  useEffect(() => {
    if (loading) toggleLoading();
  }, [loading]);

  return {
    createCharacter: () =>
      CreateCharacter({
        variables: {
          payload: {
            ...payload,
            level: parseInt(payload.level),
            initiative: parseInt(payload.initiative),
            hitPoints: parseInt(payload.hitPoints),
            proficiencyBonus: parseInt(payload.proficiencyBonus),
            classArmor: parseInt(payload.classArmor),
            speed: parseInt(payload.speed),
          },
        },
      }),
  };
};
