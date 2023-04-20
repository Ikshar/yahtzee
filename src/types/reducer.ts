import { Score } from "./game";

export enum ActionType {
  SetSelectedDice = "setSelectedDice",
  SetSelectedScore = "setSelectedScore",
  SetShouldAnimateDice = "setShouldAnimateDice",
  StartNewRound = "startNewRound",
  StartNextStage = "startNextStage",
}

type SetSelectedDice = {
  type: ActionType.SetSelectedDice;
  payload?: boolean[];
};

type SetSelectedScore = {
  type: ActionType.SetSelectedScore;
  payload?: Score;
};

type SetShouldAnimateDice = {
  type: ActionType.SetShouldAnimateDice;
  payload: boolean;
};

type StartNewRound = {
  type: ActionType.StartNewRound;
};

type StartNextStage = {
  type: ActionType.StartNextStage;
};

export type Action =
  | SetSelectedDice
  | SetSelectedScore
  | SetShouldAnimateDice
  | StartNewRound
  | StartNextStage;
