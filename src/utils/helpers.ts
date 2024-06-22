import { GameState } from "../models/types";

// Define the initial game state
export const initialState: GameState = {
  page: "new",
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  currentPlayer: "X",
  winner: null,
  winPattern: null,
  draw: false,
  isBot: false,
  mode: null,
  gameDifficulty: null,
  robotDifficulty: 0,
  rounds: null,
  currentRound: 1,
  player1: "",
  player2: "",
  score: {
    player1: 0,
    player2: 0,
    draws: 0,
  },
};

// Define game rounds
export const gameRounds: number[] = [5, 10, 20, 30];
