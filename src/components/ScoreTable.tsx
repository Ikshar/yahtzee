import { isNil, isEqual, sum } from "lodash-es";
import { useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { Combination, GameState, RoundStage, Score, EvaluatedScores, PlayerScores } from "../types/game";
import { Action, ActionType } from "../types/reducer";

export function ScoreTable() {
  const [state, dispatch] = useContext(TableContext);
  const { evaluatedScores, currentPlayer, recordedScores, selectedScore } =
    state;

  const total = getTotal(recordedScores[currentPlayer], selectedScore);

  function isRecorded(combo: Combination) {
    if (recordedScores[currentPlayer].hasOwnProperty(combo)) {
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
              className={`score-spot ${
                isRecorded(combo) || isSelected(combo, selectedScore)
              }`}
              onClick={() => handleClick(state, dispatch, combo)}
            >
              {recordedScores[currentPlayer][combo]?.value ??
                evaluatedScores?.[combo]}
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
  dispatch: React.Dispatch<Action>,
  combo: Combination
) {
  const {
    stage,
    evaluatedScores,
    currentPlayer,
    recordedScores,
    selectedScore,
  } = state;

  if (stage === RoundStage.FirstRoll) {
    return;
  }

  const isScoreRecorded = !isNil(recordedScores[currentPlayer][combo]);
  if (isScoreRecorded) {
    return;
  }

  handleScoreRecord(selectedScore, evaluatedScores, combo, dispatch);
}

function handleScoreRecord(
  selectedScore: Score | undefined,
  evaluatedScores: EvaluatedScores,
  combo: Combination,
  dispatch: React.Dispatch<Action>
) {
  const value = evaluatedScores![combo];
  const newScore = { name: combo, value: value };

  const isTheSameScore = isEqual(selectedScore, newScore);
  if (isTheSameScore) {
    dispatch({ type: ActionType.SetSelectedScore });
  } else {
    dispatch({
      type: ActionType.SetSelectedScore,
      payload: newScore,
    });
  }
}

function isSelected(combo: Combination, selectedScore?: Score) {
  if (selectedScore?.name === combo) {
    return "selected";
  }
}

function getTotal(currentPlayerScores: PlayerScores, selectedScore?: Score) {
  const recordedValues = Object.values(currentPlayerScores).map(
    (score) => score.value
  );
  const selectedValue = selectedScore ? selectedScore.value : 0;
  const allValues = recordedValues.concat(selectedValue);
  return sum(allValues);
}
