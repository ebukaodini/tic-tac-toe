import React from "react";
import Layout from "../components/layout";
import { useGameLogic, useGameWorker } from "../hooks/useGameLogic";
import Cell from "../components/cell";
import { useNavigate } from "react-router-dom";

interface BoardProps {}

const Board: React.FC<BoardProps> = () => {
  const {
    resetBoard,
    newGame,
    player1,
    player2,
    score,
    board,
    winner,
    winPattern,
    draw,
    currentPlayer,
    rounds,
    currentRound,
    mode,
  } = useGameLogic();
  useGameWorker();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="mb-8 flex flex-col gap-4 items-center">
        <h1 className="text-8xl font-bold  text-gray-800 dark:text-gray-200">
          Round {currentRound} of {rounds}
        </h1>
        {
          // Show scoreboard when there's
          // still more rounds to play
          !((winner !== null || draw === true) && currentRound === rounds!) ? (
            <h1 className="my-8 text-4xl grid grid-cols-3 gap-4 px-2 text-gray-800 dark:text-gray-200">
              <span className="text-emerald-500 text-6xl font-bold">
                {player1}
              </span>
              <span className="font-bold text-center">
                {score.player1}
                <span className="mx-5">vs</span>
                {score.player2}
              </span>
              <span className="text-emerald-500 text-6xl font-bold">
                {player2}
              </span>
            </h1>
          ) : (
            <>
              <h1 className="my-8 text-4xl flex justify-center gap-4 px-2 text-gray-800 dark:text-gray-200">
                <span className="text-emerald-500 text-6xl font-bold">
                  {score.player1 > score.player2
                    ? `${player1} WINS ${
                        score.player1 + "-" + score.player2
                      }!!!`
                    : ""}
                </span>

                <span className="text-emerald-500 text-6xl font-bold">
                  {score.player2 > score.player1
                    ? `${player2} WINS ${
                        score.player2 + "-" + score.player1
                      }!!!`
                    : ""}
                </span>

                <span className="text-emerald-500 text-6xl font-bold">
                  {score.player1 === score.player2
                    ? `IT'S A DRAW ${score.player1 + "-" + score.player2}!!!`
                    : ""}
                </span>
              </h1>
            </>
          )
        }
      </div>

      {/* ${winPattern !== null ? "hidden" : ""} */}
      <div className="w-max relative">
        <div
          className={`h-2 rounded-full bg-orange-400 absolute 
           ${
             winPattern === "R1"
               ? "w-[78%] top-[19.5%] left-[10.75%] rotate-0"
               : ""
           } 
           ${
             winPattern === "R2"
               ? "w-[78%] top-[48.75%] left-[10.75%] rotate-0"
               : ""
           }
           ${
             winPattern === "R3"
               ? "w-[78%] bottom-[19%] left-[10.75%] rotate-0"
               : ""
           }
           ${
             winPattern === "C1"
               ? "w-[78%] top-[48.75%] -left-[18.40%] rotate-90"
               : ""
           } 
           ${
             winPattern === "C2"
               ? "w-[78%] top-[48.75%] left-[10.85%] rotate-90"
               : ""
           }
           ${
             winPattern === "C3"
               ? "w-[78%] top-[48.75%] left-[40.5%] rotate-90"
               : ""
           }
           ${winPattern === "D1" ? "w-full top-[48.75%] rotate-45" : ""} 
           ${winPattern === "D2" ? "w-full top-[48.75%] -rotate-45" : ""}
          `}
        />
        <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
          {board.map((row: any, rowIndex: number) => (
            <>
              {row.map((_col: number, colIndex: number) => (
                <Cell
                  col={colIndex}
                  row={rowIndex}
                  key={`${rowIndex}${colIndex}`}
                />
              ))}
            </>
          ))}
        </div>
      </div>

      <div className="w-40 mt-8 flex flex-col items-center gap-4">
        <div className="text-gray-800 dark:text-gray-200">
          {winner ? (
            <p className="font-bold">
              <span>{winner === "X" ? player1 : player2}</span>
              <span> Wins!!!</span>
            </p>
          ) : draw ? (
            <p>It's a draw!</p>
          ) : (
            <p className="font-bold">
              <span>{currentPlayer === "X" ? player1 : player2} </span>
              <span>is Next!</span>
            </p>
          )}
        </div>

        <div
          className={`mt-8 flex items-center gap-4 ${
            mode !== null && (player1 !== "" || player2 !== "")
              ? "visible"
              : "invisible"
          }`}
        >
          <button
            onClick={() => {
              newGame();
              navigate("/");
            }}
            disabled={
              // Disable btn when there's
              // No winner AND no draw
              // AND there's still more rounds to play
              !((winner !== null || draw === true) && currentRound === rounds!)
            }
            className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border ${
              // show primary color when there's
              // A winner OR a draw
              // AND all rounds are complete
              (winner !== null || draw === true) && currentRound === rounds!
                ? "border-emerald-500"
                : "border-white"
            } bg-background hover:bg-accent hover:text-accent-foreground w-full h-9 rounded-md px-3 text-gray-800 dark:text-gray-200`}
          >
            New Game
          </button>

          <button
            onClick={() => resetBoard()}
            disabled={
              // Disable the btn when there's
              // No winner AND no draw
              // OR when all rounds are complete
              (winner === null && draw === false) || currentRound === rounds!
            }
            className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border ${
              // Show primary color when there's
              // A winner OR a draw
              // AND there's still more rounds to play
              (winner !== null || draw === true) && currentRound < rounds!
                ? "border-emerald-500 "
                : "border-white"
            } bg-background hover:bg-accent hover:text-accent-foreground w-full h-9 rounded-md px-3 text-gray-800 dark:text-gray-200`}
          >
            Play Again!
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Board;
