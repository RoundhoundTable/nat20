import { NextComponentType } from "next";
import { PlayerDisplay } from "./PlayerDisplay";
import { twMerge } from "tailwind-merge";

export const PlayerList: NextComponentType = () => {
    return (
        <div className="overflow-auto w-full md:w-1/2 h-1/3 md:h-full flex flex-row md:flex-col gap-3">
            <PlayerDisplay picture="https://picsum.photos/100" hitPoints={16} name="Azariah Ravawraek" _class="Sorcerer" level={3} CA={14} currentHitPoints={8}/>
            <PlayerDisplay picture="https://picsum.photos/100" hitPoints={16} name="Azariah Ravawraek" _class="Sorcerer" level={3} CA={14} currentHitPoints={2}/>
            <PlayerDisplay picture="https://picsum.photos/100" hitPoints={16} name="Azariah Ravawraek" _class="Sorcerer" level={3} CA={14} currentHitPoints={0}/>
            <PlayerDisplay picture="https://picsum.photos/100" hitPoints={16} name="Azariah Ravawraek" _class="Sorcerer" level={3} CA={14} currentHitPoints={10}/>
            <PlayerDisplay picture="https://picsum.photos/100" hitPoints={16} name="Azariah Ravawraek" _class="Sorcerer" level={3} CA={14} currentHitPoints={10}/>
            <PlayerDisplay picture="https://picsum.photos/100" hitPoints={16} name="Azariah Ravawraek" _class="Sorcerer" level={3} CA={14} currentHitPoints={16}/>
            <PlayerDisplay picture="https://picsum.photos/100" hitPoints={16} name="Azariah Ravawraek" _class="Sorcerer" level={3} CA={14} currentHitPoints={10}/>
        </div>
    )
}