import { times } from "lodash-es";
import { useReducer } from "react";
import { ControlButton } from "./ControlButton";
import { DiceContainer } from "./DiceContainer";
import { ScoreTable } from "./ScoreTable";
import { TableContextProvider } from "../ctx/TableContext";
import { GameState, RoundStage } from "../types";
import { StatusBar } from "./StatusBar";
import { rerollAll } from "../logic/reroll";
import { reducer } from "../store";

const initialState: GameState = {
  values: rerollAll(),
  selectedDice: times(5, () => false),
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
