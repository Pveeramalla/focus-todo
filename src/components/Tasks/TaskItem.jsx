import { useState } from "react";

function formatTime(time) {
  if (!time) return "NA";

  const [h, m] = time.split(":");
  const d = new Date();
  d.setHours(h, m);

  return d.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function TaskItem({
  task,
  selectedTaskIds,
  onToggleSelect,
  onStart,
  onStatusChange,
  onEdit,
  onClear,
  showTime,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editTime, setEditTime] = useState(task.time || "");

  const statusStyles = {
    TODO: { background: "#eef2ff", color: "#3730a3" },
    PENDING: { background: "#fff7ed", color: "#c2410c" },
    IN_PROGRESS: { background: "#ecfeff", color: "#0f766e" },
    DONE: { background: "#ecfdf5", color: "#166534" },
  };

  const saveEdit = () => {
    onEdit(task.id, editText.trim(), editTime, task.dueDate);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(task.text);
    setEditTime(task.time || "");
    setIsEditing(false);
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={selectedTaskIds.includes(task.id)}
          onChange={() => onToggleSelect(task.id)}
        />
      </td>

      {/* NAME */}
      <td>
        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{ width: "100%" }}
            autoFocus
          />
        ) : (
          task.text
        )}
      </td>

      {/* TIME */}
      <td>
        {isEditing ? (
          <input
            type="time"
            value={editTime}
            onChange={(e) => setEditTime(e.target.value)}
          />
        ) : (
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "999px",
              background: "#f1f5f9",
              fontSize: "12px",
            }}
          >
            {showTime ? formatTime(task.time) : task.dueDate || "NA"}
          </span>
        )}
      </td>

      {/* STATUS */}
      <td>
        <span
          style={{
            padding: "4px 10px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 600,
            ...statusStyles[task.status],
          }}
        >
          {task.status}
        </span>
      </td>

      {/* ACTIONS */}
      <td>
        {isEditing ? (
          <div 
          style={{
            display: "flex",
            gap: "6px",
            justifyContent: "flex-end",
          }}>
            <button
              onClick={saveEdit}
               style={{
                padding: "4px 10px",
                borderRadius: "6px",
                border: "none",
                background: "#2f6f3e",
                color: "white",
                fontSize: "12px",
                cursor: "pointer",
               }} >
                Save
            </button>
            <button
            onClick={cancelEdit}
            style={{
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                background: "white",
                color: "#374151",
                fontSize: "12px",
                cursor: "pointer",
            }}
            >
                Cancel
            </button>
          </div>
        ) : (
          <select
            defaultValue=""
            onChange={(e) => {
              const action = e.target.value;
              e.target.value = "";

              if (action === "START") onStart(task.id);
              if (action === "DONE") onStatusChange(task.id, "DONE");
              if (action === "EDIT") setIsEditing(true);
              if (action === "CLEAR") onClear(task.id);
            }}
          >
            <option value="">⋮</option>
            {task.status !== "IN_PROGRESS" && (
              <option value="START">Start</option>
            )}
            <option value="EDIT">Edit</option>
            {task.status !== "DONE" && (
              <option value="DONE">Mark Done</option>
            )}
            <option value="CLEAR">Clear</option>
          </select>
        )}
      </td>
    </tr>
  );
}

export default TaskItem;
