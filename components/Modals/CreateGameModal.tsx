import { NextComponentType } from "next";
import { Input } from "../Input";
import Button from "../Button";
import { useSocket } from "../../hooks/useSocket";
import { useState } from "react";
import useModal from "../../hooks/useModal";

const CreateGameModal: NextComponentType = () => {
  const { createRoom } = useSocket();
  const { unsetModal } = useModal();
  const [password, setPassword] = useState<string>("");

  const handleCreate = () => {
    createRoom(password);
    unsetModal();
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-2xl font-bold uppercase text-primary-500">
        Create Game
      </p>
      <Input
        onChange={(ev) => setPassword(ev.target.value)}
        value={password}
        name="password"
        label="Password"
        type={"password"}
      />
      <Button onClick={handleCreate}>Create</Button>
    </div>
  );
};

export default CreateGameModal;
