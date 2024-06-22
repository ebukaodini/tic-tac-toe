import React from "react";
import { useGameLogic } from "../hooks/useGameLogic";

interface CellProps {
  row: number;
  col: number;
}

const Cell: React.FC<CellProps> = ({ row, col }) => {
  const { board, makeMove, isBot, currentPlayer } = useGameLogic();
  const handleClick = () => {
    // handle disabled
    if (isBot === true && currentPlayer === "O") return;

    makeMove({ row, col });
  };

  return (
    <div
      onClick={handleClick}
      className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-4xl font-bold text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-pointer"
    >
      {board[row][col]}
    </div>
  );
};

export default Cell;
