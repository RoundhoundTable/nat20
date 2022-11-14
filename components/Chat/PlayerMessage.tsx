import Image from "next/image";
import { FunctionComponent } from "react";

interface IPlayerMessageData {
    thumbnail: string
    name: string
    message: string
}

export const PlayerMessage: FunctionComponent<IPlayerMessageData> = (props) => {
    return (
        <div className="flex flex-row gap-5">
            <div className="relative w-12 h-12 overflow-hidden rounded-full">
                <Image src={props.thumbnail} layout="fill" objectFit="cover" className="p-5 object-cover" />
            </div>
            <div className="flex flex-col border-b-2 border-primary-500">
                <span className="text-primary-500 font-bold">{props.name}</span>
                <span className="text-white">{props.message}</span>
            </div>
        </div>
    )
}