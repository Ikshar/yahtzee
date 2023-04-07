import anime from "animejs/lib/anime.es.js";
import { times } from "lodash-es";
import { useCallback, useContext, useEffect, useRef } from "react";
import { TableContext } from "../ctx/TableContext";
import { rerollUnheld } from "../logic/reroll";
import { RoundStage } from "../types";

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

  const reroll = useCallback(() => {
    if (stage !== RoundStage.Scoring) {
      animation.current.restart();
      dispatch({ type: "setSelectedDice" });
      dispatch({
        type: "setValues",
        payload: rerollUnheld(values, selectedDice),
      });
    }
  }, [stage, selectedDice]);

  const handleClick = useCallback(() => {
    // todo: do not confirm on first roll
    if (stage === RoundStage.Scoring || selectedRecord) {
      // todo: record record
      dispatch({
        type: "setCurrentPlayer",
        payload: currentPlayer === "Player1" ? "Player2" : "Player1",
      });
      dispatch({ type: "setStage", payload: RoundStage.FirstRoll });
      dispatch({ type: "setSelectedRecord" });
    } else {
      reroll();
      dispatch({ type: "setStage", payload: stageInfo[stage].nextStage });
    }
  }, [reroll, stage, selectedRecord, currentPlayer]);

  return (
    <div className="center-wrapper">
      <div className="control-button" onClick={handleClick}>
        {selectedRecord ? "CONFIRM" : stageInfo[stage].buttonLabel}
      </div>
    </div>
  );
}
