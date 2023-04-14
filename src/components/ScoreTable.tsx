import { useCallback, useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { Combination, RoundStage } from "../types";
import { isEqual, isNil } from "lodash-es";

export function ScoreTable() {
  const [state, dispatch] = useContext(TableContext);
  const {
    evaluatedScores,
    currentPlayer,
    recordedScores,
    selectedScore,
    stage,
  } = state;

  const handleClick = useCallback(
    (combo: Combination) => {
      if (stage === RoundStage.FirstRoll) {
        return;
      }

      const isScoreRecorded = !isNil(recordedScores[currentPlayer]?.[combo]);
      if (isScoreRecorded) {
        return;
      }

      const newScore = { [combo]: evaluatedScores[combo] };
      const isTheSameScore = isEqual(selectedScore, newScore);

      if (isTheSameScore) {
        dispatch({ type: "setSelectedScore" });
      } else {
        dispatch({
          type: "setSelectedScore",
          payload: { [combo]: evaluatedScores[combo] },
        });
      }
    },
    [evaluatedScores, selectedScore, stage]
  );

  function isSelected(combo: Combination) {
    if (selectedScore?.hasOwnProperty(combo)) {
      return "selected";
    }
  }

  function isRecorded(combo: Combination) {
    if(recordedScores[currentPlayer].hasOwnProperty(combo)){
      return "recorded";
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
              className={`score-spot ${isRecorded(combo) || isSelected(combo)}`}
              onClick={() => handleClick(combo)}
            >
              {recordedScores[currentPlayer]?.[combo] ?? evaluatedScores[combo]}
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
