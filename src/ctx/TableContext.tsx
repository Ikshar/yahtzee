import { createContext } from "react";
import { ActionType, GameState, RoundStage } from "../types";

type Store = [GameState, React.Dispatch<ActionType>];

export const TableContext = createContext<Store>([
  {
    currentPlayer: "",
    values: [],
    selectedDice: [],
    stage: RoundStage.FirstRoll,
    scores: [],
  },
  () => {},
]);

export const TableContextProvider = TableContext.Provider;
