import { useState, useEffect } from "react";

function FocusTimer({ activeTask }) {
  /* -------------------- persisted settings -------------------- */

  const [focusMinutes, setFocusMinutes] = useState(() =>
    Number(localStorage.getItem("focusMinutes")) || 25
  );

  const [breakMinutes, setBreakMinutes] = useState(() =>
    Number(localStorage.getItem("breakMinutes")) || 5
  );

  const [focusNote, setFocusNote] = useState(() =>
    localStorage.getItem("focusNote") || ""
  );

  /* -------------------- timer state -------------------- */

  const [mode, setMode] = useState("FOCUS"); // FOCUS | BREAK
  const [isRunning, setIsRunning] = useState(false);
  const [freeFocus, setFreeFocus] = useState(false);

  const [secondsLeft, setSecondsLeft] = useState(() => {
    const saved = Number(localStorage.getItem("focusMinutes")) || 25;
    return saved * 60;
  });

  /* -------------------- persist settings -------------------- */

  useEffect(() => {
    localStorage.setItem("focusMinutes", focusMinutes);
  }, [focusMinutes]);

  useEffect(() => {
    localStorage.setItem("breakMinutes", breakMinutes);
  }, [breakMinutes]);

  useEffect(() => {
    localStorage.setItem("focusNote", focusNote);
  }, [focusNote]);

  /* -------------------- countdown -------------------- */

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onSessionComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  /* -------------------- session transitions -------------------- */

  const onSessionComplete = () => {
    setIsRunning(false);

    if (mode === "FOCUS") {
      // switch to break
      setMode("BREAK");
      setSecondsLeft(breakMinutes * 60);
      setIsRunning(true);
    } else {
      // break finished → back to focus (idle)
      setMode("FOCUS");
      setFreeFocus(false);
      setSecondsLeft(focusMinutes * 60);
    }
  };

  /* -------------------- reset on task change -------------------- */

  useEffect(() => {
    if (!activeTask) return;

    setIsRunning(false);
    setFreeFocus(false);
    setMode("FOCUS");
    setSecondsLeft(focusMinutes * 60);
  }, [activeTask, focusMinutes]);

  /* -------------------- actions -------------------- */

  const startPause = () => {
    setIsRunning((r) => !r);
  };

  const reset = () => {
    setIsRunning(false);
    setFreeFocus(false);
    setMode("FOCUS");
    setSecondsLeft(focusMinutes * 60);
  };

  const startFreeFocus = () => {
    setFreeFocus(true);
    setMode("FOCUS");
    setSecondsLeft(focusMinutes * 60);
    setIsRunning(true);
  };

  /* -------------------- helpers -------------------- */

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  /* -------------------- render -------------------- */

  return (
    <div>
      {/* Header */}
      {mode === "FOCUS" && activeTask && (
        <h3>Focusing on: {activeTask.text}</h3>
      )}

      {mode === "FOCUS" && freeFocus && (
        <h3>Focusing (no task)</h3>
      )}

      {mode === "BREAK" && <h3>☕ Break time</h3>}

      {/* Start free focus */}
      {!activeTask && !freeFocus && !isRunning && mode === "FOCUS" && (
        <button onClick={startFreeFocus}>
          Start Focus Session
        </button>
      )}

      {/* Focus note */}
      {mode === "FOCUS" && (
        <div style={{ margin: "12px 0" }}>
          <textarea
            placeholder="Add a focus note (optional)"
            value={focusNote}
            onChange={(e) => setFocusNote(e.target.value)}
            rows={2}
            style={{ width: "100%" }}
          />
        </div>
      )}

      {/* Settings (only when idle focus) */}
      {!isRunning && mode === "FOCUS" && (
        <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
          <label>
            Focus (min)
            <input
              type="number"
              min="1"
              value={focusMinutes}
              onChange={(e) => setFocusMinutes(Number(e.target.value))}
            />
          </label>

          <label>
            Break (min)
            <input
              type="number"
              min="1"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(Number(e.target.value))}
            />
          </label>
        </div>
      )}

      {/* Timer */}
      <h1>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </h1>

      {/* Controls */}
      <button onClick={startPause}>
        {isRunning ? "Pause" : "Start"}
      </button>

      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default FocusTimer;
