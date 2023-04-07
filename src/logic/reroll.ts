import { times, random } from "lodash-es";

export function rerollAll() {
  const values = times(5, () => random(1, 6));
  return values;
}

export function rerollUnheld(values: number[], selectedDice: boolean[]) {
    return values.map((value, idx) => selectedDice[idx] ? value : random(1, 6))
}
