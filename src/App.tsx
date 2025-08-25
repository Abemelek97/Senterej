import React, {useState} from "react";
import GameMenu from "./assets/Components/GameMenu";
import SenterejGameWithHighlight from "./assets/Components/SenterejGameWithHighlight";
import musicFile from "./music.mp3";
import GameRoomManager from "./assets/Components/GameRoomManager";
import MultiplayerGame from "./assets/Components/MultiplayerGame";
import AIChessGame from "./assets/Components/AIChessGame";


const App = () => {
  const [started, setStarted] = useState(false);
  const [timeControl, setTimeControl] = useState(300); // in seconds
  const [musicOn, setMusicOn] = useState(true);
  const [mode, setMode] = useState<"local" | "ai" | "multiplayer" | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isHost, setIsHost] = useState<boolean>(false);
  
  if (!mode) {
    return (
      <GameMenu
        onStart={(time, _music, selectedMode) => {
          setTimeControl(time);
          setMode(selectedMode);
        }}
      />
    );
  }
  if (mode === "multiplayer" && !roomId) {
    return (
      <GameRoomManager
        onStartGame={(id, host) => {
          setRoomId(id);
          setIsHost(host);
        }}
      />
    );
  }
   if (mode === "multiplayer" && roomId) {
    return <MultiplayerGame roomId={roomId} isHost={isHost} timeLimit={timeControl} />;
  }

  if (mode === "ai") {
    // Human plays White by default. You can extend later to choose color.
    return <AIChessGame timeLimit={timeControl} humanColor="w" />;
  }
  return <SenterejGameWithHighlight timeLimit={timeControl} />;

  
  // Play music if enabled
  React.useEffect(() => {
    if (started && musicOn) {
      const audio = new Audio(musicFile);
      audio.loop = true;
      audio.play().catch(() => {});
      return () => audio.pause();
    }
  }, [started, musicOn]);

  return (
    <div>
      {!started ? (
        <GameMenu
          onStart={(selectedTime, enableMusic) => {
            setTimeControl(selectedTime);
            setMusicOn(enableMusic);
            setStarted(true);
          }}
        />
      ) : (
        <SenterejGameWithHighlight timeLimit={timeControl} />
      )}
    </div>
  );
};

export default App;