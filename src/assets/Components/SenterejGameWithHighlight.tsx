import React, { useState, useEffect } from 'react';
import { Square, Chess } from 'chess.js';
import Chessboard from 'chessboardjsx';
import CustomizedMedeqMovement from './validatingMoves';
import { motion } from 'framer-motion';
import PawnPromotion from './MedeqPromotion';
import ChessTimer from './SenterejTimer';
import customPieces from "./customPieces";

interface Props
{
  externalFen?: string;
  onExternalMove?: (from: string, to: string) => void;
  timeLimit: number;
  playerColor?: "w" | "b";
}

const SenterejGameWithHighlight: React.FC<Props> = ({
  externalFen,
  onExternalMove,
  playerColor = "w",
  timeLimit,
}) => {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [gameOverMessage, setGameOverMessage] = useState<string | null>(null);
  const [highlightedSquares, setHighlightedSquares] = useState<Record<string, React.CSSProperties>>({});
  const [capturedWhite, setCapturedWhite] = useState<string[]>([]);
  const [capturedBlack, setCapturedBlack] = useState<string[]>([]);
  const [promotionMove, setPromotionMove] = useState<{ from: Square; to: Square } | null>(null);
  const [currentTurn, setCurrentTurn] = useState<"w" | "b">("w");
  const [gameStarted, setGameStarted] = useState(false);


    // Load external FEN (Multiplayer / AI)
  useEffect(() => {
    if (externalFen === undefined) return;
    if (externalFen === "start") {
      const g = new Chess();
      setGame(g);
      setCurrentTurn(g.turn());
      setSelectedSquare(null);
      setHighlightedSquares({});
      return;
    }
    if (externalFen) {
    try {
      const g = new Chess();
      g.load(externalFen); // load without returning
      setGame(g);
    } catch (e) {
      console.error("Invalid external FEN:", e);
    }
  }
}, [externalFen]);

  const applyMoveLocally = (from: string, to: string) => {
    const g = new Chess(game.fen());

    // Custom rule legality
    const legalTargets = CustomizedMedeqMovement(g, from as Square);
    if (!legalTargets.includes(to)) return;

    const piece = g.get(from as any);
    const needPromo = piece?.type === "p" && (to[1] === "1" || to[1] === "8");

    const mv = g.move(
      onExternalMove
        ? needPromo
          ? { from, to, promotion: "q" } // realtime-safe
          : { from, to }
        : { from, to } // local: show UI if needPromo
    );
    if (!mv) return;

    if (!gameStarted) setGameStarted(true);

    if (mv.captured) {
      if (mv.color === "w") setCapturedBlack((prev) => [...prev, mv.captured!]);
      else setCapturedWhite((prev) => [...prev, mv.captured!]);
    }

    if (onExternalMove) {
      // Multiplayer/AI: only move on your turn
      if (game.turn() !== playerColor) return;
      onExternalMove(from, to);
      // optimistic update for snappy feel
      setGame(new Chess(g.fen()));
      setCurrentTurn(g.turn());
    } else {
      // Local: show promotion modal if needed
      if (needPromo) {
        setPromotionMove({ from: from as Square, to: to as Square });
        return;
      }
      setGame(new Chess(g.fen()));
      setCurrentTurn(g.turn());
    }
  };

  const onDrop = ({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string }) => {
    if (onExternalMove && game.turn() !== playerColor) return; // not your turn
    applyMoveLocally(sourceSquare, targetSquare);
    setSelectedSquare(null);
    setHighlightedSquares({});
  };

  const onSquareClick = (square: string) => {
    if (onExternalMove && game.turn() !== playerColor) return;
    if (selectedSquare) {
      applyMoveLocally(selectedSquare, square);
      setSelectedSquare(null);
      setHighlightedSquares({});
    } else {
      const validMoves = CustomizedMedeqMovement(game, square as Square);
      const styles: Record<string, React.CSSProperties> = {};
      validMoves.forEach((m) => (styles[m as Square] = { backgroundColor: "rgba(0,255,0,0.45)" }));
      setSelectedSquare(square);
      setHighlightedSquares(styles);
    }
  };

  // finalize local promotion
  const finalizePromotion = (promotion: "q" | "r" | "b" | "n") => {
    if (!promotionMove) return;
    const g = new Chess(game.fen());
    const mv = g.move({ from: promotionMove.from, to: promotionMove.to, promotion });
    if (!mv) return;
    setGame(new Chess(g.fen()));
    setCurrentTurn(g.turn());
    setPromotionMove(null);

    if (mv.captured) {
      if (mv.color === "w") setCapturedBlack((p) => [...p, mv.captured!]);
      else setCapturedWhite((p) => [...p, mv.captured!]);
    }
  };

  useEffect(() => {
    if (game.isCheckmate()) {
      setGameOverMessage(`Checkmate! ${game.turn() === "w" ? "Black" : "White"} wins`);
    } else if (game.isDraw()) {
      setGameOverMessage("Draw");
    } else {
      setGameOverMessage(null);
    }
  }, [game]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <ChessTimer
        currentTurn={currentTurn}
        gameOver={!!gameOverMessage}
        onTimeout={(c) => setGameOverMessage(`${c === "w" ? "White" : "Black"} ran out of time`)}
        gameStarted={gameStarted}
        timeLimit={timeLimit}
      />

      {/* Captured by Black (top) */}
      <div style={{ display: "flex", gap: 6, minHeight: 24 }}>
        {capturedBlack.map((p, i) => (
          <span key={i} style={{ fontSize: 20 }}>{pieceChar(p, "b")}</span>
        ))}
      </div>

      <Chessboard
        position={game.fen()}
        onDrop={(e: any) => onDrop(e)}
        onSquareClick={(sq: string) => onSquareClick(sq)}
        squareStyles={highlightedSquares}
        width={720}
        pieces={customPieces}
        orientation={playerColor === "w" ? "white" : "black"}
        boardStyle={{ borderRadius: 12, border: "3px solid #0000ff", boxShadow: "0 6px 15px rgba(0,0,0,0.4)" }}
        lightSquareStyle={{ backgroundColor: "#ff0000", boxShadow: "inset 0 0 8px #0000ff" }}
        darkSquareStyle={{ backgroundColor: "#ff0000", boxShadow: "inset 0 0 8px #0000ff" }}
      />

      {/* Captured by White (bottom) */}
      <div style={{ display: "flex", gap: 6, minHeight: 24 }}>
        {capturedWhite.map((p, i) => (
          <span key={i} style={{ fontSize: 20 }}>{pieceChar(p, "w")}</span>
        ))}
      </div>

      {/* Promotion modal only in local mode (multiplayer/AI auto-queens for sync) */}
      {!onExternalMove && (
        <PawnPromotion
          promotionMove={promotionMove}
          game={game}
          setGame={setGame}
          setPromotionMove={setPromotionMove}
          onPromote={finalizePromotion}
        />
      )}

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
            <h2 className="text-2xl font-bold text-center text-white">{gameOverMessage}</h2>
            <button onClick={() => window.location.reload()} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
              Restart
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

function pieceChar(piece: string, color: "w" | "b") {
  const map: Record<string, string> = { p: "♙", n: "♘", b: "♗", r: "♖", q: "♕", k: "♔" };
  const w = map[piece.toLowerCase()] || "?";
  return color === "w"
    ? w
    : w.replace("♙", "♟").replace("♘", "♞").replace("♗", "♝").replace("♖", "♜").replace("♕", "♛").replace("♔", "♚");
}

export default SenterejGameWithHighlight;