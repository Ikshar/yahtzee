import { useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { RoundStage } from "../types";

export function StatusBar() {
  const { currentPlayer, stage } = useContext(TableContext);
  return (
    <div className="center-wrapper">
      <div className="status-bar-wrapper">
        <div className="status-bar">
          <div className="center-wrapper">
            <span>{`${currentPlayer}'s turn!`}</span>
            <span>
              {stage === RoundStage.Initial
                ? "Roll the dice!"
                : stage === RoundStage.Decision
                ? "Choose what to hold"
                : "Here's your result:"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
