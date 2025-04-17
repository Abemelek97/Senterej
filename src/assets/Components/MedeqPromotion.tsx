import React from "react";
import { Chess, Square } from "chess.js";

interface Props {
  promotionMove: { from: Square; to: Square } | null;
  game: Chess;
  setGame: React.Dispatch<React.SetStateAction<Chess>>;
  setPromotionMove: React.Dispatch<React.SetStateAction<{ from: Square; to: Square } | null>>;
}

const PawnPromotion: React.FC<Props> = ({ promotionMove, game, setGame, setPromotionMove }) => {
  if (!promotionMove) return null;

  const promote = () => {
    const gameCopy = new Chess(game.fen());
    gameCopy.move({
      from: promotionMove.from,
      to: promotionMove.to,
      promotion: "q", // Always promote to Queen
    });

    setGame(new Chess(gameCopy.fen()));
    setPromotionMove(null);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "30%",
        left: "35%",
        background: "#fff",
        border: "2px solid black",
        borderRadius: "8px",
        padding: "20px",
        zIndex: 100,
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>Promote your pawn to Queen 👑</h3>
      <button
        onClick={promote}
        style={{
          background: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Promote
      </button>
    </div>
  );
};

export default PawnPromotion;
