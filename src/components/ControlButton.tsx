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
    stage,
    currentPlayer,
    shouldAnimateDice: animate,
  } = state;

  const handleClick = useCallback(() => {
    if (selectedScore) {
      dispatch({ type: ActionType.StartNewRound });
    } else if (stage !== RoundStage.Scoring) {
      dispatch({ type: ActionType.StartNextStage });
    }
  }, [stage, selectedDice, currentPlayer, values, selectedScore]);

  return (
    <div className="center-wrapper">
      <div className="control-button" onClick={handleClick}>
        {selectedScore ? "CONFIRM" : stageInfo[stage].buttonLabel}
      </div>
    </div>
  );
}
