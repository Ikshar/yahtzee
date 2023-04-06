import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { RoundStage } from "../types";

type Props = { value: string; idx: number };

export function Die({ value, idx }: Props) {
  const { selected, setSelected, stage } = useContext(TableContext);

  const handleOnClick = useCallback(() => {
    if (stage === RoundStage.Decision) {
      const newSelected = [...selected];
      newSelected[idx] = !newSelected[idx];
      setSelected(newSelected);
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
