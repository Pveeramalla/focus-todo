import { useState, useRef } from "react";

function TaskInput({ onAdd }) {
  const [text, setText] = useState("");
  const [dateTime, setDateTime] = useState("");

  const dateRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    let dueDate = "";
    let time = "";

    if (dateTime) {
      const [d, t] = dateTime.split("T");
      dueDate = d;
      time = t || "";
    }

    onAdd({
      text: text.trim(),
      dueDate,
      time,
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
      }}
    >
      {/* Task text */}
      <input
        type="text"
        placeholder="Add a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          flex: 1,
          padding: "8px 10px",
        }}
      />

      {/* Hidden datetime input */}
      <input
        ref={dateRef}
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        style={{ display: "none" }}
      />

      {/* Calendar button */}
      <button
        type="button"
        onClick={() => dateRef.current?.showPicker()}
        title="Pick date & time"
        style={{
          padding: "6px 8px",
          cursor: "pointer",
        }}
      >
        📅
      </button>

      {/* Add */}
      <button
        type="submit"
        style={{
          padding: "8px 14px",
          fontWeight: "600",
        }}
      >
        Add
      </button>
    </form>
  );
}

export default TaskInput;
