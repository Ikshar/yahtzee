import { times } from "lodash-es";
import { generateNewValues } from "./logic/generateValues";
import {
  GameState,
  RoundStage,
  Player,
  GameStage,
} from "./types/game";
import { Action, ActionType } from "./types/reducer";
import { stageInfo } from "./types/stageInfo";
import { evaluateScores } from "./logic/evaluateCombo";
import { initialState } from "./ctx/TableContext";

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case ActionType.SetSelectedDice:
      return {
        ...state,
        selectedDice: action.payload || initialState.selectedDice,
      };
    case ActionType.SetSelectedScore:
      return {
        ...state,
        selectedScore: action.payload,
      };
    case ActionType.SetSelectedTotal:
      return {
        ...state,
        selectedTotal: action.payload,
      };
    case ActionType.SetShouldAnimateDice:
      return {
        ...state,
        shouldAnimateDice: action.payload,
      };
    case ActionType.SetTotal:
      return {
        ...state,
        recordedScores: {
          ...state.recordedScores,
          [state.currentPlayer]: {
            total: state.selectedTotal,
          },
        },
      };
    case ActionType.StartNewRound:
      const nextPlayer = getNextPlayer(state.currentPlayer);
      const nextRound = state.currentRound + 1;
      return {
        ...state,
        roundStage: RoundStage.FirstRoll,
        currentPlayer: nextPlayer,
        selectedScore: initialState.selectedScore,
        selectedDice: initialState.selectedDice,
        evaluatedScores: initialState.evaluatedScores,
        recordedScores: {
          ...state.recordedScores,
          [state.currentPlayer]: getUpdatedScores(state),
        },
        currentRound: nextRound,
      };
    case ActionType.StartNextStage:
      const newValues = generateNewValues(state.values, state.selectedDice);
      const evaluatedScores = evaluateScores(newValues);
      const nextStage = stageInfo[state.roundStage].nextStage;
      return {
        ...state,
        values: newValues,
        evaluatedScores: evaluatedScores,
        shouldAnimateDice: true,
        roundStage: nextStage,
      };
    case ActionType.InitiateOutcome:
      return {
        ...state,
        gameStage: GameStage.GameOutcome,
        recordedScores: {
          ...state.recordedScores,
          [state.currentPlayer]: getUpdatedScores(state),
        },
      };
    default:
      throw Error;
  }
}

function getNextPlayer(currentPlayer: Player) {
  return currentPlayer === Player.Player1 ? Player.Player2 : Player.Player1;
}

function getUpdatedScores(state: GameState) {
  const currentScores = { ...state.recordedScores[state.currentPlayer] };
  const newScore = { [state.selectedScore!.name]: { ...state.selectedScore } };
  const updatedScores = {
    ...currentScores,
    ...newScore,
    total: state.selectedTotal,
  };
  return updatedScores;
}
