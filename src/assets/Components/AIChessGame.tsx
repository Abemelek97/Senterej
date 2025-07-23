import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";

const AIChessGame = () => {
  const [game, setGame] = useState(new Chess());

  const makeAIMove = () => {
    const possibleMoves = game.moves();
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIndex]);
    setGame(new Chess(game.fen()));
  };

  const handleMove = ({ sourceSquare, targetSquare }: any) => {
    const move = game.move({ from: sourceSquare, to: targetSquare });
    if (move) {
      setTimeout(() => {
        makeAIMove();
      }, 300);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
      <Chessboard
        position={game.fen()}
        onDrop={handleMove}
        width={600}
        orientation="white"
      />
    </div>
  );
};

export default AIChessGame;
