import { useState, useEffect } from "react";

function FocusTimer({ activeTask }) {
  /* -------------------- settings -------------------- */

  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  /* -------------------- timer state -------------------- */

  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  /* -------------------- timer countdown -------------------- */

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

  /* -------------------- reset when task changes -------------------- */

  useEffect(() => {
    if (!activeTask) return;

    setIsRunning(false);
    setSecondsLeft(focusMinutes * 60);
  }, [activeTask, focusMinutes]);

  /* -------------------- actions -------------------- */

  const applySettings = () => {
    setIsRunning(false);
    setSecondsLeft(focusMinutes * 60);
  };

  const startPause = () => {
    setIsRunning((r) => !r);
  };

  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(focusMinutes * 60);
  };

  /* -------------------- helpers -------------------- */

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  /* -------------------- render -------------------- */

  return (
    <div>
      {activeTask ? (
        <h3>Focusing on: {activeTask.text}</h3>
      ) : (
        <h3>No active task</h3>
      )}

      {/* Settings */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "end",
          margin: "12px 0",
        }}
      >
        <label>
          Focus (min)
          <input
            type="number"
            min="1"
            value={focusMinutes}
            onChange={(e) => setFocusMinutes(Number(e.target.value))}
            disabled={isRunning}
            style={{ display: "block" }}
          />
        </label>

        <label>
          Break (min)
          <input
            type="number"
            min="1"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(Number(e.target.value))}
            disabled={isRunning}
            style={{ display: "block" }}
          />
        </label>

        <button onClick={applySettings} disabled={isRunning}>
          Apply
        </button>
      </div>

      {/* Timer */}
      <h1>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </h1>

      <button onClick={startPause}>
        {isRunning ? "Pause" : "Start"}
      </button>

      <button onClick={reset}>Reset</button>

      {/* Info */}
      <p style={{ opacity: 0.7 }}>
        Break set to: {breakMinutes} min
      </p>
    </div>
  );
}

export default FocusTimer;
