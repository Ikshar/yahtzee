import { useContext } from "react"
import { TableContext } from "./ctx/TableContext"

export type Player = "Player1" | "Player2"

type PlayerHand = {
  playerID: Player
  dice: number[]
}

export type GameState = {
  currentPlayer: Player
  isDecisionStage: boolean
  values: number[]
  
}

const { currentPlayer } = useContext(TableContext)

function reducer(
  state: GameState,
  action: { type: "setNextPlayer" }
): GameState {
  switch (action.type) {
    case "setNextPlayer":
      if (currentPlayer === "Player1") {
        return { ...state, currentPlayer: "Player2" }
      } else {
        return { ...state, currentPlayer: "Player1" }
      }
  }
}
