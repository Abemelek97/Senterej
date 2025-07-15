import React, { useEffect, useState, useRef } from "react";

interface Props {
  currentTurn: "w" | "b";
  gameOver: boolean;
  onTimeout: (color: "w" | "b") => void;
  gameStarted: boolean;
}

const ChessTimer: React.FC<Props> = ({ currentTurn, gameOver, onTimeout, gameStarted }) => {
  const [whiteTime, setWhiteTime] = useState(300); // 5 mins
  const [blackTime, setBlackTime] = useState(300); // 5 mins
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);



 


  // Countdown timer based on turn
  useEffect(() => {
    if (gameOver || !gameStarted) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      if (currentTurn === "w") {
        setWhiteTime((prev) => {if(prev <= 1){
          clearInterval(timerRef.current!);
                      onTimeout("w");
                      return 0;
        }
        return prev - 1;
      });
      } else {
        setBlackTime((prev) => {if(prev <= 1){
            clearInterval(timerRef.current!);
                      onTimeout("b");
                      return 0;
        }
        return prev - 1;
      });
      }
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [currentTurn, gameOver, gameStarted]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", width: "400px", fontSize: 18, marginBottom: "10px" }}>
      <span style={{ color: whiteTime <= 10 ? "red" : "black", fontWeight: currentTurn === "w" ? "bold" : "normal"
    }}>
      ነጭ {formatTime(whiteTime)}</span>
      <span style={{color: blackTime <= 10 ? "red" : "black", fontWeight: currentTurn === "b" ? "bold" : "normal"
    }}>
      ጥቁር {formatTime(blackTime)}
    </span>
    </div>
  );
};

export default ChessTimer;
