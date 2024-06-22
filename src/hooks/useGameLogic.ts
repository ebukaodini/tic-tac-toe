import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  BoardType,
  GameDifficulty,
  GameDifficultyMap,
  GameModeEnum,
  GameState,
  PageType,
  Player,
  Position,
  WinPatternType,
} from "../models/types";
import { GameLogicMethods } from "../models/interface";
import { APP_ID } from "../utils/constants";
import { initialState } from "../utils/helpers";
import { useEffect } from "react";
import {
  clickBoardSound,
  drawGameSound,
  gameMusicSound,
  winGameSound,
} from "../utils/sfx";

export const useGameWorker = () => {
  const { isBot, currentPlayer, winner, draw, botMove } = useGameLogic();

  // Use useEffect to handle the bot's move when it's the bot's turn
  useEffect(() => {
    if (isBot && currentPlayer === "O" && !winner && !draw) {
      setTimeout(() => {
        botMove();
      }, 2000); // Add a slight delay for a better user experience
      // return clearTimeout(timer); // Clear the timeout if the component unmounts
    }
  }, [botMove, currentPlayer, draw, isBot, winner]);
};

export const useGameLogic = create<GameState & GameLogicMethods>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setPage: (page: PageType) => {
          set({
            page: page,
          });
        },

        setGameMode: (mode: GameModeEnum | null) => {
          set({
            mode,
            player1: "",
            player2: mode === GameModeEnum.vBot ? "Robot" : "",
            page: mode === GameModeEnum.vBot ? "difficulty" : "rounds",
            isBot: mode === GameModeEnum.vBot,
          });
        },

        setGameDifficulty: (gameDifficulty: GameDifficulty | null) => {
          const { setRobotDifficulty } = get();
          set({
            gameDifficulty,
            page: "rounds",
          });

          setRobotDifficulty();
        },

        setRobotDifficulty: () => {
          // Select a random level from the map
          const { gameDifficulty } = get();
          const gameDifficultyLevels =
            GameDifficultyMap[gameDifficulty as GameDifficulty];
          const randomLevel = Math.floor(
            Math.random() * gameDifficultyLevels.length
          );

          console.log({ level: gameDifficultyLevels[randomLevel] });
          set({
            robotDifficulty: gameDifficultyLevels[randomLevel],
          });
        },

        setGameRounds: (rounds: number | null) => {
          set({
            rounds,
            page: "names",
          });
        },

        setPlayer1: (player1: string) => {
          set({
            player1,
          });
        },

        setPlayer2: (player2: string) => {
          set({
            player2,
          });
        },

        // Function to check if a player has won
        checkWin: (
          board: Player[][],
          player: Player,
          botCheck: boolean = false
        ): boolean => {
          const winPatternMap: WinPatternType[] = [
            "R1",
            "R2",
            "R3",
            "C1",
            "C2",
            "C3",
            "D1",
            "D2",
          ];
          const winPatterns = [
            // Rows
            [
              { row: 0, col: 0 },
              { row: 0, col: 1 },
              { row: 0, col: 2 },
            ],
            [
              { row: 1, col: 0 },
              { row: 1, col: 1 },
              { row: 1, col: 2 },
            ],
            [
              { row: 2, col: 0 },
              { row: 2, col: 1 },
              { row: 2, col: 2 },
            ],
            // Columns
            [
              { row: 0, col: 0 },
              { row: 1, col: 0 },
              { row: 2, col: 0 },
            ],
            [
              { row: 0, col: 1 },
              { row: 1, col: 1 },
              { row: 2, col: 1 },
            ],
            [
              { row: 0, col: 2 },
              { row: 1, col: 2 },
              { row: 2, col: 2 },
            ],
            // Diagonals
            [
              { row: 0, col: 0 },
              { row: 1, col: 1 },
              { row: 2, col: 2 },
            ],
            [
              { row: 0, col: 2 },
              { row: 1, col: 1 },
              { row: 2, col: 0 },
            ],
          ];

          return winPatterns.some((pattern, index) => {
            const matchedPattern = pattern.every(
              (pos) => board[pos.row][pos.col] === player
            );

            if (botCheck === false && matchedPattern)
              set({ winPattern: winPatternMap[index] });

            return matchedPattern;
          });
        },

        // Function to check if the game is a draw
        checkDraw: (board: Player[][]): boolean => {
          return board.every((row) => row.every((cell) => cell !== null));
        },

        updateScore: (player1: boolean, player2: boolean, draw: boolean) => {
          const { score } = get();
          set({
            score: {
              player1: player1 === true ? score.player1 + 1 : score.player1,
              player2: player2 === true ? score.player2 + 1 : score.player2,
              draws: draw === true ? score.draws + 1 : score.draws,
            },
          });
        },

        newGame: () => {
          gameMusicSound();
          set({ ...initialState, page: "mode" });
        },

        makeMove: (position: Position) => {
          const {
            board,
            winner,
            draw,
            currentPlayer,
            updateScore,
            checkWin,
            checkDraw,
          } = get();

          if (board[position.row][position.col] !== null || winner || draw) {
            // alert("Invalid move or game already finished");
            return; // Invalid move or game already finished
          }

          clickBoardSound();

          const newBoard = board.map((rowArr, rIdx) =>
            rowArr.map((cell, cIdx) =>
              rIdx === position.row && cIdx === position.col
                ? currentPlayer
                : cell
            )
          );

          const newWinner = checkWin(newBoard, currentPlayer)
            ? currentPlayer
            : null;
          if (newWinner) {
            winGameSound();
            updateScore(newWinner === "X", newWinner === "O", false);
          }

          const newDraw = !newWinner && checkDraw(newBoard);
          if (newDraw) {
            drawGameSound();
            updateScore(false, false, true);
          }

          set({
            board: newBoard,
            currentPlayer: currentPlayer === "X" ? "O" : "X",
            winner: newWinner,
            draw: newDraw,
          });

          return {
            winner: newWinner,
            draw: newDraw,
          };
        },

        resetBoard: () => {
          const { currentRound, rounds, setRobotDifficulty, mode } = get();

          if (currentRound >= rounds!) {
            alert("Game already finished");
            return;
          }

          if (mode === GameModeEnum.vBot) {
            setRobotDifficulty();
          }

          set({
            board: initialState.board,
            winner: null,
            winPattern: null,
            draw: false,
            currentRound: currentRound + 1,
          });
        },

        evaluateBoard: (board: BoardType): number => {
          const { checkDraw, checkWin, robotDifficulty } = get();

          if (checkWin(board, "X", true)) {
            return -robotDifficulty!;
          } else if (checkWin(board, "O", true)) {
            return robotDifficulty!;
          } else if (checkDraw(board)) {
            return 0;
          }
          return 0;
        },

        miniMax: (
          board: BoardType,
          depth: number,
          isMaximizing: boolean
        ): number => {
          const { checkDraw, evaluateBoard, miniMax, robotDifficulty } = get();
          const score = evaluateBoard(board);

          if (score === robotDifficulty!) return score - depth;
          if (score === -robotDifficulty!) return score + depth;
          if (checkDraw(board)) return 0;

          if (isMaximizing) {
            let best = -Infinity;
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                if (board[i][j] === null) {
                  board[i][j] = "O";
                  best = Math.max(best, miniMax(board, depth + 1, false));
                  board[i][j] = null;
                }
              }
            }
            return best;
          } else {
            let best = Infinity;
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                if (board[i][j] === null) {
                  board[i][j] = "X";
                  best = Math.min(best, miniMax(board, depth + 1, true));
                  board[i][j] = null;
                }
              }
            }
            return best;
          }
        },

        findBestMove: (board: BoardType): Position => {
          const { miniMax } = get();

          let bestVal = -Infinity;
          let bestMove: Position = { row: -1, col: -1 };

          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (board[i][j] === null) {
                board[i][j] = "O";
                const moveVal = miniMax(board, 0, false);
                board[i][j] = null;

                if (moveVal > bestVal) {
                  bestMove = { row: i, col: j };
                  bestVal = moveVal;
                }
              }
            }
          }
          return bestMove;
        },

        findRandomMove: (): Position | void => {
          const { board } = get();
          const availablePositions: Position[] = [];

          // Find all available positions
          board.forEach((row: any[], rowIndex: any) => {
            row.forEach((cell, colIndex) => {
              if (cell === null) {
                availablePositions.push({ row: rowIndex, col: colIndex });
              }
            });
          });

          // Choose a random available position
          if (availablePositions.length > 0) {
            const randomPosition =
              availablePositions[
                Math.floor(Math.random() * availablePositions.length)
              ];

            return randomPosition;
          }
        },

        // Function for the bot to make a move
        botMove: () => {
          const {
            makeMove,
            board,
            findBestMove,
            findRandomMove,
            robotDifficulty,
          } = get();

          const move =
            robotDifficulty === 0 ? findRandomMove() : findBestMove(board);

          return makeMove(move!);
        },
      }),
      {
        name: `${APP_ID}.tic-tac-toe:game-logic`,
      }
    )
  )
);
