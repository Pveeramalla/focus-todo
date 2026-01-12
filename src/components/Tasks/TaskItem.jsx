import { useState } from "react";

function TaskItem({
  task,
  isSelected,
  onToggleSelect,
  onStart,
  onResume,
  onStatusChange,
  onEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [time, setTime] = useState(task.time || "");
  const [dueDate, setDueDate] = useState(task.dueDate || "");

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onEdit(task.id, text, time, dueDate);
    setIsEditing(false);
  };

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "6px",
      }}
    >
      {/* ✅ Selection checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelect(task.id)}
      />

      {isEditing ? (
        <form
          onSubmit={handleEditSubmit}
          style={{ display: "flex", gap: "6px", flex: 1 }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          {/* Task name + date + time */}
          <div style={{ flex: 1 }}>
            <strong>{task.text}</strong>

            {task.time && (
              <span style={{ marginLeft: "6px" }}>
                ⏰ {task.time}
              </span>
            )}

            {task.dueDate && (
              <span style={{ marginLeft: "6px" }}>
                📅 {task.dueDate}
              </span>
            )}

            <span style={{ marginLeft: "8px" }}>
              [{task.status}]
            </span>
          </div>

          {/* Actions */}
          {task.status === "TODO" && (
            <button onClick={() => onStart(task.id)}>Start</button>
          )}

          {task.status === "PENDING" && (
            <button onClick={() => onResume(task.id)}>Resume</button>
          )}

          {task.status === "IN_PROGRESS" && (
            <button
              onClick={() => onStatusChange(task.id, "DONE")}
            >
              Done
            </button>
          )}

          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
