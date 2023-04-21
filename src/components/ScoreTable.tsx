import { isNil, isEqual, sum } from "lodash-es";
import { useContext, useEffect, useState } from "react";
import { TableContext } from "../ctx/TableContext";
import {
  Combination,
  GameState,
  RoundStage,
  Score,
  EvaluatedScores,
} from "../types/game";
import { Action, ActionType } from "../types/reducer";

export function ScoreTable() {
  const [state, dispatch] = useContext(TableContext);
  const {
    evaluatedScores,
    currentPlayer,
    recordedScores,
    selectedScore,
    selectedTotal,
  } = state;

  function isRecorded(combo: Combination) {
    if (recordedScores[currentPlayer].hasOwnProperty(combo)) {
      return "recorded";
    }
  }
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const recordedTotal = recordedScores[currentPlayer].total;
    const selectedValue = selectedScore ? selectedScore.value : 0;
    const updatedTotal = recordedTotal + selectedValue;
    dispatch({ type: ActionType.SetSelectedTotal, payload: updatedTotal });
  }, [selectedScore]);

  useEffect(() => {
    if (!isFirstRender) {
      setShouldAnimate(true);
      return;
    }
    setIsFirstRender(false);
    setIsFirstRender(false);
  }, [currentPlayer]);

  return (
    <table id="score-table">
      <thead>
        <tr>
          <td>COMBO</td>
          <td
            className={`playerLabel ${
              !isFirstRender && shouldAnimate && "animate"
            }`}
            onAnimationEnd={() => setShouldAnimate(false)}
          >
            {currentPlayer.toUpperCase()}
          </td>
        </tr>
      </thead>
      <tbody>
        {Object.values(Combination).map((combo) => (
          <tr key={combo}>
            <td>{combo}</td>
            <td
              className={`score-spot ${
                isRecorded(combo) || isSelected(combo, selectedScore)
              }`}
              onClick={() => handleClick(state, dispatch, combo)}
            >
              {recordedScores[currentPlayer][combo]?.value ??
                evaluatedScores?.[combo]}
              {isSelected(combo, selectedScore) && " <"}
            </td>
          </tr>
        ))}
        <tr>
          <td>TOTAL</td>
          <td className="total-label">{selectedTotal}</td>
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
    roundStage,
    evaluatedScores,
    currentPlayer,
    recordedScores,
    selectedScore,
  } = state;

  if (roundStage === RoundStage.FirstRoll) {
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
