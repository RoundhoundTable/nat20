import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";

interface IMurceData {
    gold: number
    silver: number
    bronze: number
}

export const Purse: FunctionComponent<IMurceData> = (props) => {
    return (
        <div className="flex flex-row justify-center items-center gap-2">
            <Icon icon="healthicons:money-bag" />
            <span className="text-yellow-300 drop-shadow-[0px_0px_1px_#FFD700]">{props.gold}</span>
            <span className="text-gray-300">{props.silver}</span>
            <span className="text-orange-400">{props.bronze}</span>
        </div>
    )
}