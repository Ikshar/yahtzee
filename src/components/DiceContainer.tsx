import { useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { DiceValues, RoundStage } from "../types";
import { Die } from "./Die";

export function DiceContainer() {
  const { stage, values } = useContext(TableContext);
  return (
    <div className="center-wrapper dice-container-wrapper">
      <div className="dice-container">
        {values.map((value, idx) => (
          <Die key={idx} idx={idx} value={DiceValues[value - 1]} />
        ))}
      </div>
    </div>
  );
}
