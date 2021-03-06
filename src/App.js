import React, { useState, useRef } from "react";

export default function App() {
  const [timer, setTimer] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [textTimer, setTextTimer] = useState([]);
  const [isLapClicked, setIsLapClicked] = useState(false);
  const currentTimer = useRef(null);

  let startTimer = () => {
    setIsStart(true);
    setIsPause(true);
    currentTimer.current = setInterval(() => {
      setTimer((timer) => {
        return timer + 1;
      });
    }, 1000);
  };

  let pauseTimer = () => {
    setIsPause(false);
    clearInterval(currentTimer.current);
  };

  let resumeTimer = () => {
    setIsPause(true);
    currentTimer.current = setInterval(() => {
      setTimer((timer) => {
        return timer + 1;
      });
    }, 1000);
  };

  let lapTimer = () => {
    setIsLapClicked(true);
    setTextTimer([...textTimer, timer]);
  };

  let stopTimer = () => {
    setIsPause(false);
    setIsStart(false);
    clearInterval(currentTimer.current);
    setTimer(0);
    setTextTimer([]);
  };

  const formatTimer = () => {
    var date = new Date(0);
    date.setSeconds(timer); // specify value for SECONDS here
    return date.toISOString().substr(11, 8);
  };

  const formatTextTimer = (textTime) => {
    var date = new Date(0);
    date.setSeconds(textTime); // specify value for SECONDS here
    return date.toISOString().substr(11, 8);
  };

  return (
    <div className="mx-3 my-3">
      <div className="card border-dark mb-3">
        <div className="card-header fw-bolder text-center">Stopwatch</div>
        <div className="card-body text-dark">
          <h1 className="card-title text-center">{formatTimer()}</h1>
          <div className="text-center mt-4">
            {!isStart && !isPause ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={startTimer}
              >
                Start
              </button>
            ) : isPause ? (
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={pauseTimer}
                >
                  Pause
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={lapTimer}
                >
                  Lap
                </button>
              </div>
            ) : (
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={resumeTimer}
                >
                  Resume
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={stopTimer}
                >
                  Stop
                </button>
              </div>
            )}
          </div>
          <div>
            {isLapClicked
              ? textTimer.map((textTime, index) => {
                  return <h3 key={index}>{formatTextTimer(textTime)}</h3>;
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
