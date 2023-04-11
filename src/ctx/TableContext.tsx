import { createContext } from "react";
import { ActionType, GameState, Player, RoundStage } from "../types";

type Store = [GameState, React.Dispatch<ActionType>];

export const initialState: GameState = {
  values: [1, 2, 3, 4, 5],
  selectedDice: [false, false, false, false, false],
  selectedScore: undefined,
  stage: RoundStage.FirstRoll,
  currentPlayer: Player.Player1,
  scores: { [Player.Player1]: {}, [Player.Player2]: {} },
  evaluatedScore: {},
};

export const TableContext = createContext<Store>([initialState, () => {}]);

export const TableContextProvider = TableContext.Provider;
