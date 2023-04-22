import { Combination, EvaluatedScores } from "../types/game";

type UpperSection = {
  [Combination.Aces]: number;
  [Combination.Twos]: number;
  [Combination.Threes]: number;
  [Combination.Fours]: number;
  [Combination.Fives]: number;
  [Combination.Sixes]: number;
};

type LowerSection = {
  [Combination.ThreeOfAKind]: number;
  [Combination.FourOfAKind]: number;
  [Combination.FullHouse]: number;
  [Combination.SmallStraight]: number;
  [Combination.LargeStraight]: number;
  [Combination.Yahtzee]: number;
  [Combination.Chance]: number;
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
  [Combination.Aces]: 0,
  [Combination.Twos]: 0,
  [Combination.Threes]: 0,
  [Combination.Fours]: 0,
  [Combination.Fives]: 0,
  [Combination.Sixes]: 0,
  [Combination.ThreeOfAKind]: 0,
  [Combination.FourOfAKind]: 0,
  [Combination.FullHouse]: 0,
  [Combination.SmallStraight]: 0,
  [Combination.LargeStraight]: 0,
  [Combination.Yahtzee]: 0,
  [Combination.Chance]: 0,
};

export function evaluateScores(dice: number[]): EvaluatedScores {
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
    [Combination.Aces]: upperSection[0],
    [Combination.Twos]: upperSection[1],
    [Combination.Threes]: upperSection[2],
    [Combination.Fours]: upperSection[3],
    [Combination.Fives]: upperSection[4],
    [Combination.Sixes]: upperSection[5],
  };
}

function evaluateLowerSection(dice: number[]): LowerSection {
  const score: Partial<LowerSection> = {};
  const sumOfDiceValues = dice.reduce((a, v) => a + v);

  score[Combination.Chance] = sumOfDiceValues;

  if (validateFiveOfAKind(dice)) {
    score[Combination.Yahtzee] = FixedPayouts.Yahtzee;
    score[Combination.FourOfAKind] = sumOfDiceValues;
    score[Combination.ThreeOfAKind] = sumOfDiceValues;
  } else if (validateFourOfAKind(dice)) {
    score[Combination.FourOfAKind] = sumOfDiceValues;
    score[Combination.ThreeOfAKind] = sumOfDiceValues;
  } else if (validateThreeOfAKind(dice)) {
    score[Combination.ThreeOfAKind] = sumOfDiceValues;
    if (validateFullHouse(dice)) {
      score[Combination.FullHouse] = FixedPayouts[Combination.FullHouse];
    }
  }

  if (validateLargeStraight(dice)) {
    score[Combination.LargeStraight] = FixedPayouts[Combination.LargeStraight];
    score[Combination.SmallStraight] = FixedPayouts[Combination.SmallStraight];
  } else if (validateSmallStraight(dice)) {
    score[Combination.SmallStraight] = FixedPayouts[Combination.SmallStraight];
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
