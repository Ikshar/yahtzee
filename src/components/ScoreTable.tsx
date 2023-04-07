import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { Combination, RoundStage } from "../types";

export function ScoreTable() {
  const [state, dispatch] = useContext(TableContext);
  const { stage } = state;

  const handleClick = useCallback(
      (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>, combo: Combination) => {
      if (stage !== RoundStage.FirstRoll) {
        // todo: set the text within React
        e.currentTarget.textContent = combo;
        dispatch({ type: "setSelectedRecord", payload: combo });
      }
    },
    [stage]
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
            <th className="score-spot" onClick={(e) => handleClick(e, combo)}></th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
