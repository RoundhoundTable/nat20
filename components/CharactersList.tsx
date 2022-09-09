import { NextComponentType } from "next";
import { useState } from "react";
import { Character } from "./Character";

export const CharactersList: NextComponentType = () => {
    const [viewList, setViewList] = useState<boolean>(false)

    return (
        <div className="absolute top-0 right-0 bg-[#21222A]/50 w-96">
            <button className="text-white font-bold w-full h-16 text-center uppercase" onClick={() => setViewList(!viewList)}>Characters</button>
            {viewList &&
                <>
                    <div className="max-h-72 overflow-auto snap-y">
                        <Character picture="https://picsum.photos/100" name="Azariah Ravawraek" _class="Sorcerer" level={3} />
                        <Character picture="https://picsum.photos/200" name="Azariah Ravawraek" _class="Sorcerer" level={3} />
                        <Character picture="https://picsum.photos/100" name="Azariah Ravawraek" _class="Sorcerer" level={3} />
                        <Character picture="https://picsum.photos/100" name="Azariah Ravawraek" _class="Sorcerer" level={3} />
                        <Character picture="https://picsum.photos/100" name="Azariah Ravawraek" _class="Sorcerer" level={3} />
                        <Character picture="https://picsum.photos/100" name="Azariah Ravawraek" _class="Sorcerer" level={3} />
                        <Character picture="https://picsum.photos/100" name="Azariah Ravawraek" _class="Sorcerer" level={3} />
                    </div>
                    <button className="text-white font-bold w-full h-16 text-center">New character</button>
                </>
            }
        </div>
    )
}