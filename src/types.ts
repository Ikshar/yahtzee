export type Hand = {
  values: number[];
  isSelected: boolean[];
};

export const DiceValues = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

// todo: split into RoundStage and GameStage
// RoundStage: Initial, Decision, RoundOutcome
// GameStage: <P>Turn, GameOutcome
export enum GameStage {
  ActiveRound = "ActiveRound",
  GameOutcome = "GameOutcome",
}

export enum RoundStage {
  Initial = "initial",
  Decision = "decision",
  Outcome = "outcome",
}

export enum Combination {
  Aces = "Aces",
  Twos = "Twos",
  Three = "Threes",
  Fours = "Fours",
  Fives = "Fives",
  Sixes = "Sixes",
  ThreeOfAKind = "Three Of A Kind",
  FourOfAKind = "Four Of A Kind",
  FullHouse = "Full House",
  SmallStraight = "Small Straight", // 4 dice
  LargeStraight = "Large Straight", // 5 dice
  Yahtzee = "Yahtzee", // All five dice the same
  Chance = "Chance", // Any combination
}

export type PlayerScore = {
  Aces: number;
  Twos: number;
  Three: number;
  Fours: number;
  Fives: number;
  Sixes: number;
  ThreeOfAKind: number;
  FourOfAKind: number;
  FullHouse: number;
  SmallStraight: number;
  LargeStraight: number;
  Yahtzee: number;
  Chance: number;
};