import React, { useState } from "react";

interface GameMenuProps {
    onStart: (timeControl: number, musicOn: boolean, mode: "multiplayer" | "ai" | "local") => void;
}


const GameMenu: React.FC<GameMenuProps> = ({ onStart }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [timeControl, setTimeControl] = useState(300); // default 5 min
  const [musicOn, setMusicOn] = useState(true);
  const [mode, setMode] = useState<"multiplayer" | "ai" | "local">("local");

  return (
    
    <div style={{ textAlign: "center", marginTop: "80px", padding: "20px" }}>
      <h1>♟️ Senterej Chess Game ♟️</h1>

      {/* Instructions Toggle */}
      <div style={{ margin: "20px 0" }}>
        <button onClick={() => setShowInstructions((prev) => !prev)}>
          {showInstructions ? "Hide Instructions" : "Show Instructions"}
        </button>
        {showInstructions && (
          <div style={{ textAlign: "left", maxWidth: 600, margin: "20px auto" }}>
            <h3>📜 Game Instructions</h3>
            <ul>
              <li>This is a Senterej-style chess game.</li>
              <li>You can move any piece at the start (simultaneous deployment).</li>
              <li>Pawns promote upon reaching the 8th/1st rank.</li>
              <li>The timer starts after the first move.</li>
              <li>The player who runs out of time loses.</li>
            </ul>
          </div>
          
        )}
      </div>

      {/* Time Control */}
      <div style={{ margin: "20px 0" }}>
        <h3>⏱ Select Time Control:</h3>
        <select
          value={timeControl}
          onChange={(e) => setTimeControl(Number(e.target.value))}
        >
          <option value={180}>3 Minutes</option>
          <option value={300}>5 Minutes</option>
          <option value={600}>10 Minutes</option>
        </select>
      </div>

      {/* Background Music */}
      <div style={{ margin: "20px 0" }}>
        <label>
          <input
            type="checkbox"
            checked={musicOn}
            onChange={(e) => setMusicOn(e.target.checked)}
          />
          🎵 Enable Background Music
        </label>
      </div>
      {/* Game Mode Selector — ✅ ADD THIS HERE */}
    <div style={{ margin: "20px 0" }}>
      <label>Select Mode:</label>
      <select value={mode} onChange={(e) => setMode(e.target.value as "local" | "ai" | "multiplayer")}>
        <option value="local">2 Player (Same Device)</option>
        <option value="ai">Play with AI</option>
        <option value="multiplayer">Multiplayer</option>
      </select>
    </div>
      {/* Start Game */}
      <button
        style={{
          fontSize: "18px",
          padding: "10px 30px",
          borderRadius: "8px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginTop: "20px"
        }}
        onClick={() => onStart(timeControl, musicOn, mode)}
      >
        Start Game
      </button>
    </div>
    
  );
  
};

export default GameMenu;
