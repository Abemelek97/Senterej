import React, { useEffect, useState, useRef } from "react";

interface Props {
  currentTurn: "w" | "b";
  gameOver: boolean;
}

const ChessTimer: React.FC<Props> = ({ currentTurn, gameOver }) => {
  const [whiteTime, setWhiteTime] = useState(300); // 5 mins
  const [blackTime, setBlackTime] = useState(300); // 5 mins

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);


  // Countdown timer based on turn
  useEffect(() => {
    if (gameOver) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      if (currentTurn === "w") {
        setWhiteTime((prev) => Math.max(prev - 1, 0));
      } else {
        setBlackTime((prev) => Math.max(prev - 1, 0));
      }
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [currentTurn, gameOver]);

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const sec = (time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", width: "400px", marginBottom: "10px" }}>
      <div style={{ fontWeight: currentTurn === "w" ? "bold" : "normal", color: "black" }}>
        White ⏱ {formatTime(whiteTime)}
      </div>
      <div style={{ fontWeight: currentTurn === "b" ? "bold" : "normal", color: "black" }}>
        Black ⏱ {formatTime(blackTime)}
      </div>
    </div>
  );
};

export default ChessTimer;
