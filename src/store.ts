import { times } from "lodash-es";
import { Action, ActionType } from "./types/reducer";
import { GameState, PlayerScores } from "./types/game";

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case ActionType.SetValues:
      return {
        ...state,
        values: action.payload,
      };
    case ActionType.SetSelectedDice:
      return {
        ...state,
        selectedDice: action.payload || times(5, () => false),
      };
    case ActionType.SetStage:
      return {
        ...state,
        stage: action.payload,
      };
    case ActionType.SetCurrentPlayer:
      return {
        ...state,
        currentPlayer: action.payload,
      };
    case ActionType.SetSelectedScore:
      return {
        ...state,
        selectedScore: action.payload,
      };
    case ActionType.SetSavedPlayerScore:
      const currentScore = { ...state.recordedScores[state.currentPlayer] };
      const updatedScore = { ...currentScore, ...action.payload.score };
      return {
        ...state,
        recordedScores: {
          ...state.recordedScores,
          [state.currentPlayer]: updatedScore,
        },
      };
    case ActionType.SetEvaluatedScore:
      return {
        ...state,
        evaluatedScores: action.payload?.score,
      };
    case ActionType.SetShouldAnimateDice:
      return {
        ...state,
        shouldAnimateDice: action.payload,
      };
    default:
      throw Error;
  }
}
