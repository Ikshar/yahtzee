import { useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import {
  ActionType,
  Combination,
  GameState,
  Player,
  RoundStage,
  Score,
  Scores,
} from "../types";
import { isEqual, isNil, sum } from "lodash-es";

export function ScoreTable() {
  const [state, dispatch] = useContext(TableContext);
  const { evaluatedScores, currentPlayer, recordedScores, selectedScore } = state;

  const total = getTotal(selectedScore, recordedScores, currentPlayer);

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
              className={`score-spot ${isRecorded(combo) || isSelected(selectedScore, combo)}`}
              onClick={() => handleClick(state, dispatch, combo)}
            >
              {recordedScores[currentPlayer]?.[combo] ?? evaluatedScores[combo]}
            </th>
          </tr>
        ))}
        <tr>
          <th>Total</th>
          <th>{total}</th>
        </tr>
      </tbody>
    </table>
  );
}

function handleClick(
  state: GameState,
  dispatch: React.Dispatch<ActionType>,
  combo: Combination
) {
  const { stage, evaluatedScores, currentPlayer, recordedScores, selectedScore } = state;

  if (stage === RoundStage.FirstRoll) {
    return;
  }

  const isScoreRecorded = !isNil(recordedScores[currentPlayer]?.[combo]);
  if (isScoreRecorded) {
    return;
  }

  handleScoreRecord(selectedScore, evaluatedScores, combo, dispatch);
}

function handleScoreRecord(
  selectedScore: Score | undefined,
  evaluatedScore: Score,
  combo: Combination,
  dispatch: React.Dispatch<ActionType>
) {
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
}

function isSelected(selectedScore: Score | undefined, combo: Combination) {
  if (selectedScore?.hasOwnProperty(combo)) {
    return "selected";
  }
}

function getTotal(
  selectedScore: Score | undefined,
  scores: Scores,
  currentPlayer: Player
) {
  const recordedValues = Object.values(scores[currentPlayer]);
  const selectedValue = selectedScore ? Object.values(selectedScore)[0] : 0;
  const allValues = recordedValues.concat(selectedValue);
  return sum(allValues);
}
