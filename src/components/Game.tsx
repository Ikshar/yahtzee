import { useContext } from "react";
import { ControlButton } from "./ControlButton";
import { DiceContainer } from "./DiceContainer";
import { ScoreTable } from "./ScoreTable";
import { TableContext } from "../ctx/TableContext";
import { StatusBar } from "./StatusBar";
import { GameStage, Player, RecordedScores } from "../types/game";

export function Game() {
  const [state] = useContext(TableContext);
  const isActiveRound = state.gameStage === GameStage.ActiveRound;

  const player1Score = state.recordedScores[Player.Player1].total;
  const player2Score = state.recordedScores[Player.Player2].total;

  const winner =
    player1Score > player2Score
      ? Player.Player1
      : player1Score < player2Score
      ? Player.Player2
      : "Tie";

  const happyMessage =
    winner === "Tie" ? "Friendship wins!" : `${winner} wins!`;

  return (
    <div id="game">
      {isActiveRound ? (
        // todo: make active game screen component
        <div>
          <ScoreTable />
          <StatusBar />
          <DiceContainer />
        </div>
      ) : (
        // todo: make outcome screen component
        <div>
          <div>{`${player1Score} vs ${player2Score}`}</div>
          <div>{happyMessage}</div>
        </div>
      )}
      <ControlButton />
    </div>
  );
}
