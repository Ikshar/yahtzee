export type Hand = {
  values: number[];
  isSelected: boolean[];
};

export const DiceValues = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export enum GameStage {
  ActiveRound = "ActiveRound",
  GameOutcome = "GameOutcome",
}

export enum RoundStage {
  FirstRoll = "FirstRoll",
  SecondRoll = "SecondRoll",
  ThirdRoll = "ThirdRoll",
  Scoring = "Scoring",
}

export enum Combination {
  Aces = "Aces",
  Twos = "Twos",
  Threes = "Threes",
  Fours = "Fours",
  Fives = "Fives",
  Sixes = "Sixes",
  ThreeOfAKind = "Three of a Kind",
  FourOfAKind = "Four of a Kind",
  FullHouse = "Full House",
  SmallStraight = "Small Straight", // 4 dice
  LargeStraight = "Large Straight", // 5 dice
  Yahtzee = "Yahtzee", // All five dice the same
  Chance = "Chance", // Any combination
}

export type Score = {
  name: Combination;
  value: number;
};

type PlayerScoresBase = {
  [key in Combination]?: Score;
};

export interface PlayerScores extends PlayerScoresBase {
  total: number;
}

export type RecordedScores = { [key in Player]: PlayerScores };

export type EvaluatedScores =
  | {
      [key in Combination]: number;
    }
  | undefined;

export type GameState = {
  currentPlayer: Player;
  values: number[];
  selectedScore?: Score;
  selectedTotal: number;
  selectedDice: boolean[];
  roundStage: RoundStage;
  gameStage: GameStage;
  recordedScores: RecordedScores;
  evaluatedScores?: EvaluatedScores;
  shouldAnimateDice: boolean;
  currentRound: number;
};

export enum Player {
  Player1 = "Player 1",
  Player2 = "Player 2",
}
