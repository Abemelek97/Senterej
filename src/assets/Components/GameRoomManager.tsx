// GameRoomManager.tsx
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {ref, set} from "firebase/database";
import { db } from "../../firebase"; // Adjust the import based on your project structure

interface GameRoomManagerProps {
  onStartGame: (roomId: string, isHost: boolean) => void;
}

const GameRoomManager: React.FC<GameRoomManagerProps> = ({ onStartGame }) => {
  const [roomInput, setRoomInput] = useState("");

const createRoom = async () => {
    const id = uuidv4().slice(0, 8);
    await set(ref(db, `games/${id}`), {
      fen: "start",
      turn: "w",
      createdAt: Date.now(),
    });
    onStartGame(id, true);
  };
  const joinRoom = () => {
    if (!roomInput.trim()) return alert("Enter a room ID");
    onStartGame(roomInput.trim(), false);
  };
  /*const handleCreateRoom = () => {
    const newRoomId = uuidv4();
    onStartGame(newRoomId, true);
  };

  const handleJoinRoom = () => {
    if (roomInput.trim() !== "") {
      onStartGame(roomInput.trim(), false);
    } else {
      alert("Please enter a valid room ID.");
    }
  };8*/

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>♟️ ለ 2 መጫወቻ ማስተካካያ</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={createRoom} style={{ padding: "10px 20px", marginRight: "10px" }}>
          መጫወቻ ክፍል ፍጠር
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="የ መጫወቻ ክፍል ኮድ አስገባ"
          value={roomInput}
          onChange={(e) => setRoomInput(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        />
        <button onClick={joinRoom} style={{ padding: "8px 16px", marginLeft: "10px" }}>
          መጫወቻ ክፍል ተቀላቅል
        </button>
      </div>
    </div>
  );
};

export default GameRoomManager;
