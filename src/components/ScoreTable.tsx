import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { Combination, RoundStage } from "../types";
import { isEqual } from "lodash-es";

export function ScoreTable() {
  const [state, dispatch] = useContext(TableContext);
  const { evaluatedScore, currentPlayer, scores, selectedScore, stage } = state;

  const handleClick = useCallback(
    (combo: Combination) => {
      if (stage === RoundStage.FirstRoll) {
        return;
      }
      const newScore = { [combo]: evaluatedScore[combo] };
      const isTheSameScore = isEqual(selectedScore, newScore);

      if (isTheSameScore) {
        dispatch({ type: "setSelectedScore" });
      } else {
        dispatch({
          type: "setSelectedScore",
          payload: { [combo]: evaluatedScore[combo] },
        });
      }
    },
    [evaluatedScore, selectedScore, stage]
  );

  function isSelected(combo: Combination) {
    if (selectedScore?.hasOwnProperty(combo)) {
      return "selected";
    }
  }

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
            <th
              className={`score-spot ${isSelected(combo)}`}
              onClick={() => handleClick(combo)}
            >
              {scores[currentPlayer]?.[combo] || evaluatedScore[combo]}
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
