import {
  BoardType,
  GameDifficulty,
  GameModeEnum,
  GameState,
  PageType,
  Player,
  Position,
} from "./types";

export interface GameLogicMethods {
  botMove: () =>
    | {
        winner: Player;
        draw: boolean;
      }
    | undefined;
  makeMove: (position: Position) =>
    | {
        winner: Player;
        draw: boolean;
      }
    | undefined;
  resetBoard: () => void;
  setPage: (page: PageType) => void;
  setGameMode: (mode: GameModeEnum | null) => void;
  setGameDifficulty: (gameDifficulty: GameDifficulty | null) => void;
  setRobotDifficulty: () => void;
  setGameRounds: (rounds: number | null) => void;
  setPlayer1: (name: GameState["player1"]) => void;
  setPlayer2: (name: GameState["player2"]) => void;
  updateScore: (player1: boolean, player2: boolean, draw: boolean) => void;
  checkWin: (board: Player[][], player: Player, botCheck?: boolean) => boolean;
  checkDraw: (board: Player[][]) => boolean;
  newGame: () => void;
  evaluateBoard: (board: BoardType) => number;
  miniMax: (board: BoardType, depth: number, isMaximizing: boolean) => number;
  findBestMove: (board: BoardType) => Position;
  findRandomMove: () => Position | void;
}

export interface SFXMethods {
  playGameMusicSound: () => void;
  pauseGameSoundMusic: () => void;
  clickBoardSound: () => void;
  winGameSound: () => void;
  drawGameSound: () => void;
}
