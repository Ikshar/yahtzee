import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { Combination, RoundStage } from "../types";

export function ScoreTable() {
  const [state, dispatch] = useContext(TableContext);
  const { evaluatedScore, currentPlayer, scores } = state;

  const handleClick = useCallback(
    (combo: Combination) => {
      if (state.stage !== RoundStage.FirstRoll) {
        dispatch({
          type: "setSelectedScore",
          payload: { [combo]: evaluatedScore[combo] },
        });
      }
    },
    [evaluatedScore, currentPlayer, scores]
  );

  return (
    <table id="score-table">
      <thead>
        <tr>
          <th>Combo</th>
          <th>{currentPlayer}</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(Combination).map((combo) => (
          <tr key={combo}>
            <th>{combo}</th>
            <th className="score-spot" onClick={() => handleClick(combo)}>
              {scores[state.currentPlayer]?.[combo] || evaluatedScore[combo]}
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
