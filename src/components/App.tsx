import { useReducer } from "react";
import { ControlButton } from "./ControlButton";
import { DiceContainer } from "./DiceContainer";
import { ScoreTable } from "./ScoreTable";
import { TableContextProvider } from "../ctx/TableContext";
import { GameState, RoundStage } from "../types";
import { StatusBar } from "./StatusBar";
import { reducer } from "../store";

const initialState: GameState = {
  values: [1, 2, 3, 4, 5],
  selectedDice: [false, false, false, false, false],
  selectedRecord: undefined,
  stage: RoundStage.FirstRoll,
  currentPlayer: "Player1",
  scores: [],
};

export function App() {
  const store = useReducer(reducer, initialState);

  return (
    <div id="app">
      <div className="back">
        <TableContextProvider value={store}>
          <ScoreTable />
          <StatusBar />
          <DiceContainer />
          <ControlButton />
        </TableContextProvider>
      </div>
    </div>
  );
}
