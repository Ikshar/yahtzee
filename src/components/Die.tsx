import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { RoundStage } from "../types";

type Props = { value: string; idx: number };

export function Die({ value, idx }: Props) {
  const [ state, dispatch ] = useContext(TableContext);
  const { stage, selected } = state;

  const handleOnClick = useCallback(() => {
    if (stage === RoundStage.Decision) {
      const newSelected = [...selected];
      newSelected[idx] = !newSelected[idx];
      dispatch({type: "setSelected", payload: newSelected})
    }
  }, [selected]);

  return (
    <div
      className={`die ${selected[idx] ? "selected" : "initial"}`}
      style={{
        visibility: `${stage === RoundStage.Initial ? "hidden" : "visible"}`,
      }}
      onClick={handleOnClick}
    >
      {value}
    </div>
  );
}
