import { NextComponentType } from "next";
import { Icon } from "@iconify/react";
import { FunctionComponent } from "react";

interface ISavingThrowData {
    throws: (boolean | null)[]
}

export const SavingThrow: FunctionComponent<ISavingThrowData> = (props) => {
    return (
        <div className="flex flex-col items-center">
                <span className="text-sm">Death Saves</span>
                <div className="flex flex-row justify-center">
                    {
                        props.throws[0]
                        ? <Icon icon="fa6-solid:cross" className="drop-shadow-[0px_0px_2px_#F6E3B9]"/>
                        : <Icon icon="mdi:grave-stone"/>
                    }
                    {
                        props.throws[1]
                        ? <Icon icon="fa6-solid:cross" className="drop-shadow-[0px_0px_2px_#F6E3B9]"/>
                        : <Icon icon="mdi:grave-stone"/>
                    }
                    {
                        props.throws[2]
                        ? <Icon icon="fa6-solid:cross" className="drop-shadow-[0px_0px_2px_#F6E3B9]"/>
                        : <Icon icon="mdi:grave-stone"/>
                    }
                </div>
        </div>
    )
}