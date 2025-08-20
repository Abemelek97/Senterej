// MultiplayerGame.tsx

import React, { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { ref, onValue, set } from "firebase/database";
import { db } from "../../firebase"; // Adjust the import based on your project structure
import SenterejGameWithHighlight from "./SenterejGameWithHighlight";

interface Props {
  roomId: string;
  isHost: boolean;
  timeLimit: number;
}

const MultiplayerGame: React.FC<Props> = ({ roomId, isHost, timeLimit }) => {
   const [fen, setFen] = useState<string>("start");
   const playerColor: "w" | "b" = isHost ? "w" : "b";

  // Listen for moves
  useEffect(() => {
    const gameRef = ref(db, `games/${roomId}`);
    const unsub = onValue(gameRef, (snap) => {
      const data = snap.val();
      if (data?.fen) setFen(data.fen);
    });
    return () => unsub();
  }, [roomId]);
    
const onExternalMove = async (from: string, to: string) => {
    const g = new Chess(fen === "start" ? undefined : fen);
    const piece = g.get(from as any);
    const needPromo = piece?.type === "p" && (to[1] === "1" || to[1] === "8");
    const mv = g.move(needPromo ? { from, to, promotion: "q" } : { from, to });
    if (!mv) return;

    await set(ref(db, `games/${roomId}`), {
      fen: g.fen(),
      turn: g.turn(),
      lastMove: { from, to, by: playerColor, at: Date.now() },
    });
  };

  return (
    <div style = {{padding: 12}}>
    <h3>Room: {roomId} — You are {playerColor === "w" ? "White" : "Black"}</h3>

      <SenterejGameWithHighlight
        externalFen={fen}
        onExternalMove={onExternalMove}
        playerColor={playerColor}
        timeLimit={timeLimit}
      />
    </div>
  );
};

export default MultiplayerGame;
