import { useEffect, useRef, useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
import Time from "./Time";

const miliseconds = 60 * 1000;

function App() {
  const timeRef = useRef();
  const [timeDown, setTimeDown] = useState(25 * miliseconds);
  const [timeBreak, setTimeBreak] = useState(5 * miliseconds);
const [completed, setCompleted] = useState(false);
const [label, setLabel] = useState("Session");


  const audioRef = useRef();

  const onPaused = () => {
    console.log(timeRef)
    if (timeRef.current.status) {
      timeRef.current.onStopped();
    } else {
      timeRef.current.onStarted();
    }
  };

  const onStarted = () => {
    setTimeDown(25 * miliseconds);
    setTimeBreak(5 * miliseconds);
    timeRef.current.onReset();
  };

  const changeTime = (value) => {
    if(timeRef.current.status) return
    setTimeDown(timeDown + value);
  };

  const changeTimebRreak = (value) => {
     if (timeRef.current.status) return;
    setTimeBreak(timeBreak + value);
  };

  useEffect(() => {
    if(completed){
      audioRef.current.play()
    }
  }, [completed]);

  return (
    <div className="App">
      <div className="container">
        <h1>25 + 5 Clock</h1>
        <section className="grid">
          <div>
            <h2 id="break-label">Break Length</h2>
            <div className="break-length-child">
              <span
                id="break-decrement"
                onClick={() => {
                  if (timeBreak > 1 * miliseconds) {
                    changeTimebRreak(-1 * miliseconds);
                  }
                }}
              >
                {/* <i class="far fa-arrow-alt-circle-down fa-2x"></i> */}
                Down
              </span>
              <div id="break-length">{timeBreak / miliseconds}</div>
              <span
                id="break-increment"
                onClick={() => {
                  if (timeBreak < 60 * miliseconds) {
                    changeTimebRreak(+1 * miliseconds);
                  }
                }}
              >
                {/* <i class="	far fa-arrow-alt-circle-up fa-2x"></i> */}
                Up
              </span>
            </div>
          </div>
          <div>
            <h2 id="session-label"> Session Length</h2>
            <div className="session-length-child">
              <span
                id="session-decrement"
                onClick={() => {
                  if (timeDown > 1 * miliseconds) {
                    changeTime(-1 * miliseconds);
                  }
                }}
              >
                {/* <i class="far fa-arrow-alt-circle-down fa-2x"></i> */}Down

              </span>
              <span id="session-length">{timeDown / miliseconds}</span>
              <span
                id="session-increment"
                onClick={() => {
                  if (timeDown < 60 * miliseconds) {
                    changeTime(1 * miliseconds);
                  }
                }}
              >
                {/* <i class="	far fa-arrow-alt-circle-up fa-2x"></i> */}
                Up
              </span>
            </div>
          </div>
        </section>
        <section>
          <div className="time-down">
            <h1 id="timer-label">{label}</h1>
            <Time
              setLabel={setLabel}
              completed={completed}
              setCompleted={setCompleted}
              ref={timeRef}
              time={!completed ? timeDown : timeBreak}
            />
          </div>
        </section>
        <section className="flex-action">
          <span id="start_stop" onClick={onPaused}>
            Play/Pause
            {/* <i class="far fa-play-circle fa-lg"></i>
            <i class="	fas fa-pause fa-lg"></i> */}
          </span>

          <span id="reset" onClick={onStarted}>
            {/* <i class="	fas fa-sync-alt fa-lg"></i> */}
            Reset
          </span>
        </section>
        <section className="flex">
          <p>Designed and Coded by</p>
          <a href="#d">Peter Weinberg</a>
        </section>
      </div>
      <audio
        id="beep"
        ref={audioRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </div>
  );
}

export default App;
