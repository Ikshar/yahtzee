import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { generateValues } from "../logic/generateValues";
import { Action, ActionType } from "../types/reducer";
import { evaluateCombo } from "../logic/evaluateCombo";
import { RoundStage, Player, Score } from "../types/game";

type StageInfo = {
  [key in RoundStage]: {
    buttonLabel?: string;
    nextStage: RoundStage;
  };
};

const stageInfo: StageInfo = {
  [RoundStage.FirstRoll]: {
    buttonLabel: "ROLL",
    nextStage: RoundStage.SecondRoll,
  },
  [RoundStage.SecondRoll]: {
    buttonLabel: "REROLL",
    nextStage: RoundStage.ThirdRoll,
  },
  [RoundStage.ThirdRoll]: {
    buttonLabel: "REREROLL",
    nextStage: RoundStage.Scoring,
  },
  [RoundStage.Scoring]: {
    buttonLabel: "CONFIRM",
    nextStage: RoundStage.FirstRoll,
  },
};

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
      setSavedPlayerScore(selectedScore, dispatch);
      startNewRound(currentPlayer, dispatch);
    } else if (stage !== RoundStage.Scoring) {
      const newValues = generateValues(values, selectedDice);
      updateValues(newValues, dispatch);
      setEvaluatedScore(newValues, dispatch);
      dispatch({ type: ActionType.SetShouldAnimateDice, payload: true });
      startNextStage(stage, dispatch);
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

function startNextStage(stage: RoundStage, dispatch: React.Dispatch<Action>) {
  dispatch({ type: ActionType.SetStage, payload: stageInfo[stage].nextStage });
}

function startNewRound(
  currentPlayer: string,
  dispatch: React.Dispatch<Action>
) {
  dispatch({
    type: ActionType.SetCurrentPlayer,
    payload: currentPlayer === Player.Player1 ? Player.Player2 : Player.Player1,
  });
  dispatch({ type: ActionType.SetStage, payload: RoundStage.FirstRoll });
  dispatch({ type: ActionType.SetSelectedScore });
  dispatch({ type: ActionType.SetSelectedDice });
  dispatch({ type: ActionType.SetEvaluatedScore });
}

function updateValues(values: number[], dispatch: React.Dispatch<Action>) {
  dispatch({
    type: ActionType.SetValues,
    payload: values,
  });
}

function setSavedPlayerScore(
  selectedScore: Score,
  dispatch: React.Dispatch<Action>
) {
  dispatch({
    type: ActionType.SetSavedPlayerScore,
    payload: { score: selectedScore },
  });
}

function setEvaluatedScore(values: number[], dispatch: React.Dispatch<Action>) {
  const evaluated = evaluateCombo(values);
  dispatch({
    type: ActionType.SetEvaluatedScore,
    payload: { score: evaluated },
  });
}
