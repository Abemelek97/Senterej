import React, { useState, useEffect } from 'react';
import { Square, Chess } from 'chess.js';
import Chessboard from 'chessboardjsx';
import CustomizedMedeqMovement from './validatingMoves';
import { motion } from 'framer-motion';
import PawnPromotion from './MedeqPromotion';
import ChessTimer from './SenterejTimer';

interface SenterejGameWithHighlightProps
{
  timeLimit: number;
}

const SenterejGameWithHighlight: React.FC<SenterejGameWithHighlightProps> = ({timeLimit}) => {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [gameOverMessage, setGameOverMessage] = useState<string | null>(null);
  const [highlightedSquares, setHighlightedSquares] = useState<Record<string, React.CSSProperties>>({});
  const [capturedWhite, setCapturedWhite] = useState<string[]>([]);
  const [capturedBlack, setCapturedBlack] = useState<string[]>([]);
  const [promotionMove, setPromotionMove] = useState<{ from: Square; to: Square } | null>(null);
  const [currentTurn, setCurrentTurn] = useState<"w" | "b">("w");
  const [gameStarted, setGameStarted] = useState(false);

  const makeMove = (move: { from: string; to: string }) => {
    const piece = game.get(move.from as Square);
    const isPromotion = piece?.type === "p" && (move.to[1] === "8" || move.to[1] === "1")

    if(isPromotion){
      setPromotionMove({ from: move.from as Square, to: move.to as Square });
      return;
    }
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move({
      from: move.from as Square,
      to: move.to as Square,
    });
   if (result) {
      if (result.captured) {
        if (result.color === "w") {
          setCapturedBlack((prev) => [...prev, result.captured!]);
        } else {
          setCapturedWhite((prev) => [...prev, result.captured!]);
        }
      }
      setCurrentTurn(gameCopy.turn());
      setGame(new Chess(gameCopy.fen()));
    }
  };

  const handleSquareClick = (square: string) => {
    if (selectedSquare) {
      const validMoves = CustomizedMedeqMovement(game, selectedSquare as Square);

      if (validMoves.includes(square)) {
        makeMove({ from: selectedSquare, to: square });
      }

      setSelectedSquare(null);
      setHighlightedSquares({});
    } else {
      const validMoves = CustomizedMedeqMovement(game, square as Square);
      const highlightStyles: Record<string, React.CSSProperties> = {};

      validMoves.forEach((move) => {
        highlightStyles[move as Square] = { backgroundColor: "rgba(0, 255, 0, 0.5)" };
      });

      setSelectedSquare(square);
      setHighlightedSquares(highlightStyles);
    }
  };

  useEffect(() => {
    if (game.isCheckmate()) {
      setGameOverMessage(`ውጣ በቃ! ${game.turn() === "w" ? "Black" : "ነጭ"} አሸንፏል!`);
    } else if (game.isDraw()) {
      setGameOverMessage("መና ነው");
    } else {
      setGameOverMessage(null);
    }
  }, [game]);
  const onTimeout = (color: "w" | "b") => {
    setGameOverMessage(`${color === "w"? "ነጭ" : "ጥቁር"} ሰዓት አልቁዋል!`)
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "10px" }}>
    {/*Timer  */}
    <ChessTimer currentTurn={currentTurn} gameOver={!!gameOverMessage} onTimeout={onTimeout} gameStarted = {gameStarted} timeLimit={timeLimit}/>
      <h3>ነጭ የበላው</h3>
      {/* ✅ Captured Black Pieces (Top) */}
      <div style={{ display: "flex", justifyContent: "center", gap: "5px", minHeight: "40px" }}>
        {capturedBlack.map((piece, index) => (
          <span key={index} style={{ fontSize: "24px" }}>
            {getPieceUnicode(piece, "b")}
          </span>
        ))}
      </div>

      {/* Chessboard Component */}
      <Chessboard
        position={game.fen()}
        onDrop={({ sourceSquare, targetSquare }) => makeMove({ from: sourceSquare, to: targetSquare })}
        onSquareClick={handleSquareClick}
        squareStyles={highlightedSquares}
        width={750}
        orientation="white"
        boardStyle={{
          borderRadius: "12px",
          border: "3px solid #0000ff",
          boxShadow: `0 6px 15px rgba(0,0,0,0.4)`,
        }}
        lightSquareStyle={{
          backgroundColor: "#ff0000",
          boxShadow: "inset 0 0 8px #0000ff",
        }}
        darkSquareStyle={{
          backgroundColor: "#ff0000",
          boxShadow: "inset 0 0 8px #0000ff",
        }}
      />

      {/* ✅ Captured White Pieces Section */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
        <h3>ጥቁርየበላው</h3>
        <div style={{ display: "flex", gap: "5px" }}>
          {capturedWhite.map((piece, index) => (
            <span key={index} style={{ fontSize: "24px" }}>
              {getPieceUnicode(piece, "w")}
            </span>
          ))}
        </div>
        {/* Medeq Promotion UI*/}
        <PawnPromotion
          promotionMove={promotionMove}
          game={game}
          setGame={setGame}
          setPromotionMove={setPromotionMove}
        />
      </div>

      {/* ✅ Game Over Message */}
      {gameOverMessage && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-black p-6 rounded-lg shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <h2 className="text-2xl font-bold text-center">{gameOverMessage}</h2>
            <button
              onClick={() => window.location.reload()} // Restart game
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              እንደገና አስጀምር
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

// ✅ Function to Display Captured Pieces as Unicode Icons
const getPieceUnicode = (piece: string, color: "w" | "b") => {
  const pieceMap: Record<string, string> = {
    p: "♙",
    n: "♘",
    b: "♗",
    r: "♖",
    q: "♕",
    k: "♔",
  };

  return color === "w"
    ? pieceMap[piece.toLowerCase()] || "?"
    : pieceMap[piece.toLowerCase()].replace("♙", "♟").replace("♘", "♞").replace("♗", "♝").replace("♖", "♜").replace("♕", "♛").replace("♔", "♚");
};

export default SenterejGameWithHighlight;
