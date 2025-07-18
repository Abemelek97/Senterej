import React, {useState} from "react";
import GameMenu from "./assets/Components/GameMenu";
import SenterejGameWithHighlight from "./assets/Components/SenterejGameWithHighlight";
import musicFile from "./music.mp3";


const App = () => {
  const [started, setStarted] = useState(false);
  const [timeControl, setTimeControl] = useState(300); // in seconds
  const [musicOn, setMusicOn] = useState(true);

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