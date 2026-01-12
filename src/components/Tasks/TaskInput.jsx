import { useState } from "react";

function TaskInput({ onAdd }) {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");

  // 🔹 NEW: due date state (default = today)
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAdd({
      text,
      time,
      dueDate, // 🔹 NEW: pass dueDate
    });

    setText("");
    setTime("");
    // dueDate intentionally NOT reset
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "12px" }}>
      <input
        placeholder="Add a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      {/* 🔹 NEW: Date picker */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default TaskInput;
