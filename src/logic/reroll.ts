import { times, random } from "lodash-es";

export function rerollAll() {
  const values = times(5, () => random(1, 6));
  return values;
}

export function rerollUnheld(values: number[], selected: boolean[]) {
    return values.map((value, idx) => selected[idx] ? value : random(1, 6))
}
