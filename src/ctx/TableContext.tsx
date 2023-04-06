import { createContext, Dispatch, ReactNode, SetStateAction } from "react";
import { PlayerScore, RoundStage } from "../types";

type TableContextType = {
  currentPlayer: string;
  values: number[];
  selected: boolean[];
  setSelected: Dispatch<SetStateAction<boolean[]>>;
  stage: RoundStage;
  setStage: Dispatch<SetStateAction<RoundStage>>;
  setCurrentPlayer: Dispatch<SetStateAction<string>>;
  setValues: Dispatch<SetStateAction<number[]>>;
  animation: boolean;
  setAnimation: Dispatch<SetStateAction<boolean>>;
  scores: PlayerScore[];
};

export const TableContext = createContext<TableContextType>({
  currentPlayer: "",
  values: [],
  selected: [],
  setSelected: () => {},
  stage: RoundStage.Initial,
  setStage: () => {},
  setCurrentPlayer: () => {},
  setValues: () => {},
  animation: false,
  setAnimation: () => {},
  scores: [],
});

export const TableContextProvider = TableContext.Provider;
