import { useRef, useState } from "react";

function TaskInput({ onAdd }) {
  const [text, setText] = useState("");
  const [dateTime, setDateTime] = useState("");
  const dateTimeRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    let dueDate = null;
    let time = null;

    if (dateTime) {
      const d = new Date(dateTime);

      // ✅ LOCAL DATE (NO UTC SHIFT)
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      dueDate = `${year}-${month}-${day}`;

      // ✅ LOCAL TIME
      const hours = String(d.getHours()).padStart(2, "0");
      const minutes = String(d.getMinutes()).padStart(2, "0");
      time = `${hours}:${minutes}`;
      } else {
  // ✅ DEFAULT TO TODAY
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      dueDate = `${year}-${month}-${day}`;
    }

    onAdd({
      text: text.trim(),
      dueDate, // null or YYYY-MM-DD (local)
      time,    // null or HH:mm (local)
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
      {/* TEXT */}
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

      {/* CALENDAR ICON */}
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

      {/* ADD */}
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
