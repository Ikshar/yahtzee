import { random, times } from "lodash-es";
import { useState } from "react";
import { ControlButton } from "./components/ControlButton";
import { DiceContainer } from "./components/DiceContainer";
import { ScoreTable } from "./components/ScoreTable";
import { TableContextProvider } from "./ctx/TableContext";
import { PlayerScore, RoundStage as RoundStage } from "./types";
import { StatusBar } from "./components/StatusBar";

export function App() {
  const [values, setValues] = useState<number[]>(() =>
    times(5, () => random(1, 6))
  );
  const [selected, setSelected] = useState<boolean[]>(() =>
    times(5, () => false)
  );

  const [stage, setStage] = useState<RoundStage>(() => RoundStage.Initial);

  const [currentPlayer, setCurrentPlayer] = useState("Player1");
  const [animation, setAnimation] = useState(false);
  const [scores, setScores] = useState<PlayerScore[]>([]);

  return (
    <div id="app">
      <div className="back">
        <TableContextProvider
          value={{
            currentPlayer,
            values,
            selected,
            setSelected,
            stage,
            setStage,
            setCurrentPlayer,
            setValues,
            animation,
            setAnimation,
            scores,
          }}
        >

          <ScoreTable />
          <StatusBar />
          <DiceContainer />
          <ControlButton />

        </TableContextProvider>
      </div>
    </div>
  );
}
