import { RoundStage } from "./game";

type StageInfo = {
  [key in RoundStage]: {
    buttonLabel: string;
    nextStage: RoundStage;
  };
};

export const stageInfo: StageInfo = {
  [RoundStage.FirstRoll]: {
    buttonLabel: "ROLL",
    nextStage: RoundStage.SecondRoll,
  },
  [RoundStage.SecondRoll]: {
    buttonLabel: "REROLL",
    nextStage: RoundStage.ThirdRoll,
  },
  [RoundStage.ThirdRoll]: {
    buttonLabel: "REREROLL",
    nextStage: RoundStage.Scoring,
  },
  [RoundStage.Scoring]: {
    buttonLabel: "CONFIRM",
    nextStage: RoundStage.FirstRoll,
  },
};
