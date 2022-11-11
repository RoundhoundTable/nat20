import { FunctionComponent } from "react";

const Weapons: FunctionComponent = () => {
    return (
        <div className="flex flex-row border-2 border-primary-500 p-4">
            <div className="flex flex-col">
                <div className="border-b-2 border-primary-500">
                    <span className="drop-shadow-[0px_0px_1px_#F6E3B9]">Name</span>
                </div>
                <div className="flex flex-col p-2 gap-2">
                    <div className="flex flex-row">
                        <span className="font-medium">Category:</span>
                        "weapon_category"
                    </div>
                    <div className="flex flex-row">
                        <span className="font-medium">Damage:</span>
                        "damage_dice" "damage_type/name"
                    </div>
                    <div className="flex flex-row">
                        <span className="font-medium">Throw range:</span>
                        "normal"/"long"
                    </div>
                    <div className="flex flex-row">
                        <span className="font-medium">Cost:</span>
                        "quantity" "unit"
                    </div>
                    <div className="flex flex-row">
                        <span className="font-medium">Weight:</span>
                        "weight"
                    </div>
                    <div className="flex flex-row gap-2 text-xs overflow-auto max-w-sm">
                        <span className="bg-primary-500 text-background-600 rounded-md">"properties/name"</span>
                        <span className="bg-primary-500 text-background-600 rounded-md">"properties/name"</span>
                        <span className="bg-primary-500 text-background-600 rounded-md">"properties/name"</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weapons;