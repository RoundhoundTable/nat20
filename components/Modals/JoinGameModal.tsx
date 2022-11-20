import { NextComponentType } from "next";
import { Input } from "../Input";
import Button from "../Button";
import React, { ElementRef, useEffect, useRef } from "react";
import { useSocket } from "../../hooks/useSocket";
import useModal from "../../hooks/useModal";
import CharacterSelect from "../CharacterSelect";
import { joinRoomSchema } from "../../validation/Room";
import { useForm } from "../../hooks/useForm";

type CharacterSelectHandle = ElementRef<typeof CharacterSelect>;

interface JoinGameForm {
  id: string;
  password: string;
  characterId: string;
}

const JoinGameModal: NextComponentType = () => {
  const { joinRoom } = useSocket();
  const { unsetModal } = useModal();
  const { form, onChange, errors, submit, updateForm } = useForm<JoinGameForm>({
    schema: joinRoomSchema,
  });
  const selectRef = useRef<CharacterSelectHandle>(null);

  const handleJoin = async () => {
    joinRoom(
      form.id,
      form.password,
      (selectRef.current?.selected?.id as string) ?? ""
    );
    unsetModal();
  };

  useEffect(() => {
    if (selectRef.current?.selected)
      updateForm({ ...form, characterId: selectRef.current.selected.id });
  }, [selectRef.current?.selected]);

  return (
    <form
      className="flex flex-col items-center gap-5 overflow-visible"
      onSubmit={(ev: any) => submit({ ev, func: handleJoin })}
    >
      <p className="text-2xl font-bold uppercase text-primary-500">Join Game</p>
      <Input
        name="id"
        label="Game ID"
        type={"text"}
        error={errors?.id}
        onChange={onChange}
      />
      <Input
        name="password"
        label="Password"
        type={"password"}
        onChange={onChange}
        error={errors?.password}
      />
      <CharacterSelect ref={selectRef} />
      <Button>Join</Button>
    </form>
  );
};

export default JoinGameModal;
