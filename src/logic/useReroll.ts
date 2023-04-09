import { times, random } from "lodash-es";
import { useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { RoundStage } from "../types";

export function useReroll() {
  const [state, dispatch] = useContext(TableContext);
  const { stage, selectedDice, values } = state;

  if (!selectedDice.includes(true)) {
    return times(5, () => random(1, 6));
  }

  if (stage !== RoundStage.Scoring) {
    // animation.current.restart();
    const newValues = values.map((value, idx) =>
      selectedDice[idx] ? value : random(1, 6)
    );
    dispatch({ type: "setSelectedDice" });
    dispatch({
      type: "setValues",
      payload: newValues,
    });
  }
}
