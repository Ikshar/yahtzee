import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { ActionType } from "../types/reducer";
import { RoundStage } from "../types/game";

type Props = { value: string; idx: number };

export function Die({ value, idx }: Props) {
  const [state, dispatch] = useContext(TableContext);
  const { roundStage, selectedDice, shouldAnimateDice } = state;

  const isSelected = selectedDice[idx];

  const handleClick = useCallback(() => {
    if (roundStage === RoundStage.SecondRoll || roundStage === RoundStage.ThirdRoll) {
      const newSelected = [...selectedDice];
      newSelected[idx] = !newSelected[idx];
      dispatch({ type: ActionType.SetSelectedDice, payload: newSelected });
    }
  }, [selectedDice, roundStage]);

  // on scoring all dice are displayed as initial
  const stateName =
    roundStage === RoundStage.Scoring || !isSelected ? "initial" : "selected";
  // but only truly deselected are animated
  const shouldAnimate =
    (roundStage !== RoundStage.Scoring && shouldAnimateDice) ||
    (roundStage === RoundStage.Scoring && !isSelected && shouldAnimateDice);

  return (
    <div
      className={`die ${stateName} ${shouldAnimate && "animate"}`}
      style={{
        visibility: `${roundStage === RoundStage.FirstRoll ? "hidden" : "visible"}`,
      }}
      onAnimationEnd={() =>
        dispatch({ type: ActionType.SetShouldAnimateDice, payload: false })
      }
      onClick={handleClick}
    >
      {value}
    </div>
  );
}
