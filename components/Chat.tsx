import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";
import WikiButton from "./WikiButton";

interface IChatData {
    conectedUsers: number
}

export const Chat: FunctionComponent<IChatData> = (props) => {
    return (
        <div className="flex flex-col gap-1 h-full w-full">
            <div className="flex flex-col justify-between bg-black/20 w-full h-full rounded-xl p-2">
                <div className="flex flex-row items-center border-b-2 border-primary-500 gap-2">
                    <div className="flex flex-row items-center">
                        <Icon icon="bxs:user" />
                        {props.conectedUsers}
                    </div>
                    <WikiButton>Busqueda</WikiButton>
                    <div className="flex flex-row justify-end w-full">
                        <button><Icon icon="mdi:dice-d4-outline" className="w-7 h-7 drop-shadow-[0px_0px_2px_#F6E3B9]" /></button>
                        <button><Icon icon="mdi:dice-d6-outline" className="w-7 h-7 drop-shadow-[0px_0px_2px_#F6E3B9]" /></button>
                        <button><Icon icon="mdi:dice-d8-outline" className="w-7 h-7 drop-shadow-[0px_0px_2px_#F6E3B9]" /></button>
                        <button><Icon icon="mdi:dice-d10-outline" className="w-7 h-7 drop-shadow-[0px_0px_2px_#F6E3B9]" /></button>
                        <button><Icon icon="mdi:dice-d12-outline" className="w-7 h-7 drop-shadow-[0px_0px_2px_#F6E3B9]" /></button>
                        <button><Icon icon="mdi:dice-d20-outline" className="w-7 h-7 drop-shadow-[0px_0px_2px_#F6E3B9]" /></button>
                    </div>
                </div>
                <span>aca van los mensajes pero no hay diseño de eso todavia asi que se hace despues</span>
                <div className="flex flex-row">
                    <input type="text" placeholder="Prueba /r d20..." className="bg-black/20 w-full pl-3 py-1 rounded-l-full placeholder:text-primary-500 placeholder:font-thin"/>
                    <button><Icon icon="akar-icons:send" className="bg-black/20 pr-3 py-1 w-full h-full rounded-r-full" /></button>
                </div>
            </div>
        </div>
    )
}