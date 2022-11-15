import { FunctionComponent } from "react";

const Armor: FunctionComponent = () => {

    const disadvantage = true;

    return (
        <div className="flex flex-row border-2 border-primary-500 p-4">
            <div className="flex flex-col">
                <div className="border-b-2 border-primary-500">
                    <span className="drop-shadow-[0px_0px_2px_#F6E3B9]">Name</span>
                </div>
                <div className="flex flex-col p-2 gap-2">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis illo ipsa facilis mollitia, suscipit enim aut tempora! Rerum cum nostrum, ab natus error accusantium, corporis quis impedit consequuntur, ex doloremque.
                    <div className="flex flex-col p-2 gap-2 md:grid md:grid-cols-2 md:justify-start">
                        <div className="flex flex-row gap-1">
                            <span className="font-medium">Category:</span>
                            armor_category
                        </div>
                        <div className="flex flex-row gap-1">
                            <span className="font-medium">Armor Class:</span>
                            base
                        </div>
                        <div className="flex flex-row gap-1">
                            <span className="font-medium">Cost:</span>
                            quantity unit
                        </div>
                        <div className="flex flex-row gap-1">
                            <span className="font-medium">Weight:</span>
                            weight
                        </div>
                    </div>

                    {disadvantage &&
                    <div className="flex flex-row gap-2 text-xs overflow-auto max-w-sm">
                       <span className="bg-primary-500 text-background-600 rounded-md">Disadvantage</span>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Armor;