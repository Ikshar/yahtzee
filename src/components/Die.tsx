import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { ActionType } from "../types/reducer";
import { RoundStage } from "../types/game";

type Props = { value: string; idx: number };

export function Die({ value, idx }: Props) {
  const [state, dispatch] = useContext(TableContext);
  const { stage, selectedDice, shouldAnimateDice } = state;

  const isSelected = selectedDice[idx];

  const handleClick = useCallback(() => {
    if (stage === RoundStage.SecondRoll || stage === RoundStage.ThirdRoll) {
      const newSelected = [...selectedDice];
      newSelected[idx] = !newSelected[idx];
      dispatch({ type: ActionType.SetSelectedDice, payload: newSelected });
    }
  }, [selectedDice, stage]);

  return (
    <div
      className={`
      die
      ${isSelected ? "selected" : "initial"}
      ${shouldAnimateDice ? "animate" : ""}
    `}
      style={{
        visibility: `${stage === RoundStage.FirstRoll ? "hidden" : "visible"}`,
      }}
      onAnimationEnd={() => dispatch({ type: ActionType.SetShouldAnimateDice, payload: false })}
      onClick={handleClick}
    >
      {value}
    </div>
  );
}
