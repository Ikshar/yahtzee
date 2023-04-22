import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { ActionType } from "../types/reducer";
import { GameStage, RoundStage } from "../types/game";
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
    gameStage,
  } = state;

  const handleClick = useCallback(() => {
    if (gameStage === GameStage.GameOutcome) {
      dispatch({ type: ActionType.StartNewGame });
      return;
    }

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
  }, [
    roundStage,
    selectedDice,
    currentPlayer,
    values,
    selectedScore,
    gameStage,
  ]);

  const buttonLabel =
    gameStage === GameStage.GameOutcome
      ? "NEW GAME"
      : selectedScore
      ? "CONFIRM"
      : stageInfo[roundStage].buttonLabel;

  const isInactive = roundStage === RoundStage.Scoring && !selectedScore;

  return (
    <div className="center-wrapper">
      <div
        className={`control-button ${isInactive ? "inactive" : ""}`}
        onClick={handleClick}
      >
        {buttonLabel}
      </div>
    </div>
  );
}
