import { FunctionComponent } from "react";

interface ICharacterStatData {
    name: string
    value: number
}

export const CharacterStat: FunctionComponent<ICharacterStatData> = (props) => {
    return (
        <div className="flex flex-col items-center px-1 md:p-2">
            <span className="uppercase font-bold text-md drop-shadow-[0px_0px_2px_#F6E3B9]">{props.name}</span>
            <div className="flex flex-row text-xs">
                <span>{props.value}</span>
                <span className="font-thin">({((props.value - 10) / 2) | 0})</span>
            </div>
        </div>
    )
}