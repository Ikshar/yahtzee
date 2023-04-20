import { times, random } from "lodash-es";

export function generateNewValues(values: number[], selectedDice?: boolean[]) {
  if (selectedDice?.includes(true)) {
    return values.map((value, idx) =>
      selectedDice[idx] ? value : random(1, 6)
    );
  }
  return times(5, () => random(1, 6));
}
