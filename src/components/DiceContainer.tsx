import { useState, useContext, useEffect } from "react";
import { TableContext, initialState } from "../ctx/TableContext";
import { Die } from "./Die";
import { DiceValues } from "../types/game";
import { ActionType } from "../types/reducer";

const tick = 42;
const animationDuration = 210; // 5 ticks

export function DiceContainer() {
  const [state, dispatch] = useContext(TableContext);
  const [valuesForAnimation, setValuesForAnimation] = useState(
    initialState.values
  );
  const { shouldAnimateDice } = state;

  useEffect(() => {
    if (shouldAnimateDice) {
      const intervalId = setInterval(() => {
        const randomValues = Array.from({ length: 5 }, () =>
          Math.floor(Math.random() * 6)
        );
        setValuesForAnimation(randomValues);
      }, tick);
      setTimeout(() => {
        clearInterval(intervalId);
        dispatch({ type: ActionType.SetShouldAnimateDice, payload: false });
      }, animationDuration);
    }
  }, [shouldAnimateDice]);

  return (
    <div id="dice-container" className="center-wrapper">
      {state.values.map((value, idx) => (
        <Die
          key={idx}
          idx={idx}
          value={
            shouldAnimateDice && !state.selectedDice[idx]
              ? DiceValues[valuesForAnimation[idx]]
              : DiceValues[value - 1]
          }
        />
      ))}
    </div>
  );
}
