import { Combination, EvaluatedScores } from "../types/game";

type UpperSection = {
  Aces: number;
  Twos: number;
  Threes: number;
  Fours: number;
  Fives: number;
  Sixes: number;
};

type LowerSection = {
  ThreeOfAKind: number;
  FourOfAKind: number;
  FullHouse: number;
  SmallStraight: number;
  LargeStraight: number;
  Yahtzee: number;
  Chance: number;
};

const FixedPayouts = {
  [Combination.FullHouse]: 25,
  [Combination.SmallStraight]: 30,
  [Combination.LargeStraight]: 40,
  [Combination.Yahtzee]: 50,
};

function createCountMap(dice: number[]): Record<number, number> {
  const countMap: Record<number, number> = {};

  for (const die of dice) {
    countMap[die] = (countMap[die] || 0) + 1;
  }

  return countMap;
}
const emptyScore = {
  Aces: 0,
  Twos: 0,
  Threes: 0,
  Fours: 0,
  Fives: 0,
  Sixes: 0,
  ThreeOfAKind: 0,
  FourOfAKind: 0,
  FullHouse: 0,
  SmallStraight: 0,
  LargeStraight: 0,
  Yahtzee: 0,
  Chance: 0,
};

export function evaluateCombo(dice: number[]): EvaluatedScores {
  return {
    ...emptyScore,
    ...evaluateUpperSection(dice),
    ...evaluateLowerSection(dice),
  };
}

function evaluateUpperSection(dice: number[]): UpperSection {
  const upperSection = [0, 0, 0, 0, 0, 0];
  dice.forEach((value) => (upperSection[value - 1] += value));

  return {
    Aces: upperSection[0],
    Twos: upperSection[1],
    Threes: upperSection[2],
    Fours: upperSection[3],
    Fives: upperSection[4],
    Sixes: upperSection[5],
  };
}

function evaluateLowerSection(dice: number[]): LowerSection {
  const score: Partial<LowerSection> = {};
  const sumOfDiceValues = dice.reduce((a, v) => a + v);

  score.Chance = sumOfDiceValues;

  if (validateFiveOfAKind(dice)) {
    score.Yahtzee = FixedPayouts.Yahtzee;
    score.FourOfAKind = sumOfDiceValues;
    score.ThreeOfAKind = sumOfDiceValues;
  } else if (validateFourOfAKind(dice)) {
    score.FourOfAKind = sumOfDiceValues;
    score.ThreeOfAKind = sumOfDiceValues;
  } else if (validateThreeOfAKind(dice)) {
    score.ThreeOfAKind = sumOfDiceValues;
    if (validateFullHouse(dice)) {
      score.FullHouse = FixedPayouts[Combination.FullHouse];
    }
  }

  if (validateLargeStraight(dice)) {
    score.LargeStraight = FixedPayouts[Combination.LargeStraight];
    score.SmallStraight = FixedPayouts[Combination.SmallStraight];
  } else if (validateSmallStraight(dice)) {
    score.SmallStraight = FixedPayouts[Combination.SmallStraight];
  }

  return score as LowerSection;
}

function validateThreeOfAKind(dice: number[]): boolean {
  const countMap = createCountMap(dice);

  for (const d in countMap) {
    if (countMap[d] >= 3) {
      return true;
    }
  }

  return false;
}

function validateFourOfAKind(dice: number[]): boolean {
  const countMap = createCountMap(dice);

  for (const die in countMap) {
    if (countMap[die] >= 4) {
      return true;
    }
  }

  return false;
}

function validateFiveOfAKind(dice: number[]): boolean {
  const uniqueDice = Array.from(new Set([...dice]));
  return uniqueDice.length === 1;
}

function validateFullHouse(dice: number[]): boolean {
  const countMap = createCountMap(dice);
  let hasTwoOfAKind = false;
  let hasThreeOfAKind = false;

  for (const die in countMap) {
    if (countMap[die] === 3) {
      hasThreeOfAKind = true;
    } else if (countMap[die] === 2) {
      hasTwoOfAKind = true;
    }
  }

  return hasTwoOfAKind && hasThreeOfAKind;
}

function validateSmallStraight(dice: number[]): boolean {
  let isSmallStraight = true;
  const uniqueDice = Array.from(new Set([...dice]));

  if (uniqueDice.length < 4) {
    return false;
  }

  uniqueDice.sort();
  for (let i = 0; i < 3; i++) {
    if (uniqueDice[i] + 1 !== uniqueDice[i + 1]) {
      isSmallStraight = false;
    }
  }
  if (isSmallStraight) return true;

  uniqueDice.reverse();
  for (let i = 0; i < 3; i++) {
    if (uniqueDice[i] - 1 !== uniqueDice[i + 1]) {
      isSmallStraight = false;
    }
  }

  return isSmallStraight;
}

function validateLargeStraight(dice: number[]): boolean {
  const uniqueDice = Array.from(new Set([...dice]));

  if (uniqueDice.length < 5) {
    return false;
  }

  uniqueDice.sort();
  for (let i = 0; i < 4; i++) {
    if (uniqueDice[i] + 1 !== uniqueDice[i + 1]) {
      return false;
    }
  }

  return true;
}
