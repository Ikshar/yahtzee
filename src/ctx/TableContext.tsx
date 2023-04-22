import { createContext } from "react";
import { Action } from "../types/reducer";
import { GameState, RoundStage, Player, GameStage } from "../types/game";

type Store = [GameState, React.Dispatch<Action>];

export const initialState: GameState = {
  values: [1, 2, 3, 4, 5],
  selectedDice: [false, false, false, false, false],
  selectedScore: undefined,
  selectedTotal: 0,
  gameStage: GameStage.ActiveRound,
  roundStage: RoundStage.FirstRoll,
  currentPlayer: Player.Player1,
  recordedScores: {
    [Player.Player1]: { total: 0 },
    [Player.Player2]: { total: 0 },
  },
  evaluatedScores: undefined,
  shouldAnimateDice: false,
  currentRound: 26,
};

export const TableContext = createContext<Store>([initialState, () => {}]);

export const TableContextProvider = TableContext.Provider;
