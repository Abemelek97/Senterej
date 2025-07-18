// src/components/MultiplayerGame.tsx
import React, { useEffect, useState } from "react";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import { db } from "../firebase";
import { ref, onValue, set } from "firebase/database";

interface Props {
  roomId: string;
  isHost: boolean;
}

const MultiplayerGame: React.FC<Props> = ({ roomId, isHost }) => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState("start");
  const [playerColor, setPlayerColor] = useState<"w" | "b">(isHost ? "w" : "b");

  useEffect(() => {
    const gameRef = ref(db, `games/${roomId}`);
    onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      if (data?.fen) {
        setFen(data.fen);
        const updatedGame = new Chess();
        updatedGame.load(data.fen);
        setGame(updatedGame);
      }
    });
  }, [roomId]);

  const handleMove = ({ sourceSquare, targetSquare }: any) => {
    if (game.turn() !== playerColor) return;

    const newGame = new Chess(game.fen());
    const move = newGame.move({ from: sourceSquare, to: targetSquare });
    if (move) {
      set(ref(db, `games/${roomId}`), {
        fen: newGame.fen(),
        turn: newGame.turn(),
      });
    }
  };

  return (
    <div>
      <h2>Room ID: {roomId}</h2>
      <h3>You are playing as: {playerColor === "w" ? "White" : "Black"}</h3>
      <Chessboard
        position={fen}
        orientation={playerColor === "w" ? "white" : "black"}
        onDrop={handleMove}
        width={600}
      />
    </div>
  );
};

export default MultiplayerGame;
