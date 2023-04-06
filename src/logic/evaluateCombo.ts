import { useContext } from "react";
import { TableContext } from "../ctx/TableContext";
import { Combination, PlayerScore } from "../types";

type Result = {
  combo: Combination;
  score: number;
};

// WIP
export function evaluateCombo(scores: PlayerScore[], currentPlayer: string): Result[] {
  const idx = currentPlayer === "Player1" ? 0 : 1;
  let scoresToCheck = [];
  for (const {comboName, value} of scores[idx]){
    if(!scores[comboName]){
      checkCombo(comboName);
    }
  }
}

function checkCombo(combo: Combination) {}
