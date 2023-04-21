import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { ActionType } from "../types/reducer";
import { RoundStage } from "../types/game";
import { stageInfo } from "../types/stageInfo";

export function ControlButton() {
  const [state, dispatch] = useContext(TableContext);
  const {
    values,
    selectedDice,
    selectedScore,
    roundStage,
    currentPlayer,
    currentRound,
  } = state;

  const handleClick = useCallback(() => {
    if (selectedScore && currentRound === 26) {
      dispatch({ type: ActionType.InitiateOutcome });
      return;
    }

    if (selectedScore) {
      dispatch({ type: ActionType.StartNewRound });
      return;
    }

    const areAllSelected = selectedDice.every((isSelected) => isSelected);
    if (roundStage !== RoundStage.Scoring && !areAllSelected) {
      dispatch({ type: ActionType.StartNextStage });
      return;
    }
  }, [roundStage, selectedDice, currentPlayer, values, selectedScore]);

  const isInactive = stage === RoundStage.Scoring && !selectedScore;

  return (
    <div className="center-wrapper">
      <div
        className={`control-button ${isInactive ? "inactive" : ""}`}
        onClick={handleClick}
      >
        {selectedScore ? "CONFIRM" : stageInfo[roundStage].buttonLabel}
      </div>
    </div>
  );
}
