import { random, times } from "lodash-es";
import { useState } from "react";
import { ControlButton } from "./components/ControlButton";
import { DiceContainer } from "./components/DiceContainer";
import { ScoreTable } from "./components/ScoreTable";
import { TableContextProvider } from "./ctx/TableContext";
import { PlayerScore, RoundStage as RoundStage } from "./types";

export function App() {
  const [values, setValues] = useState<number[]>(() =>
    times(5, () => random(1, 6))
  );
  const [selected, setSelected] = useState<boolean[]>(() =>
    times(5, () => false)
  );

  const [stage, setStage] = useState<RoundStage>(() => RoundStage.Decision);

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
          {/* <ScoreTable /> */}
          <div className="status-bar">
            <div className="center-wrapper grid-container">
              <div className="status-bar grid-item">
                <h3>{`${currentPlayer}'s turn!`}</h3>
                <h4>
                  {stage === RoundStage.Initial
                    ? "Roll the dice!"
                    : stage === RoundStage.Decision
                    ? "Choose what to hold"
                    : "Here's your result:"}
                </h4>
              </div>
              <div className="center-wrapper grid-item">
                <div className="dice-wrapper grid-item">
                  <DiceContainer values={values} />
                </div>
              </div>
              <div className="center-wrapper grid-item">
                <ControlButton />
              </div>
            </div>
          </div>
        </TableContextProvider>
      </div>
    </div>
  );
}
