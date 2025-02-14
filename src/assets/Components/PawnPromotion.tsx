import React from "react";

interface PawnPromotionProps {
    onSelect: (piece: string) => void;
  }
  
  const PawnPromotion: React.FC<PawnPromotionProps> = ({ onSelect }) => {
    return (
      <div className="promotion-modal">
        <h3>Choose a piece for promotion</h3>
        <button onClick={() => onSelect("q")}>Queen</button>
        <button onClick={() => onSelect("r")}>Rook</button>
        <button onClick={() => onSelect("b")}>Bishop</button>
        <button onClick={() => onSelect("n")}>Knight</button>
      </div>
    );
  };
  
  export default PawnPromotion;