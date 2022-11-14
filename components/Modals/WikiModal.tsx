import { Icon } from "@iconify/react";
import { NextComponentType } from "next";
import { useState } from "react";
import Armor from "../Wiki/Armor";
import EquipmentPack from "../Wiki/EquipmentPack";
import Gear from "../Wiki/Gear";
import MagicItems from "../Wiki/MagicItems";
import Spell from "../Wiki/Spell";
import Weapons from "../Wiki/Weapons";

export const WikiModal: NextComponentType = () => {

    const [SearchWeapons, setSearchWeapons] = useState<boolean>(false);
    const [SearchSpells, setSearchSpells] = useState<boolean>(false);
    const [SearchArmor, setSearchArmor] = useState<boolean>(false);
    const [SearchGear, setSearchGear] = useState<boolean>(false);
    const [SearchEquipment, setSearchEquipment] = useState<boolean>(false);
    const [SearchMagic, setSearchMagic] = useState<boolean>(false);

    return (
        <div className="px-20 flex flex-col">
            {/* <input type="text" className="bg-background-700 border-2 border-primary-500 text-primary-500" /> */}
            <span className="flex flex-row items-center gap-1 p-2 bg-transparent text-primary-500 border-2 border-primary-500">
                Buscar
                <Icon icon="ant-design:search-outlined"/>
            </span>
            <div className="flex flex-col text-primary-500 border-2 border-background-300 p-2 gap-2">
                <button className="flex flex-row items-center border-b-2 border-background-400 gap-1 hover:bg-background-500" onClick={() => setSearchWeapons(!SearchWeapons)}>
                    <Icon icon="charm:sword"/>
                    Weapons
                </button>
                {
                    SearchWeapons && <Weapons/>
                }
                <button className="flex flex-row items-center border-b-2 border-background-400 gap-1 hover:bg-background-500" onClick={() => setSearchSpells(!SearchSpells)}>
                    <Icon icon="simple-line-icons:magic-wand" />
                    Spells
                </button>
                {
                    SearchSpells && <Spell/>

                }
                <button className="flex flex-row items-center border-b-2 border-background-400 gap-1 hover:bg-background-500" onClick={() => setSearchArmor(!SearchArmor)}>
                    <Icon icon="dashicons:shield" />
                    Armor
                </button>
                {
                    SearchArmor && <Armor />
                    
                }
                <button className="flex flex-row items-center border-b-2 border-background-400 gap-1 hover:bg-background-500" onClick={() => setSearchGear(!SearchGear)}>
                    <Icon icon="game-icons:battle-gear" />
                    Gear
                </button>
                {
                    SearchGear && <Gear />
                }
                <button className="flex flex-row items-center border-b-2 border-background-400 gap-1 hover:bg-background-500" onClick={() => setSearchEquipment(!SearchEquipment)}>
                    <Icon icon="icon-park-outline:backpack" />
                    Equipment Pack
                </button>
                {
                    SearchEquipment && <EquipmentPack />
                }
                <button className="flex flex-row items-center border-b-2 border-background-400 gap-1 hover:bg-background-500" onClick={() => setSearchMagic(!SearchMagic)}>
                    <Icon icon="akar-icons:star" />
                    Magic Items
                </button>
                {
                    SearchMagic && <MagicItems />
                }
            </div>
        </div>
    );
};