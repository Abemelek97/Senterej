import SenterejGameWithHighlight from './SenterejGameWithHighlight';
import{Chess} from 'chess.js';
import React, { useState } from 'react';
import PawnPromotion from './PawnPromotion';
import SenterejBoard from './SenterejBoard';

const SenterejGame: React.FC = () => {
  const [game, setGame] = useState<Chess>(new Chess());
    const [promotionMove, setPromotionMove] = useState<{from: string; to: string} | null>(null);

  const handleMove = (from: string, to: string) => {
    const gameCopy = new Chess(game.fen()); // Create a copy of the game state
    // Check if the moving piece is a pawn and it reached the last rank
    const move = gameCopy.move({
      from,
      to,
      promotion: "q", // Default promotion to queen
    });
  
    if (move) {
      if(move.piece === "p" && (to[1] === "8" || to[1] === "1")){
        setPromotionMove({from, to});
      }
      else{
      setGame(gameCopy);
      }
    }
  };
  const handlePromotion = (piece: string) => {
    if(!promotionMove)return
    const gameCopy = new Chess(game.fen());
    gameCopy.move({
      from: promotionMove.from,
      to: promotionMove.to,
      promotion: piece,
    })
    setGame(gameCopy);
    setPromotionMove(null);
  }

  return(
        <div>
            <h1>ሰንጠረዥ</h1>
            <SenterejBoard position={game.fen()} onMove={handleMove}/>

          <SenterejGameWithHighlight/>   
          {promotionMove && <PawnPromotion onSelect={handlePromotion} />}       
          </div>
   )
};
export default SenterejGame;