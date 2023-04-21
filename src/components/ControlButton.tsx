import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { ActionType } from "../types/reducer";
import { RoundStage } from "../types/game";
import { stageInfo } from "../types/stageInfo";

export function ControlButton() {
  const [state, dispatch] = useContext(TableContext);
  const { values, selectedDice, selectedScore, stage, currentPlayer } = state;

  const handleClick = useCallback(() => {
    const areAllSelected = selectedDice.every((isSelected) => isSelected);

    if (selectedScore) {
      dispatch({ type: ActionType.StartNewRound });
    } else if (stage !== RoundStage.Scoring) {
      if (!areAllSelected) {
        dispatch({ type: ActionType.StartNextStage });
      }
    }
  }, [stage, selectedDice, currentPlayer, values, selectedScore]);

  const isInactive = stage === RoundStage.Scoring && !selectedScore;

  return (
    <div className="center-wrapper">
      <div
        className={`control-button ${isInactive ? "inactive" : ""}`}
        onClick={handleClick}
      >
        {selectedScore ? "CONFIRM" : stageInfo[stage].buttonLabel}
      </div>
    </div>
  );
}
