import { NextComponentType } from "next";
import { Input } from "../Input";
import Button from "../Button";
import { createRef } from "react";
import { useSocket } from "../../hooks/useSocket";

const JoinGameModal: NextComponentType = () => {
  const { joinRoom } = useSocket();
  const passwordRef = createRef() as React.MutableRefObject<HTMLInputElement>;
  const idRef = createRef() as React.MutableRefObject<HTMLInputElement>;

  const handleJoin = () => {
    joinRoom(idRef.current.value, passwordRef.current.value, "1");
  };

  return (
    <form
      className="flex flex-col items-center gap-5"
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
      <Button onClick={handleJoin}>Join</Button>
    </form>
  );
};

export default JoinGameModal;
