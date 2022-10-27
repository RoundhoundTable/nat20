import { NextComponentType } from "next";
import Input from "./Input";
import Button from "../components/Button";

const JoinGameModal: NextComponentType = () => {
  return (
    <div className="flex flex-col items-center gap-5 text-white">
      <p className="text-2xl font-bold uppercase">Join Game</p>
      <div>
        <p className="font-medium">Game ID</p>
        <Input />
      </div>
      <div>
        <p className="font-medium">Password</p>
        <Input />
      </div>
      <Button>Join</Button>
    </div>
  );
};

export default JoinGameModal;
