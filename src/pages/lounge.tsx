import React, { useLayoutEffect } from "react";
import Layout from "../components/layout";
import { GameDifficulty, GameModeEnum } from "../models/types";
import { useNavigate } from "react-router-dom";
import { gameRounds } from "../utils/helpers";
import { useGameLogic } from "../hooks/useGameLogic";

interface LoungeProps {}

const Lounge: React.FC<LoungeProps> = () => {
  const {
    setPage,
    setGameMode,
    setGameRounds,
    setGameDifficulty,
    setPlayer1,
    setPlayer2,
    newGame,
    page,
    mode,
    rounds,
    player1,
    player2,
  } = useGameLogic();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    setPage("new");
  }, [setPage]);

  return (
    <Layout>
      <h1 className="text-8xl font-bold mb-8 text-gray-800 dark:text-gray-200">
        Tic Tac Toe
      </h1>

      {/* Start New Game Screen */}
      {page === "new" ? (
        <button
          onClick={() => {
            newGame();
          }}
          className="inline-flex items-center justify-center whitespace-nowrap text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-emerald-500 bg-emerald-500 rounded-xl py-4 px-3 text-gray-800 dark:text-gray-200"
        >
          Start New Game {"!!!"}
        </button>
      ) : (
        <></>
      )}

      {/* Game Mode Screen */}
      {page === "mode" ? (
        <div className="mt-10 flex flex-col items-center gap-10">
          <h3 className="font-bold px-2 text-gray-800 dark:text-gray-200">
            Select Game Mode!
          </h3>

          <div className="flex items-center gap-4">
            <button
              title={GameModeEnum.vBot}
              onClick={() => setGameMode(GameModeEnum.vBot)}
              className={`inline-flex items-center justify-center whitespace-nowrap text-2xl font-medium transition-colors focus-visible:outline-none focus:border-emerald-500 ${
                mode === GameModeEnum.vBot && "border-emerald-500"
              } disabled:pointer-events-none disabled:opacity-50 border hover:border-emerald-500 w-40 h-9 rounded-md p-5 text-gray-800 dark:text-gray-200`}
            >
              👨 vs 🤖
            </button>
            <button
              title={GameModeEnum.vHuman}
              onClick={() => setGameMode(GameModeEnum.vHuman)}
              className={`inline-flex items-center justify-center whitespace-nowrap text-2xl font-medium transition-colors focus-visible:outline-none focus:border-emerald-500 ${
                mode === GameModeEnum.vBot && "border-emerald-500"
              } disabled:pointer-events-none disabled:opacity-50 border hover:border-emerald-500 w-40 h-9 rounded-md p-5 text-gray-800 dark:text-gray-200`}
            >
              👨 vs 👨
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* Robot Difficulty Level Screen */}
      {page === "difficulty" ? (
        <div className="mt-10 flex flex-col items-center gap-10">
          <h3 className="font-bold px-2 text-gray-800 dark:text-gray-200">
            Select Robot Difficulty!
          </h3>

          <div className="flex items-center gap-4">
            {Object.values(GameDifficulty).map((level, index) => (
              <button
                key={index}
                title={`Level ${level}`}
                onClick={() => setGameDifficulty(level)}
                className={`inline-flex items-center justify-center whitespace-nowrap text-2xl font-medium transition-colors focus-visible:outline-none focus:border-emerald-500 disabled:pointer-events-none disabled:opacity-50 border hover:border-emerald-500 w-40 h-9 rounded-md p-5 text-gray-800 dark:text-gray-200`}
              >
                {level.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* Game Rounds Screen */}
      {page === "rounds" ? (
        <div className="mt-10 flex flex-col items-center gap-10">
          <h3 className="font-bold px-2 text-gray-800 dark:text-gray-200">
            Select Game Rounds!
          </h3>

          <div className="flex items-center gap-4">
            {gameRounds.map((round, index) => (
              <button
                key={index}
                title={`${round} rounds`}
                onClick={() => setGameRounds(round)}
                className={`inline-flex items-center justify-center whitespace-nowrap text-2xl font-medium transition-colors focus-visible:outline-none focus:border-emerald-500 disabled:pointer-events-none disabled:opacity-50 border hover:border-emerald-500 w-40 h-9 rounded-md p-5 text-gray-800 dark:text-gray-200`}
              >
                {round} rounds
              </button>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* Game Players Screen */}
      {page === "names" ? (
        <div className="mt-10 flex flex-col items-center gap-10">
          <h3 className="font-bold px-2 text-gray-800 dark:text-gray-200">
            Enter Your Name
          </h3>

          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <input
                type="text"
                id="player1"
                onKeyUp={(e) => setPlayer1(e.currentTarget.value)}
                placeholder="Player 1"
                defaultValue={player1}
                className="inline-flex items-center justify-center whitespace-nowrap text-2xl transition-colors focus-visible:outline-none active:border-emerald-500 focus:border-emerald-500 disabled:pointer-events-none disabled:opacity-50 border w-40 h-9 rounded-md p-5 text-gray-800 uppercase"
              />
            </div>

            <span className="font-bold text-gray-800 dark:text-gray-200">
              vs
            </span>

            <div className="flex flex-col">
              <input
                type="text"
                id="player2"
                readOnly={mode === GameModeEnum.vBot}
                onKeyUp={(e) => setPlayer2(e.currentTarget.value)}
                placeholder={mode === GameModeEnum.vBot ? "Robot" : "Player 2"}
                defaultValue={player2}
                className="inline-flex items-center justify-center whitespace-nowrap text-2xl transition-colors focus-visible:outline-none active:border-emerald-500 focus:border-emerald-500 disabled:pointer-events-none disabled:opacity-50 border w-40 h-9 rounded-md p-5 text-gray-800 uppercase"
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* Action section */}
      <div
        className={`mt-8 flex items-center gap-4 ${
          mode === null ? "invisible" : "visible"
        }`}
      >
        <button
          onClick={() => {
            newGame();
          }}
          disabled={mode === null}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:border-emerald-500 w-40 h-9 rounded-md px-3 text-gray-800 dark:text-gray-200"
        >
          Restart
        </button>

        <button
          onClick={() => navigate("/game")}
          disabled={
            mode === null ||
            rounds === null ||
            player1.trim() === "" ||
            player2.trim() === ""
          }
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-emerald-500 bg-emerald-500 w-40 h-9 rounded-md px-3 text-gray-800 dark:text-gray-200"
        >
          Start Game {">>>"}
        </button>
      </div>
    </Layout>
  );
};

export default Lounge;
