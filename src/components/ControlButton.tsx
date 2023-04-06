import anime from "animejs/lib/anime.es.js";
import { times } from "lodash-es";
import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { rerollUnheld } from "../logic/reroll";
import { RoundStage } from "../types";

type StageInfo = {
  [key in RoundStage]: {
    buttonLabel: string;
    nextStage: RoundStage;
  };
};

const stageInfo: StageInfo = {
  [RoundStage.Initial]: { buttonLabel: "ROLL", nextStage: RoundStage.Decision },
  [RoundStage.Decision]: {
    buttonLabel: "REROLL",
    nextStage: RoundStage.Outcome,
  },
  [RoundStage.Outcome]: { buttonLabel: "NEXT", nextStage: RoundStage.Initial },
};

export function ControlButton() {
  const [ state, dispatch ] = useContext(TableContext);
  const { values, selected, currentPlayer, stage } = state;

  // ? animation works only once for some reason
  const animateDice = useCallback(() => {
    anime({
      targets: ".die.initial",
      rotate: "2turn",
      duration: 1000,
    });
  }, []);

  const handleClick = useCallback(() => {
    animateDice();
    dispatch({ type: "setSelected" });
    dispatch({ type: "setStage", payload: stageInfo[stage].nextStage });
    dispatch({
      type: "setValues",
      payload: rerollUnheld(values, selected),
    });
    if (stage === RoundStage.Outcome) {
      dispatch({
        type: "setCurrentPlayer",
        payload: currentPlayer === "Player1" ? "Player2" : "Player1",
      });
    }
  }, [stage, selected]);

  return (
    <div className="center-wrapper">
      <div className="control-button" onClick={handleClick}>
        {stageInfo[stage].buttonLabel}
      </div>
    </div>
  );
}
