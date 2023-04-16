import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { RoundStage } from "../types";

type Props = { value: string; idx: number };

export function Die({ value, idx }: Props) {
  const [state, dispatch] = useContext(TableContext);
  const { stage, selectedDice, shouldAnimateDice } = state;

  const isSelected = selectedDice[idx];

  const handleClick = useCallback(() => {
    if (stage === RoundStage.SecondRoll || stage === RoundStage.ThirdRoll) {
      const newSelected = [...selectedDice];
      newSelected[idx] = !newSelected[idx];
      dispatch({ type: "setSelectedDice", payload: newSelected });
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
      onAnimationEnd={() => dispatch({ type: "setShouldAnimateDice", payload: false })}
      onClick={handleClick}
    >
      {value}
    </div>
  );
}
