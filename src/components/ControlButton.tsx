import anime from "animejs/lib/anime.es.js";
import { useCallback, useContext, useEffect, useRef } from "react";
import { TableContext } from "../ctx/TableContext";
import { generateValues } from "../logic/generateValues";
import { ActionType, Player, RoundStage, Score } from "../types";
import { evaluateCombo } from "../logic/evaluateCombo";

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
    selectedScore: selectedScore,
    stage,
    currentPlayer,
    shouldAnimateDice: animate,
  } = state;

  const handleClick = useCallback(() => {
    if (selectedScore) {
      setSavedPlayerScore(currentPlayer, selectedScore, dispatch);
      startNewRound(currentPlayer, dispatch);
    } else if (stage !== RoundStage.Scoring) {
      const newValues = generateValues(values, selectedDice);
      updateValues(newValues, dispatch);
      setEvaluatedScore(newValues, dispatch);
      dispatch({ type: "setShouldAnimateDice", payload: true });
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

function startNextStage(
  stage: RoundStage,
  dispatch: React.Dispatch<ActionType>
) {
  dispatch({ type: "setStage", payload: stageInfo[stage].nextStage });
}

function startNewRound(
  currentPlayer: string,
  dispatch: React.Dispatch<ActionType>
) {
  dispatch({
    type: "setCurrentPlayer",
    payload: currentPlayer === Player.Player1 ? Player.Player2 : Player.Player1,
  });
  dispatch({ type: "setStage", payload: RoundStage.FirstRoll });
  dispatch({ type: "setSelectedScore" });
  dispatch({ type: "setSelectedDice" });
  dispatch({ type: "setEvaluatedScore" });
}

function updateValues(values: number[], dispatch: React.Dispatch<ActionType>) {
  dispatch({
    type: "setValues",
    payload: values,
  });
}

function setSavedPlayerScore(
  currentPlayer: Player,
  selectedScore: Score,
  dispatch: React.Dispatch<ActionType>
) {
  dispatch({
    type: "setSavedPlayerScore",
    payload: { player: currentPlayer, score: selectedScore },
  });
}

function setEvaluatedScore(
  values: number[],
  dispatch: React.Dispatch<ActionType>
) {
  const evaluated = evaluateCombo(values);
  dispatch({
    type: "setEvaluatedScore",
    payload: { score: evaluated },
  });
}
