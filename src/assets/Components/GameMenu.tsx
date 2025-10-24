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
      <h1>♟️ ሰንጠረዥ ♟️</h1>

      {/* Instructions Toggle */}
      <div style={{ margin: "20px 0" }}>
        <button onClick={() => setShowInstructions((prev) => !prev)}>
          {showInstructions ? "አጥፋ መርህ" : "መርህ አሳይ"}
        </button>
        {showInstructions && (
          <div style={{ textAlign: "left", maxWidth: 600, margin: "20px auto" }}>
            <h3>📜 የ አጨዋወት መርህ</h3>
            <ul>
              <li>እንቅስቃሴውች እና ጦርነቱ</li>
              <li>ንጉስ፡ በዘመናዊ ቼዝ ውስጥ እንደ ንጉስ ሆኖ ግን ከመሃል ይጀምራል</li>
              <li>ፈርዝ፡ አንድ ካሬ በሰያፍ ይንቀሳቀሳል</li>
              <li>ደር፡ በአግድም (በጎን) ወይም በአቀባዊ (ወደላይ እና ወደታች) ቀጥታ መስመር ይንቀሳቀሳል</li>
              <li>ፈረስ፡ ሁለት ካሬዎች በአንድ አቅጣጫ (በአግድም ወይም በአቀባዊ) እና ከዚያ ወደዚያ አቅጣጫ አንድ ካሬ </li>
              <li>ሳባ፡ በሰያፍ መንገድ ይንቀሳቀሳል፣ ግን የመነሻ ነጥቡን ጨምሮ ሶስት ካሬዎችን ብቻ መሸፈን ይችላል።</li>
              <li>መደቅ፡ አንድ ካሬ በአንድ ጊዜ ወደፊት ያንቀሳቅሳል፣ ያለ መጀመሪያው ባለ ሁለት ካሬ አማራጭ</li>
              <li>ሰንጠረዥ ከመጀመሪያው "ገደላ" በፊት ተጨዋቾች መጫወቻቸውን በአንድ ጊዜ እና በፈለጉት መጠን ማንቀሳቀስ የሚችሉበት የወረራ ቅስቀሳ ምዕራፍ የሚባል ልዩ ምዕራፍ ያሳያል። ይህ ደረጃ በመጀመሪያው ገደላ ያበቃል፣ ከዚያ በኋላ ጨዋታው እንደ ዘመናዊ ቼዝ እየተፈራረቁ ይቀጥላል።</li>
            </ul>
          </div>
          
        )}
      </div>

      {/* Time Control */}
      <div style={{ margin: "20px 0" }}>
        <h3>⏱ ሰዓት መምረጥ:</h3>
        <select
          value={timeControl}
          onChange={(e) => setTimeControl(Number(e.target.value))}
        >
          <option value={180}>3 ደቂቃ</option>
          <option value={300}>5 ደቂቃ</option>
          <option value={600}>10 ደቂቃ</option>
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
          🎵 ማጀቢያ ሙዚቃ
        </label>
      </div>
      {/* Game Mode Selector — ✅ ADD THIS HERE */}
    <div style={{ margin: "20px 0" }}>
      <label>የ ጨዋታ ስልት:&nbsp;</label>
      <select value={mode} onChange={(e) => setMode(e.target.value as "local" | "ai" | "multiplayer")}>
        <option value="local">ለ 2 በዚው መጫወጫ </option>
        <option value="ai">ከ ኮምፒውተር ጋር</option>
        <option value="multiplayer">ለ 2 ተጫዋቾች</option>
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
        ጀምር
      </button>
    </div>
    
  );
  
};

export default GameMenu;
