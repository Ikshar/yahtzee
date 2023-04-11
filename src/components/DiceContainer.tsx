import { useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { DiceValues } from "../types";
import { Die } from "./Die";

export function DiceContainer() {
  const [state] = useContext(TableContext);
  return (
    <div className="center-wrapper dice-container-wrapper">
      <div className="dice-container">
        {state.values.map((value, idx) => (
          <Die key={idx} idx={idx} value={DiceValues[value - 1]} />
        ))}
      </div>
    </div>
  );
}