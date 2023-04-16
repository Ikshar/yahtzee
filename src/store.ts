import { times } from "lodash-es";
import { ActionType, GameState } from "./types";

export function reducer(state: GameState, action: ActionType): GameState {
  switch (action.type) {
    case "setValues":
      return {
        ...state,
        values: action.payload,
      };
    case "setSelectedDice":
      return {
        ...state,
        selectedDice: action.payload || times(5, () => false),
      };
    case "setStage":
      return {
        ...state,
        stage: action.payload,
      };
    case "setCurrentPlayer":
      return {
        ...state,
        currentPlayer: action.payload,
      };
    case "setSelectedScore":
      return {
        ...state,
        selectedScore: action.payload,
      };
    case "setRecordedScores":
      const currentPlayerScores = {
        ...state.recordedScores[action.payload.player],
      };
      const newScoreName = action.payload.score.name;
      const newScoreValue = action.payload.score.value;

      const newScore = {
        [newScoreName]: { name: newScoreName, value: newScoreValue },
      };
      const updatedPlayerScore = { ...currentPlayerScores, ...newScore };
      return {
        ...state,
        recordedScores: {
          ...state.recordedScores,
          [state.currentPlayer]: updatedPlayerScore,
        },
      };
    case "setEvaluatedScores":
      return {
        ...state,
        evaluatedScores: action.payload?.score,
      };
    case "setShouldAnimateDice":
      return {
        ...state,
        shouldAnimateDice: action.payload,
      };
    default:
      throw Error;
  }
}
