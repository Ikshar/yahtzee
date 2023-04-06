import { times } from "lodash-es";
import { useReducer } from "react";
import { ControlButton } from "./ControlButton";
import { DiceContainer } from "./DiceContainer";
import { ScoreTable } from "./ScoreTable";
import { TableContextProvider } from "../ctx/TableContext";
import { RoundStage as RoundStage } from "../types";
import { StatusBar } from "./StatusBar";
import { rerollAll } from "../logic/reroll";
import { reducer } from "../store";

const initialState = {
  values: rerollAll(),
  selected: times(5, () => false),
  stage: RoundStage.Initial,
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
