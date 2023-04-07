import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { RoundStage } from "../types";

type Props = { value: string; idx: number };

export function Die({ value, idx }: Props) {
  const [state, dispatch] = useContext(TableContext);
  const { stage, selectedDice } = state;

  const handleOnClick = useCallback(() => {
    if (stage === RoundStage.SecondRoll || stage === RoundStage.ThirdRoll) {
      const newSelected = [...selectedDice];
      newSelected[idx] = !newSelected[idx];
      dispatch({ type: "setSelectedDice", payload: newSelected });
    }
  }, [selectedDice]);

  return (
    <div
      className={`die ${
        selectedDice && selectedDice[idx] ? "selected" : "initial"
      }`}
      style={{
        visibility: `${stage === RoundStage.FirstRoll ? "hidden" : "visible"}`,
      }}
      onClick={handleOnClick}
    >
      {value}
    </div>
  );
}
