import { useState } from "react";

function TaskInput({ onAdd }) {
  const [text, setText] = useState("");
  const [time, setTime] = useState(""); // "" means no time

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAdd({ text: text.trim(), time });
    setText("");
    setTime("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
      <input
        type="text"
        placeholder="Add a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1 }}
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        title="Optional time"
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default TaskInput;
