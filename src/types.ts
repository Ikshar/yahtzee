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

export type Score = Partial<Record<Combination, number>>;

export type PlayerScores = Partial<{
  [key in Combination]: number;
}>;

export type Scores = { [key in Player]: PlayerScores };

export type GameState = {
  currentPlayer: Player;
  values: number[];
  selectedScore?: Score;
  selectedDice: boolean[];
  stage: RoundStage;
  recordedScores: Scores;
  evaluatedScores: PlayerScores;
  shouldAnimateDice: boolean;
};

export enum Player {
  Player1 = "Player1",
  Player2 = "Player2",
}

export type ActionType =
  | { type: "setCurrentPlayer"; payload: Player }
  | { type: "setValues"; payload: number[] }
  | { type: "setSelectedDice"; payload?: boolean[] }
  | {
      type: "setSelectedScore";
      payload?: Score;
    }
  | { type: "setStage"; payload: RoundStage }
  | {
      type: "setSavedPlayerScore";
      payload: { player: Player; score: Score };
    }
  | {
      type: "setEvaluatedScore";
      payload?: { score: Score };
    }
  | {
      type: "setShouldAnimateDice";
      payload: boolean;
    };
