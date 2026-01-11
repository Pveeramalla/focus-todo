import { useState, useEffect } from "react";

function FocusTimer() {
  const FOCUS_TIME = 25 * 60;               

  const [secondsLeft, setSecondsLeft] = useState(FOCUS_TIME); 
  const [isRunning, setIsRunning] = useState(false);       

  // Timer effect
  useEffect(() => {                      
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const startPause = () => {              
    setIsRunning(!isRunning);
  };

  const reset = () => {                  
    setIsRunning(false);
    setSecondsLeft(FOCUS_TIME);
  };

  // format mm:ss
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div>
      <h2>Focus Timer</h2>

      <h1>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </h1>

      <button onClick={startPause}>
        {isRunning ? "Pause" : "Start"}
      </button>

      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default FocusTimer;
