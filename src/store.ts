import { times } from "lodash-es";
import { ActionType, GameState } from "./types"

export function reducer(state: GameState, action: ActionType) {
  switch (action.type) {
    case "setValues":
      return {
        ...state,
        values: action.payload,
      };
    case "setSelected":
      return {
        ...state,
        selected: action.payload || times(5, () => false),
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
    case "setScores":
      return {
        ...state,
        scores: action.payload,
      };
    default:
      return state;
  }
}
