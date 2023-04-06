import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { evaluateCombo } from "../logic/evaluateCombo";
import { Combination } from "../types";

export function ScoreTable() {
  let arr = [];

  const { scores, currentPlayer } = useContext(TableContext);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {
      e.currentTarget.textContent = "1";
    },
    []
  );

  for (const combo of Object.values(Combination)) {
    arr.push(
      <tr key={Date.now() + combo}>
        <th>{combo}</th>
        <th className="score-spot" onClick={handleClick}></th>
        <th className="score-spot" onClick={handleClick}></th>
      </tr>
    );
  }
  return (
    <table id="score-table">
      <thead>
        <tr>
          <th>Combo</th>
          <th>Player 1</th>
          <th>Player 2</th>
        </tr>
      </thead>
      <tbody>{arr}</tbody>
    </table>
  );
}
