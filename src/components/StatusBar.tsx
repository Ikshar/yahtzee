import { useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { RoundStage } from "../types/game";

export function StatusBar() {
  const [state] = useContext(TableContext);
  const roundStage = state.roundStage;

  const bulbStates = (() => {
    switch (roundStage) {
      case RoundStage.Scoring:
        return [true, true, true];
      case RoundStage.ThirdRoll:
        return [true, true, false];
      case RoundStage.SecondRoll:
        return [true, false, false];
      case RoundStage.FirstRoll:
        return [false, false, false];
    }
  })();

  return (
    <div className="center-wrapper">
      <div className="status-bar">
        {bulbStates.map((isActive) => {
          return <span className={isActive ? "active" : ""}>o </span>;
        })}
      </div>
    </div>
  );
}
