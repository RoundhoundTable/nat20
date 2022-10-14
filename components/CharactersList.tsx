import { NextComponentType } from "next";
import { useState } from "react";
import { Character } from "./Character";
import { twMerge } from "tailwind-merge";

export const CharactersList: NextComponentType = () => {
    const [viewList, setViewList] = useState<boolean>(false)

    return (
        <div className={twMerge("absolute top-0 right-0 bg-[#21222A] w-full md:w-96 md:h-auto", viewList && "h-screen z-10")}>
            <button className="text-white font-bold w-full h-16 text-center uppercase" onClick={() => setViewList(!viewList)}>Characters</button>
            {viewList &&
                <>
                    <div className="h-full md:max-h-72 overflow-auto snap-y">
                        <Character picture="https://picsum.photos/100" name="Azariah Ravawraek" _class="Sorcerer" level={3} />
                        <Character picture="https://picsum.photos/200" name="Azariah Ravawraek" _class="Sorcerer" level={3} />
                        <Character picture="https://picsum.photos/100" name="Azariah Ravawraek" _class="Sorcerer" level={3} />
                        <Character picture="https://picsum.photos/100" name="Azariah Ravawraek" _class="Sorcerer" level={3} />
                        <Character picture="https://picsum.photos/100" name="Azariah Ravawraek" _class="Sorcerer" level={3} />
                        <Character picture="https://picsum.photos/100" name="Azariah Ravawraek" _class="Sorcerer" level={3} />
                        <Character picture="https://picsum.photos/100" name="Azariah Ravawraek" _class="Sorcerer" level={3} />
                    </div>
                    <button className="sticky bottom-0 text-white font-bold w-full h-16 text-center">New character</button>
                </>
            }
        </div>
    )
}