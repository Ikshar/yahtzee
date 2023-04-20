import { times } from "lodash-es";
import { generateNewValues } from "./logic/generateValues";
import { GameState, RoundStage, Player } from "./types/game";
import { Action, ActionType } from "./types/reducer";
import { stageInfo } from "./types/stageInfo";
import { evaluateScores } from "./logic/evaluateCombo";

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case ActionType.SetSelectedDice:
      const unselectedDice = times(5, () => false);
      return {
        ...state,
        selectedDice: action.payload || unselectedDice,
      };
    case ActionType.SetSelectedScore:
      return {
        ...state,
        selectedScore: action.payload,
      };
    case ActionType.SetShouldAnimateDice:
      return {
        ...state,
        shouldAnimateDice: action.payload,
      };
    case ActionType.StartNewRound:
      const updatedScores = getUpdatedScores(state);
      const nextPlayer = getNextPlayer(state.currentPlayer);
      return {
        ...state,
        stage: RoundStage.FirstRoll,
        currentPlayer: nextPlayer,
        selectedScore: undefined,
        selectedDice: [],
        evaluatedScores: undefined,
        recordedScores: {
          ...state.recordedScores,
          [state.currentPlayer]: updatedScores,
        },
      };
    case ActionType.StartNextStage:
      const newValues = generateNewValues(state.values, state.selectedDice);
      const evaluatedScores = evaluateScores(newValues);
      const nextStage = stageInfo[state.stage].nextStage;
      return {
        ...state,
        values: newValues,
        evaluatedScores: evaluatedScores,
        shouldAnimateDice: true,
        stage: nextStage,
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
  const selectedScore = { ...state.selectedScore };
  const updatedScores = { ...currentScores, ...selectedScore };
  return updatedScores;
}
