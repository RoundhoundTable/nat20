import { NextComponentType } from "next";
import { Input } from "../Input";
import Button from "../Button";
import { useSocket } from "../../hooks/useSocket";
import useModal from "../../hooks/useModal";
import { createRoomSchema } from "../../validation/Room";
import { useForm } from "../../hooks/useForm";

interface CreateGameForm {
  password: string;
}

const CreateGameModal: NextComponentType = () => {
  const { createRoom } = useSocket();
  const { unsetModal } = useModal();
  const { form, onChange, errors, submit } = useForm<CreateGameForm>({
    schema: createRoomSchema,
  });

  const handleCreate = async () => {
    createRoom(form.password);
    unsetModal();
  };

  return (
    <form
      className="flex flex-col items-center gap-5"
      onSubmit={(ev: any) => submit({ ev, func: handleCreate })}
    >
      <p className="text-2xl font-bold uppercase text-primary-500">
        Create Game
      </p>
      <Input
        name="password"
        label="Password"
        type={"password"}
        onChange={onChange}
        error={errors?.password}
      />
      <Button>Create</Button>
    </form>
  );
};

export default CreateGameModal;
