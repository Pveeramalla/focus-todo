import { useState } from "react";

function TaskItem({ task, onStart, onResume, onStatusChange, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [time, setTime] = useState(task.time || "");

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onEdit(task.id, text, time);
    setIsEditing(false);
  };

  return (
    <li style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      {isEditing ? (
        <form
          onSubmit={handleEditSubmit}
          style={{ display: "flex", gap: "8px", flex: 1 }}
        >
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <span style={{ flex: 1 }}>
            {task.text}
            {task.time && <span> ⏰ {task.time}</span>}
            <strong style={{ marginLeft: "8px" }}>[{task.status}]</strong>
          </span>

          {task.status === "TODO" && (
            <button onClick={() => onStart(task.id)}>Start</button>
          )}

          {task.status === "PENDING" && (
            <button onClick={() => onResume(task.id)}>Resume</button>
          )}

          {task.status === "IN_PROGRESS" && (
            <>
              <button onClick={() => onStatusChange(task.id, "DONE")}>Done</button>
              <button onClick={() => onStatusChange(task.id, "PENDING")}>
                Pause
              </button>
            </>
          )}

          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
