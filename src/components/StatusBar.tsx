import { useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { RoundStage } from "../types";

export function StatusBar() {
  const { currentPlayer, stage } = useContext(TableContext);
  return (
    <div className="status-bar">
      <div className="center-wrapper grid-container">
        <div className="status-bar grid-item">
          <h3>{`${currentPlayer}'s turn!`}</h3>
          <h4>
            {stage === RoundStage.Initial
              ? "Roll the dice!"
              : stage === RoundStage.Decision
              ? "Choose what to hold"
              : "Here's your result:"}
          </h4>
        </div>
      </div>
    </div>
  );
}
