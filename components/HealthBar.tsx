import { FunctionComponent } from "react";

interface IHealthBarData {
    hitPoints: number
    currentHitPoints: number
}

export const HealthBar: FunctionComponent<IHealthBarData> = (props) => {
    return (
        <div className="relative w-full h-7 bg-background-500 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <div className={`h-full bg-danger-800 rounded-lg`} style={
                {
                    width: `${ ( 100 / props.hitPoints ) * props.currentHitPoints }%`
                }
            }>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{props.currentHitPoints}/{props.hitPoints}</span>
            </div>
        </div>
    )
}