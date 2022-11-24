import { FunctionComponent } from "react";

interface IHealthBarData {
  hitPoints: number;
  currentHitPoints: number;
}

export const HealthBar: FunctionComponent<IHealthBarData> = (props) => {
  return (
    <div className="relative w-full h-5 bg-background-500 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div
        className={`h-full bg-danger-800 rounded-lg`}
        style={{
          width: `clamp(0%, ${
            (100 / props.hitPoints) * props.currentHitPoints
          }%, 100%)`,
        }}
      >
        {props.currentHitPoints > props.hitPoints ? (
          <div
            className={`h-full bg-warning-500 rounded-lg`}
            style={{
              width: `clamp(0%, ${
                (100 / props.hitPoints) * props.currentHitPoints - 100
              }%, 100%)`,
            }}
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {props.currentHitPoints}/{props.hitPoints}
            </span>
          </div>
        ) : (
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {props.currentHitPoints}/{props.hitPoints}
          </span>
        )}
      </div>
    </div>
  );
};
