import { times } from "lodash-es";
import { ActionType, GameState } from "./types"

export function reducer(state: GameState, action: ActionType) {
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
    case "setSelectedRecord":
      return {
        ...state,
        selectedRecord: action.payload || undefined,
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
      throw Error;
  }
}
