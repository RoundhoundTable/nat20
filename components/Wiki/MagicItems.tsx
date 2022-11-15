import { FunctionComponent } from "react"

const MagicItems: FunctionComponent = () => {
    return (
        <div className="flex flex-row border-2 border-primary-500 p-4">
            <div className="flex flex-col gap-2">
            <div className="border-b-2 border-primary-500 flex flex-row justify-between">
                    <span className="drop-shadow-[0px_0px_2px_#F6E3B9]">Name</span>
                    <div className="flex flex-row font-xs text-primary-400">
                        <span>rarity,</span>
                        <span>Category</span>
                    </div>
                </div>
                <div className="flex flex-col p-2 gap-2">
                    <div className="border-2 border-primary-500 rounded-md p-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum totam necessitatibus culpa eveniet. Reprehenderit, autem earum obcaecati deleniti provident quos consectetur ratione accusamus quae porro tenetur repudiandae non temporibus iusto?
                    </div>
                    <div className="flex flex-col p-2 gap-2">
                        <span className="drop-shadow-[0px_1px_2px_#F6E3B9] border-b-2">Variants:</span>
                        <div className="md:grid grid-cols-2 justify-start">
                            <span>Variant1</span>
                            <span>Variant2</span>
                            <span>Variant3</span>
                            <span>Variant4</span>
                            <span>Variant5</span>
                            <span>Variant6</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MagicItems;