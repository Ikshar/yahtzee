import { Player, Score, RoundStage, EvaluatedScores } from "./game";

type SetCurrentPlayerAction = {
  type: ActionType.SetCurrentPlayer;
  payload: Player;
};

type SetValuesAction = {
  type: ActionType.SetValues;
  payload: number[];
};

type SetSelectedDiceAction = {
  type: ActionType.SetSelectedDice;
  payload?: boolean[];
};

type SetSelectedScoreAction = {
  type: ActionType.SetSelectedScore;
  payload?: Score;
};

type SetStageAction = {
  type: ActionType.SetStage;
  payload: RoundStage;
};

type SetSavedPlayerScoreAction = {
  type: ActionType.SetSavedPlayerScore;
  payload: { score: Score };
};

type SetEvaluatedScoreAction = {
  type: ActionType.SetEvaluatedScore;
  payload?: { score: EvaluatedScores };
};

type SetShouldAnimateDiceAction = {
  type: ActionType.SetShouldAnimateDice;
  payload: boolean;
};

export enum ActionType {
  SetCurrentPlayer = "setCurrentPlayer",
  SetValues = "setValues",
  SetSelectedDice = "setSelectedDice",
  SetSelectedScore = "setSelectedScore",
  SetStage = "setStage",
  SetSavedPlayerScore = "setSavedPlayerScore",
  SetEvaluatedScore = "setEvaluatedScore",
  SetShouldAnimateDice = "setShouldAnimateDice",
}

export type Action =
  | SetCurrentPlayerAction
  | SetValuesAction
  | SetSelectedDiceAction
  | SetSelectedScoreAction
  | SetStageAction
  | SetSavedPlayerScoreAction
  | SetEvaluatedScoreAction
  | SetShouldAnimateDiceAction;
