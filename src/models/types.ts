// Define the possible values for a cell in the Tic-Tac-Toe board
export type Player = "X" | "O" | null;

// Define the structure of the Tic-Tac-Toe board
export type BoardType = Player[][];

export type PageType =
  | "new"
  | "mode"
  | "difficulty"
  | "rounds"
  | "names"
  | "board";

export type WinPatternType =
  | "R1"
  | "R2"
  | "R3"
  | "C1"
  | "C2"
  | "C3"
  | "D1"
  | "D2";

// Define the state of the game
export type GameState = {
  page: PageType;
  board: BoardType;
  currentPlayer: Player;
  winner: Player;
  winPattern: WinPatternType | null;
  draw: boolean;
  isBot: boolean;
  mode: GameModeEnum | null;
  gameDifficulty: GameDifficulty | null;
  robotDifficulty: number;
  rounds: number | null;
  currentRound: number;
  player1: string;
  player2: string;
  score: {
    player1: number;
    player2: number;
    draws: number;
  };
};

export const GameDifficultyMap = {
  easy: [0, 1, 2, 3],
  medium: [4, 5, 6, 7],
  hard: [8, 9, 10],
};

export enum GameDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

// Define a position on the board
export type Position = {
  row: number;
  col: number;
};

export enum GameModeEnum {
  vBot = "Human versus Bot",
  vHuman = "Human versus Human",
}

export type SFXState = {
  musicSound: HTMLAudioElement;
  clickSound: HTMLAudioElement;
  winSound: HTMLAudioElement;
  drawSound: HTMLAudioElement;
};
