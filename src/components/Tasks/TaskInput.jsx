import { useRef, useState } from "react";

function TaskInput({ onAdd }) {
  const [text, setText] = useState("");

  // store combined date-time
  const [dateTime, setDateTime] = useState("");

  // hidden input ref
  const dateTimeRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    let dueDate = null;
    let time = null;

    if (dateTime) {
      const d = new Date(dateTime);
      dueDate = d.toISOString().split("T")[0]; // YYYY-MM-DD
      time = d.toTimeString().slice(0, 5);     // HH:mm
    }

    onAdd({
      text: text.trim(),
      dueDate, // can be null
      time,    // can be null
    });

    setText("");
    setDateTime("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "100%",
      }}
    >
      {/* BIG TEXT INPUT */}
      <input
        type="text"
        placeholder="Add a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          flex: 1,
          height: "36px",
          padding: "0 12px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
        }}
      />

      {/* HIDDEN DATETIME PICKER */}
      <input
        ref={dateTimeRef}
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        style={{ display: "none" }}
      />

      {/* CALENDAR BUTTON */}
      <button
        type="button"
        onClick={() => dateTimeRef.current?.showPicker()}
        title="Pick date & time"
        style={{
          height: "36px",
          width: "36px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        📅
      </button>

      {/* ADD BUTTON */}
      <button
        type="submit"
        className="btn-primary"
        style={{ height: "36px" }}
      >
        Add
      </button>
    </form>
  );
}

export default TaskInput;
