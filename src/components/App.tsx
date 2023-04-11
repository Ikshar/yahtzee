import { useReducer } from "react";
import { ControlButton } from "./ControlButton";
import { DiceContainer } from "./DiceContainer";
import { ScoreTable } from "./ScoreTable";
import { TableContextProvider, initialState } from "../ctx/TableContext";
import { StatusBar } from "./StatusBar";
import { reducer } from "../store";

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
