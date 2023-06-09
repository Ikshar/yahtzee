import { Score } from "./game";

export enum ActionType {
  SetSelectedDice = "setSelectedDice",
  SetSelectedScore = "setSelectedScore",
  SetSelectedTotal = "setSelectedTotal",
  SetShouldAnimateDice = "setShouldAnimateDice",
  SetTotal = "setTotal",
  StartNewRound = "startNewRound",
  StartNextStage = "startNextStage",
  InitiateOutcome = "initiateOutcome",
  StartNewGame = "startNewGame"
}

type SetSelectedDice = {
  type: ActionType.SetSelectedDice;
  payload?: boolean[];
};

type SetSelectedTotal = {
  type: ActionType.SetSelectedTotal;
  payload: number;
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

type SetTotal = {
  type: ActionType.SetTotal;
  payload: number;
};

type InitiateOutcome = {
  type: ActionType.InitiateOutcome;
};

type StartNewGame = {
  type: ActionType.StartNewGame;
};

export type Action =
  | SetSelectedDice
  | SetSelectedScore
  | SetSelectedTotal
  | SetShouldAnimateDice
  | SetTotal
  | StartNewRound
  | StartNextStage
  | InitiateOutcome
  | StartNewGame;
