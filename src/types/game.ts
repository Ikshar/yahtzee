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
  Three = "Threes",
  Fours = "Fours",
  Fives = "Fives",
  Sixes = "Sixes",
  ThreeOfAKind = "ThreeOfAKind",
  FourOfAKind = "FourOfAKind",
  FullHouse = "FullHouse",
  SmallStraight = "SmallStraight", // 4 dice
  LargeStraight = "LargeStraight", // 5 dice
  Yahtzee = "Yahtzee", // All five dice the same
  Chance = "Chance", // Any combination
}

export type Score = {
  name: Combination;
  value: number;
};

export type PlayerScores = Partial<{
  [key in Combination]: Score;
}>;

export type EvaluatedScores =
  | {
      [key in Combination]: number;
    }
  | undefined;

export type Scores = { [key in Player]: PlayerScores };

export type GameState = {
  currentPlayer: Player;
  values: number[];
  selectedScore?: Score;
  selectedDice: boolean[];
  stage: RoundStage;
  recordedScores: Scores;
  evaluatedScores?: EvaluatedScores;
  shouldAnimateDice: boolean;
};

export enum Player {
  Player1 = "Player1",
  Player2 = "Player2",
}
