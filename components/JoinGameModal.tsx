import { NextComponentType } from "next";
import Modal from "../components/Modal";
import Input from "./Input";
import Button from "../components/Button";

const JoinGameModal: NextComponentType = () => {
  return (
    <>
      <Modal>
        <h1 className="py-5 text-2xl font-bold text-center">JOIN GAME</h1>
        <div className="px-2 font-medium">Game ID</div>
        <Input />
        <div className="px-2 mt-4 font-medium">Password</div>
        <Input />
        <br />
        <br />
        <Button>JOIN</Button>
      </Modal>
    </>
  );
};

export default JoinGameModal;
