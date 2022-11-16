import { Icon } from "@iconify/react";
import { FunctionComponent, useRef } from "react";
import useGame from "../../hooks/useGame";
import { useSocket } from "../../hooks/useSocket";
import WikiButton from "../WikiButton";
import { Message } from "./Message";
import PlayerCounter from "./PlayerCounter";

export const Chat: FunctionComponent = () => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { sendMessage } = useSocket();
  const { messages } = useGame();

  const handleSend = () => {
    sendMessage(inputRef.current.value);
  };

  return (
    <div className="flex flex-col gap-1 h-full w-full">
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
      <div className="flex flex-col justify-between bg-black/20 w-full h-full rounded-xl p-2">
        <div className="flex flex-row items-center">
          <PlayerCounter />
          <WikiButton>Buscar</WikiButton>
        </div>
        <div className="flex flex-col gap-2 w-full h-full justify-end p-2">
          {messages.map(({ role, ...message }, key) => {
            return <Message role={role} props={message} key={key} />;
          })}
        </div>
        <div className="flex flex-row">
          <input
            type="text"
            ref={inputRef}
            placeholder="Prueba /r d20..."
            className="bg-black/20 outline-none w-full pl-3 py-1 rounded-l-full placeholder:text-primary-500 placeholder:font-thin focus:bg-black/50 peer"
          />
          <button
            className="bg-black/20 pr-3 py-1 w-fit h-full rounded-r-full peer-focus:bg-black/50"
            onClick={handleSend}
          >
            <Icon icon="akar-icons:send" />
          </button>
        </div>
      </div>
    </div>
  );
};
