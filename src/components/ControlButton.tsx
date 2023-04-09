import anime from "animejs/lib/anime.es.js";
import { useCallback, useContext, useEffect, useRef } from "react";
import { TableContext } from "../ctx/TableContext";
import { generateValues } from "../logic/generateValues";
import { ActionType, RoundStage } from "../types";

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
  const { values, selectedDice, selectedRecord, stage, currentPlayer } = state;

  const animation = useRef(anime.timeline());
  useEffect(() => {
    animation.current.add({
      targets: `.initial`,
      rotate: "2turn",
      duration: 1000,
    });
  }, []);

  const handleClick = useCallback(() => {
    if (selectedRecord) {
      // todo: record record
      startNewRound(currentPlayer, dispatch);
    } else if (stage !== RoundStage.Scoring) {
      reroll(values, selectedDice, dispatch);
      animation.current.restart();
      startNextStage(stage, dispatch);
    }
  }, [stage, selectedDice, currentPlayer, values, selectedRecord]);

  return (
    <div className="center-wrapper">
      <div className="control-button" onClick={handleClick}>
        {selectedRecord ? "CONFIRM" : stageInfo[stage].buttonLabel}
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
    payload: currentPlayer === "Player1" ? "Player2" : "Player1",
  });
  dispatch({ type: "setStage", payload: RoundStage.FirstRoll });
  dispatch({ type: "setSelectedRecord" });
}

function reroll(
  values: number[],
  selectedDice: boolean[],
  dispatch: React.Dispatch<ActionType>
) {
  const newValues = generateValues(values, selectedDice);
  dispatch({ type: "setSelectedDice" });
  dispatch({
    type: "setValues",
    payload: newValues,
  });
}
