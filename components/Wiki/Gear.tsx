import { FunctionComponent } from "react";

const Gear:FunctionComponent = () => {
    return (
        <div className="flex flex-row border-2 border-primary-500 p-4">
            <div className="flex flex-col">
                <div className="border-b-2 border-primary-500">
                    <span className="drop-shadow-[0px_0px_2px_#F6E3B9]">Name</span>
                </div>
                <div className="flex flex-col p-2 gap-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eius deserunt reiciendis dolor illo illum quidem eum repellat consequatur magnam modi, quas sunt nihil, aperiam eligendi blanditiis, error quo minus.
                    <div className="flex flex-col p-2 gap-2">
                        <div className="flex flex-row gap-1">
                            <span className="font-medium">Gear Category:</span>
                            gear_category
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
                </div>
            </div>
        </div>
    )
}

export default Gear;