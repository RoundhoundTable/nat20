import { NextComponentType } from "next";
import { CharacterDisplay } from "./CharacterDisplay";
import { Chat } from "./Chat/Chat";

export const PlayerView: NextComponentType = () => {
    return (
        <div className="flex flex-col w-full h-screen bg-background-500 text-primary-500 font-poppins overflow-hidden">
            <div className="w-full">
                <CharacterDisplay
                    picture="https://picsum.photos/900/100"
                    name="Azariah Ravawraek"
                    _class="Sorcerer"
                    level={3}
                    initiative={2}
                    CA={15}
                    hitPoints={16}
                    currentHitPoints={9}
                    strength={10}
                    dexterity={15}
                    constitution={16}
                    intelligence={10}
                    wisdom={16}
                    charisma={19}
                    savingThrows={[false, true]}
                    gold={25}
                    silver={15}
                    bronze={5}
                />
            </div>
            <div className="h-full px-3 pb-3">
                <Chat conectedUsers={5} />
            </div>
        </div>
    )
}