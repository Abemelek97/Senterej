// MultiplayerGame.tsx
/*
import React, { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { ref, onValue, set } from "firebase/database";
//import { database } from "firebase.ts"; // ✅ Make sure you have this
import SenterejGameWithHighlight from "./SenterejGameWithHighlight";

interface MultiplayerGameProps {
  roomId: string;
  isHost: boolean;
  timeLimit: number;
}

const MultiplayerGame: React.FC<MultiplayerGameProps> = ({ roomId, isHost, timeLimit }) => {
  const [game, setGame] = useState(new Chess());
  const [playerColor, setPlayerColor] = useState<"w" | "b">(isHost ? "w" : "b");

  // Listen for moves
  useEffect(() => {
    const gameRef = ref(database, `games/${roomId}`);

    const unsubscribe = onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      if (data?.fen && data.fen !== game.fen()) {
        const updatedGame = new Chess(data.fen);
        setGame(updatedGame);
      }
    });

    return () => unsubscribe();
  }, [roomId]);

  const handleMove = (from: string, to: string) => {
    const newGame = new Chess(game.fen());
    const move = newGame.move({ from, to });

    if (move) {
      setGame(newGame);
      const gameRef = ref(database, `games/${roomId}`);
      set(gameRef, { fen: newGame.fen() });
    }
  };

  return (
    <div>
      <h2>Multiplayer Mode – You are playing as {playerColor === "w" ? "White" : "Black"}</h2>

      <SenterejGameWithHighlight
        //externalGame={game}
        //onExternalMove={handleMove}
        //playerColor={playerColor}
        //timeLimit={timeLimit}
      />
    </div>
  );
};

export default MultiplayerGame;
*/