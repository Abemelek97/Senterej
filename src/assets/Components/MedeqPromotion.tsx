import React from "react";
import { Chess, Square } from "chess.js";

interface Props {
  promotionMove: { from: Square; to: Square } | null;
  game: Chess;
  setGame: React.Dispatch<React.SetStateAction<Chess>>;
  setPromotionMove: React.Dispatch<React.SetStateAction<{ from: Square; to: Square } | null>>;
  onPromote?: (piece: "q" | "r" | "b" | "n") => void;
}

const PawnPromotion: React.FC<Props> = ({ promotionMove, game, setGame, onPromote }) => {
  if (!promotionMove) return null;

  const promote = (piece: "q" | "r" | "b" | "n") => {
    const g = new Chess(game.fen());
    g.move({ from: promotionMove.from, to: promotionMove.to, promotion: piece });
    setGame(g);
    if (onPromote) onPromote(piece); // ✅ call parent callback
  };

 return (
    <div className="promotion-ui">
      <button onClick={() => promote("q")}>♕</button>
      <button onClick={() => promote("r")}>♖</button>
      <button onClick={() => promote("b")}>♗</button>
      <button onClick={() => promote("n")}>♘</button>
    </div>
  );
};
    
export default PawnPromotion;
