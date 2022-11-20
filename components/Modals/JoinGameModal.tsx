import { NextComponentType } from "next";
import { Input } from "../Input";
import Button from "../Button";
import React, { createRef, ElementRef, useRef } from "react";
import { useSocket } from "../../hooks/useSocket";
import useModal from "../../hooks/useModal";
import CharacterSelect from "../CharacterSelect";

type CharacterSelectHandle = ElementRef<typeof CharacterSelect>;

const JoinGameModal: NextComponentType = () => {
  const { joinRoom } = useSocket();
  const { unsetModal } = useModal();
  const selectRef = useRef<CharacterSelectHandle>(null);
  const passwordRef = createRef() as React.MutableRefObject<HTMLInputElement>;
  const idRef = createRef() as React.MutableRefObject<HTMLInputElement>;

  const handleJoin = () => {
    joinRoom(
      idRef.current.value,
      passwordRef.current.value,
      selectRef.current?.selected.id as string
    );
    unsetModal();
  };

  return (
    <form
      className="flex flex-col items-center gap-5 overflow-visible"
      onSubmit={(ev: any) => ev.preventDefault()}
    >
      <p className="text-2xl font-bold uppercase text-primary-500">Join Game</p>
      <Input ref={idRef} name="id" label="Game ID" type={"text"} />
      <Input
        ref={passwordRef}
        name="password"
        label="Password"
        type={"password"}
      />
      <CharacterSelect ref={selectRef} />
      <Button onClick={handleJoin}>Join</Button>
    </form>
  );
};

export default JoinGameModal;
