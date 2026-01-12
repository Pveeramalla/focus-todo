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
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "40px 1fr 140px 120px 160px",
        alignItems: "center",
        padding: "8px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelect && onToggleSelect(task.id)}
      />

      {/* Name */}
      <div>{task.text}</div>

      {/* Due date */}
      <div>{task.dueDate || "-"}</div>

      {/* Status */}
      <div>{task.status}</div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "6px" }}>
        {task.status === "TODO" && (
          <button onClick={() => onStart(task.id)}>Start</button>
        )}

        {task.status === "PENDING" && (
          <button onClick={() => onResume(task.id)}>Resume</button>
        )}

        {task.status === "IN_PROGRESS" && (
          <button onClick={() => onStatusChange(task.id, "DONE")}>
            Done
          </button>
        )}

        <button onClick={() => onEdit(task.id)}>Edit</button>
      </div>
    </div>
  );
}

export default TaskItem;
