import { useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { RoundStage } from "../types/game";

export function StatusBar() {
  const [state] = useContext(TableContext);
  const stage = state.stage;

  const bulbs = [
    stage === RoundStage.SecondRoll ||
      stage === RoundStage.ThirdRoll ||
      stage === RoundStage.Scoring,
    stage === RoundStage.ThirdRoll || stage === RoundStage.Scoring,
    stage === RoundStage.Scoring,
  ];

  return (
    <div className="center-wrapper">
      <div className="status-bar">
        {bulbs.map((isActive) => {
          return <span className={isActive ? "active" : ""}>o </span>;
        })}
      </div>
    </div>
  );
}
