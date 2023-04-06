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

export type PlayerScore = Record<Combination, number>;

export type GameState = {
    currentPlayer: string;
    values: number[];
    selected: boolean[];
    stage: RoundStage;
    scores: PlayerScore[];
}

export type Player = "Player1" | "Player2"

export type ActionType =
| { type: 'setCurrentPlayer'; payload: string }
| { type: 'setValues'; payload: number[] }
| { type: 'setSelected'; payload?: boolean[] }
| { type: 'setStage'; payload: RoundStage }
| { type: 'setScores'; payload: PlayerScore[] };