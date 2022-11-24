import { useMutation } from "@apollo/client";
import { gql } from "apollo-server-core";
import Router from "next/router";
import { useEffect } from "react";
import { ICharacterForm } from "../components/Modals/CharacterCreationModal";

export const useCreateCharacter = (payload: ICharacterForm) => {
  const [CreateCharacter, { data }] = useMutation(
    gql`
      mutation CreateCharacter($payload: CharacterCreateInput!) {
        createCharacter(payload: $payload)
      }
    `
  );

  useEffect(() => {
    if (data?.createCharacter) Router.reload();
  }, [data]);

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
