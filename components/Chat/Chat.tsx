import { Icon } from "@iconify/react";
import { FunctionComponent, useRef, useState } from "react";
import useGame from "../../hooks/useGame";
import { useSocket } from "../../hooks/useSocket";
import { IMessage } from "../../interfaces/game";
import WikiButton from "../WikiButton";
import { Message } from "./Message";
import PlayerCounter from "./PlayerCounter";

export const Chat: FunctionComponent = () => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [image, setImage] = useState<File | null>(null);
  const [imageObjectUrl, setImageObjectUrl] = useState<string>("");
  const { sendMessage } = useSocket();
  const { messages } = useGame();

  const handleSend = () => {
    let obj: Pick<IMessage, "message" | "media"> = {
      message: inputRef.current.value,
    };

    if (image) {
      const reader = new FileReader();

      reader.readAsDataURL(image);

      return (reader.onload = () => {
        obj.media = reader.result as string;
        sendMessage(obj);
        revokeAttachedImage();
        inputRef.current.value = "";
      });
    }

    sendMessage(obj);
    inputRef.current.value = "";
  };

  const revokeAttachedImage = () => {
    URL.revokeObjectURL(imageObjectUrl);
    setImage(null);
    setImageObjectUrl("");
  };

  const handleAttachImage = (ev: any) => {
    if (ev.target.files && ev.target.files.length > 0) {
      const file = ev.target.files[0];
      const url = URL.createObjectURL(file);

      setImage(file);
      setImageObjectUrl(url);
    }
  };

  return (
    <div className="flex flex-col gap-1 h-full w-full overflow-hidden">
      <div className="flex flex-row justify-end">
        <button>
          <Icon
            icon="mdi:dice-d4-outline"
            className="w-7 h-7 drop-shadow-[0px_0px_2px_#F6E3B9]"
          />
        </button>
        <button>
          <Icon
            icon="mdi:dice-d6-outline"
            className="w-7 h-7 drop-shadow-[0px_0px_2px_#F6E3B9]"
          />
        </button>
        <button>
          <Icon
            icon="mdi:dice-d8-outline"
            className="w-7 h-7 drop-shadow-[0px_0px_2px_#F6E3B9]"
          />
        </button>
        <button>
          <Icon
            icon="mdi:dice-d10-outline"
            className="w-7 h-7 drop-shadow-[0px_0px_2px_#F6E3B9]"
          />
        </button>
        <button>
          <Icon
            icon="mdi:dice-d12-outline"
            className="w-7 h-7 drop-shadow-[0px_0px_2px_#F6E3B9]"
          />
        </button>
        <button>
          <Icon
            icon="mdi:dice-d20-outline"
            className="w-7 h-7 drop-shadow-[0px_0px_2px_#F6E3B9]"
          />
        </button>
      </div>
      <div className="flex flex-col justify-between bg-black/20 w-full h-full rounded-xl p-2 overflow-hidden">
        <div className="flex flex-row items-center gap-6">
          <PlayerCounter />
          <WikiButton>Buscar</WikiButton>
        </div>
        <div className="flex flex-col gap-2 w-full h-full p-2 overflow-auto z-10">
          {messages.map(({ role, ...message }, key) => {
            return <Message role={role} props={message} key={key} />;
          })}
        </div>
        {image && (
          <div className="flex flex-row">
            <img
              src={imageObjectUrl}
              className="relative left-0 bottom-0 w-1/6 p-4 aspect-square object-cover drop-shadow-lg rounded-3xl "
            />
            <Icon
              icon="ri:close-circle-fill"
              className="text-danger-800 h-8 w-8 -translate-x-full"
              onClick={revokeAttachedImage}
            />
          </div>
        )}
        <form
          className="flex flex-row"
          onSubmit={(ev: any) => {
            ev.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            ref={inputRef}
            placeholder="Prueba /r d20..."
            className="bg-black/20 outline-none w-full pl-3 py-1 rounded-l-full placeholder:text-primary-500 placeholder:font-thin focus:bg-black/50 peer"
          />
          <div className="flex flex-row bg-black/20 w-fit h-full rounded-r-full items-center px-3 gap-4">
            <div className="relative top-0 left-0 grid items-center justify-center w-full h-full">
              <input
                type="file"
                className="absolute w-full h-full opacity-0"
                onChange={handleAttachImage}
                accept=".jpg,.jpeg,.png,.webp"
              />
              <Icon icon="mdi:file-image-plus" />
            </div>
            <button type="submit">
              <Icon icon="akar-icons:send" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
