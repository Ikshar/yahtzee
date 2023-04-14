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
    case "setSavedPlayerScore":
      const currentScore = { ...state.recordedScores[action.payload.player] };
      const updatedScore = { ...currentScore, ...action.payload.score };
      return {
        ...state,
        recordedScores: {
          ...state.recordedScores,
          [state.currentPlayer]: updatedScore,
        },
      };
    case "setEvaluatedScore":
      return {
        ...state,
        evaluatedScores: action.payload?.score || {},
      };
    default:
      throw Error;
  }
}
