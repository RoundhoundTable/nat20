import { FunctionComponent } from "react";

const Spell: FunctionComponent = () => {
    const level = 1;

    return (
        <div className="flex flex-row border-2 border-primary-500 p-4">
        <div className="flex flex-col">
            <div className="border-b-2 border-primary-500 flex flex-row justify-between">
                <span className="drop-shadow-[0px_0px_2px_#F6E3B9]">Name</span>
                <div className="flex flex-row font-xs text-primary-400">
                    {level > 0 ? <span>{level}</span> : <span>Truco</span>},
                    School
                </div>
            </div>
            <div className="flex flex-col p-2 gap-2">
                <div className="md:grid grid-cols-2 justify-start">
                    <div className="flex flex-row gap-1">
                        <span className="font-medium">Components:</span>
                        V, S
                    </div>
                    <div className="flex flex-row gap-1">
                        <span className="font-medium">Time:</span>
                        casting_time
                    </div>
                    <div className="flex flex-row gap-1">
                        <span className="font-medium">Range:</span>
                        range
                    </div>
                    <div className="flex flex-row gap-1">
                        <span className="font-medium">Duration:</span>
                        duration
                    </div>
                    <div className="flex flex-row gap-1">
                        <span className="font-medium">Difficulty Class:</span>
                        dc
                    </div>
                    <div className="flex flex-row gap-1">
                        <span className="font-medium">Damage:</span>
                        1d8 radiante
                    </div>
                </div>
                <div className="py-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui nihil provident ullam velit quia quisquam illo sunt alias reprehenderit, et dignissimos accusamus voluptas facilis adipisci quae delectus maiores, ipsam veritatis?
                </div>
                <div className="flex flex-row">
                    damage_at_character_level[], damage_at_character_level[], damage_at_character_level[]
                </div>
            </div>
        </div>
    </div>
    )
}

export default Spell;