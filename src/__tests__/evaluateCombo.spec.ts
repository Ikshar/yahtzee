import { evaluateCombo } from "../logic/evaluateCombo";

describe("evaluateCombo", () => {
  test("ThreeOfAKind", () => {
    expect(evaluateCombo([5, 5, 5, 2, 1])).toMatchObject({
      Aces: 1,
      Chance: 18,
      Fives: 15,
      ThreeOfAKind: 18,
      Twos: 2,
    });
  });

  test("FourOfAKind", () => {
    expect(evaluateCombo([2, 2, 2, 2, 1])).toMatchObject({
      Aces: 1,
      Chance: 9,
      FourOfAKind: 9,
      ThreeOfAKind: 9,
      Twos: 8,
    });
  });

  test("FullHouse", () => {
    expect(evaluateCombo([1, 1, 2, 2, 2])).toMatchObject({
      Aces: 2,
      Chance: 8,
      FullHouse: 25,
      ThreeOfAKind: 8,
      Twos: 6,
    });
  });

  test("SmallStraight", () => {
    expect(evaluateCombo([4, 2, 3, 1, 1])).toMatchObject({
      Aces: 2,
      Chance: 11,
      Fours: 4,
      SmallStraight: 30,
      Threes: 3,
      Twos: 2,
    });
  });

  test("LargeStraight", () => {
    expect(evaluateCombo([5, 2, 3, 1, 4])).toMatchObject({
      Aces: 1,
      Chance: 15,
      Fives: 5,
      Fours: 4,
      LargeStraight: 40,
      SmallStraight: 30,
      Threes: 3,
      Twos: 2,
    });
  });

  test("Yahtzee", () => {
    expect(evaluateCombo([6, 6, 6, 6, 6])).toMatchObject({
      Chance: 30,
      FourOfAKind: 30,
      Sixes: 30,
      ThreeOfAKind: 30,
      Yahtzee: 50,
    });
  });
});
