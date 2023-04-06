import anime from "animejs/lib/anime.es.js";
import { times } from "lodash-es";
import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { rerollUnheld } from "../logic/reroll";
import { RoundStage } from "../types";

export function ControlButton() {
  const {
    currentPlayer,
    selected,
    setCurrentPlayer,
    setSelected,
    setStage,
    setValues,
    stage,
    values,
  } = useContext(TableContext);

  const anim = anime.timeline({
    autoplay: false,
  });

  // ? animation works only once for some reason
  const animateDice = useCallback(() => {
    return anime({
      targets: ".die.initial",
      rotate: "2turn",
      duration: 1000,
      complete: () => {
        console.log("completed");
      },
    }).finished;
  }, []);

  const reroll = useCallback(() => {
    animateDice();
    setValues(rerollUnheld(values, selected));
    setSelected(times(5, () => false));
  }, [values, selected]);

  const handleInitialRollClick = useCallback(() => {
    reroll();
    setStage(RoundStage.Decision);
  }, [values, selected]);

  const handleRerollClick = useCallback(() => {
    reroll();
    setStage(RoundStage.Outcome);
  }, [values, selected]);

  const handleNextPlayerButtonClick = useCallback(() => {
    reroll();
    setStage(RoundStage.Initial);
    setCurrentPlayer(currentPlayer === "Player1" ? "Player2" : "Player1");
  }, [currentPlayer]);

  // todo: make one customizable button?
  const renderButton = () => {
    switch (stage) {
      case RoundStage.Initial:
        return (
          <div className="roll-button-hole" onClick={handleInitialRollClick}>
            ROLL
          </div>
        );
      case RoundStage.Decision:
        return (
          <div className="roll-button-hole" onClick={handleRerollClick}>
            REROLL
          </div>
        );
      case RoundStage.Outcome:
        return (
          <div
            className="roll-button-hole"
            onClick={handleNextPlayerButtonClick}
          >
            NEXT
          </div>
        );
    }
  };

  return <div className="roll-button-base">{renderButton()}</div>;
}
