// GameRoomManager.tsx
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface GameRoomManagerProps {
  onStartGame: (roomId: string, isHost: boolean) => void;
}

const GameRoomManager: React.FC<GameRoomManagerProps> = ({ onStartGame }) => {
  const [roomInput, setRoomInput] = useState("");

  const handleCreateRoom = () => {
    const newRoomId = uuidv4();
    onStartGame(newRoomId, true);
  };

  const handleJoinRoom = () => {
    if (roomInput.trim() !== "") {
      onStartGame(roomInput.trim(), false);
    } else {
      alert("Please enter a valid room ID.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>♟️ Multiplayer Game Setup</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleCreateRoom} style={{ padding: "10px 20px", marginRight: "10px" }}>
          Create New Room
        </button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomInput}
          onChange={(e) => setRoomInput(e.target.value)}
          style={{ padding: "8px", width: "200px" }}
        />
        <button onClick={handleJoinRoom} style={{ padding: "8px 16px", marginLeft: "10px" }}>
          Join Room
        </button>
      </div>
    </div>
  );
};

export default GameRoomManager;
