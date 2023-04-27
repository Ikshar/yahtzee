import { useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { Die } from "./Die";
import { DiceValues } from "../types/game";

export function DiceContainer() {
  const [state] = useContext(TableContext);
  return (
    <div id="dice-container" className="center-wrapper">
      {state.values.map((value, idx) => (
        <Die key={idx} idx={idx} value={DiceValues[value - 1]} />
      ))}
    </div>
  );
}
