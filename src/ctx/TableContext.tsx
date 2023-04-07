import { createContext } from "react";
import { ActionType, GameState, RoundStage } from "../types";

type TableContextType = [GameState, React.Dispatch<ActionType>];

export const TableContext = createContext<TableContextType>([
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
