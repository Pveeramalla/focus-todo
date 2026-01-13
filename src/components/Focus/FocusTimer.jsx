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
      setMode("BREAK");
      setSecondsLeft(breakMinutes * 60);
      setIsRunning(true);
    } else {
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

  /* -------------------- helpers -------------------- */

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  /* -------------------- render -------------------- */

  return (
    <div
      style={{
        background: "radial-gradient(circle at top, #1f2933, #0f172a)",
        color: "#e5e7eb",
        borderRadius: "18px",
        padding: "32px",
        textAlign: "center",
      }}
    >
      {/* TITLE */}
      <div style={{ marginBottom: "10px" }}>
        <div style={{ fontSize: "18px", fontWeight: 600 }}>
          {activeTask ? "Focusing on" : "Ready to focus"}
        </div>

        <div
          style={{
            fontSize: "14px",
            opacity: activeTask ? 0.8 : 0.45,
          }}
        >
          {activeTask ? activeTask.text : "Pick a task to get started"}
        </div>
      </div>

      {/* NOTE BLOCK */}
      {mode === "FOCUS" && (
        <div
          style={{
            margin: "16px auto 24px",
            maxWidth: "360px",
            background: "#020617",
            borderRadius: "12px",
            padding: "10px 14px",
          }}
        >
          <textarea
            placeholder="Add a focus note (optional)"
            value={focusNote}
            onChange={(e) => setFocusNote(e.target.value)}
            rows={1}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              color: "#e5e7eb",
              resize: "none",
              outline: "none",
              textAlign: "center",
            }}
          />
        </div>
      )}

      {/* TIMER RING */}
      <div
        style={{
          width: "260px",
          height: "260px",
          margin: "0 auto 24px",
          borderRadius: "50%",
          border: "8px solid rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: "56px", fontWeight: 700 }}>
          {formatTime(secondsLeft)}
        </div>
      </div>

      {/* CONTROLS */}
      <div style={{ marginBottom: "24px" }}>
        <button
          onClick={() => setIsRunning((r) => !r)}
          style={{
            background: "#22c55e",
            color: "#052e16",
            border: "none",
            padding: "12px 36px",
            borderRadius: "999px",
            fontSize: "16px",
            fontWeight: 600,
            marginRight: "12px",
            cursor: "pointer",
          }}
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            setFreeFocus(false);
            setMode("FOCUS");
            setSecondsLeft(focusMinutes * 60);
          }}
          style={{
            background: "transparent",
            color: "#cbd5f5",
            border: "1px solid #334155",
            padding: "12px 24px",
            borderRadius: "999px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      {/* SETTINGS */}
      {!isRunning && mode === "FOCUS" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            opacity: 0.8,
            fontSize: "14px",
          }}
        >
          <div>
            Focus{" "}
            <input
              type="number"
              min="1"
              value={focusMinutes}
              onChange={(e) => setFocusMinutes(Number(e.target.value))}
              style={{ width: "50px" }}
            />{" "}
            min
          </div>

          <div>
            Break{" "}
            <input
              type="number"
              min="1"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(Number(e.target.value))}
              style={{ width: "50px" }}
            />{" "}
            min
          </div>
        </div>
      )}
    </div>
  );
}

export default FocusTimer;
