import { FunctionComponent } from "react";

const EquipmentPack: FunctionComponent = () => {
    return (
        <div className="flex flex-row border-2 border-primary-500 p-4">
            <div className="flex flex-col gap-2">
                <div className="border-b-2 border-primary-500">
                    <span className="drop-shadow-[0px_0px_1px_#F6E3B9]">Name</span>
                </div>
                <div className="flex flex-col p-2 gap-2">
                    <div className="border-2 border-primary-500 rounded-md p-1">
                        Aca en realidad van los items que trae el paquete, pero tristemente para mi la api los toma como elementos separados y no como un texto que simplemente puedo pegar aca
                    </div>
                    <div className="flex flex-col p-2 gap-2">
                        <div className="flex flex-row gap-1">
                            <span className="font-medium">Gear Category:</span>
                            name
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

export default EquipmentPack;