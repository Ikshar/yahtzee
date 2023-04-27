import { useReducer } from "react";
import { TableContextProvider, initialState } from "../ctx/TableContext";
import { reducer } from "../store";
import { Game } from "./Game";

export function App() {
  const store = useReducer(reducer, initialState);

  return (
    <div id="app">
      <TableContextProvider value={store}>
        <Game />
      </TableContextProvider>
    </div>
  );
}
