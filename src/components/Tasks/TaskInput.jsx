import { useState } from "react";

function TaskInput({ onAdd }) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAdd({ text: text.trim(), dueDate });
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "10px" }}
    >
      <input
        placeholder="Add a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          flex: 1,
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
        }}
      />

      {/* calendar (icon feel) */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{
          width: "42px",
          padding: "6px",
          cursor: "pointer",
        }}
      />

      <button type="submit" className="btn-primary">
        Add
      </button>
    </form>
  );
}

export default TaskInput;
