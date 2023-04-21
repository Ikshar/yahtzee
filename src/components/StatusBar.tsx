import { useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { RoundStage } from "../types/game";

export function StatusBar() {
  const [state] = useContext(TableContext);
  const roundStage = state.roundStage;

  // todo: switch
  const bulbs = [
    roundStage === RoundStage.SecondRoll ||
      roundStage === RoundStage.ThirdRoll ||
      roundStage === RoundStage.Scoring,
    roundStage === RoundStage.ThirdRoll || roundStage === RoundStage.Scoring,
    roundStage === RoundStage.Scoring,
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
