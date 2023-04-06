import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { evaluateCombo } from "../logic/evaluateCombo";
import { Combination } from "../types";

export function ScoreTable() {
  const [ state ] = useContext(TableContext);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {
      e.currentTarget.textContent = "1";
    },
    []
  );

  return (
    <table id="score-table">
      <thead>
        <tr>
          <th>Combo</th>
          <th>{state.currentPlayer}</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(Combination).map((combo) => (
          <tr key={combo}>
            <th>{combo}</th>
            <th className="score-spot" onClick={handleClick}></th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
