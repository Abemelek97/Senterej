import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { Chess, Square } from "chess.js";

const SenterejGameWithHighlights = () => {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [highlightedSquares, setHighlightedSquares] = useState<Record<string, React.CSSProperties>>({});

  const getValidMoves = (square: Square | undefined):string[] => {
    if (!square) return []; // Handle undefined case
    const moves = game.moves({ square, verbose: true }) as Array<{ to: string }>;
    return moves.map((move) => move.to);
  };

  const handleSquareClick = (square: Square| undefined) => {
    if (!square) return; // Exit early if square is undefined
    if (selectedSquare && highlightedSquares[square]) {
      const newGame = new Chess(game.fen());
      newGame.move({ from: selectedSquare, to: square });
      setGame(newGame);
      setSelectedSquare(null);
      setHighlightedSquares({});
    } else {
      const validMoves = getValidMoves(square);
      const newHighlightedSquares: Record<string, React.CSSProperties> = {};
      validMoves.forEach((move) => {
        newHighlightedSquares[move] = { backgroundColor: "rgba(0, 255, 0, 0.5)" };
      });
      setSelectedSquare(square);
      setHighlightedSquares(newHighlightedSquares);
    }
  };

  return (
    <div>
      <h1>Chess Game with Move Highlighting</h1>
      <Chessboard

        position={game.fen()}
        onSquareClick={handleSquareClick}
        squareStyles={highlightedSquares}
        width={750}
                orientation='white'
                boardStyle={{
                    borderRadius: "12px",
                    border: "3px solid #0000ff",
                    boxShadow: `0 6px 15px rgba(0,0,0,0.4)`
                }}
                lightSquareStyle={{
                    backgroundColor: "#ff0000",
                    boxShadow: "inset 0 0 8px #0000ff"
                }}
                darkSquareStyle={{
                    backgroundColor: "#ff0000",
                    boxShadow: "inset 0 0 8px #0000ff"
                }}
                onDrop = {({sourceSquare, targetSquare}) =>
                    ({from: sourceSquare, to: targetSquare})
                }
        
      />
    </div>
  );
};

export default SenterejGameWithHighlights;
