import { NextComponentType } from "next";
import { Icon } from "@iconify/react";

export const SavingThrow:NextComponentType = () => {
    return (
        <div className="flex flex-col">
                <span className="text-sm">Death Saves</span>
                <div className="flex flex-row">
                    <Icon icon="fa6-solid:cross" className="drop-shadow-[0px_0px_2px_#F6E3B9]"/>
                    <Icon icon="mdi:grave-stone"/>
                    <Icon icon="mdi:grave-stone"/>
                </div>
        </div>
    )
}