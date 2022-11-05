import { NextComponentType } from "next";
import { Input } from "../Input";
import Button from "../Button";

const JoinGameModal: NextComponentType = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-2xl font-bold uppercase text-primary-500">Join Game</p>
      <Input name="id" label="Game ID" type={"text"} />
      <Input name="password" label="Password" type={"password"} />
      <Button>Join</Button>
    </div>
  );
};

export default JoinGameModal;
