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
  index,
  task,
  onStart,
  onStatusChange,
  onEdit,
  onClear,
  showTime,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editTime, setEditTime] = useState(task.time || "");
  const [hover, setHover] = useState(false);

  const statusStyles = {
    TODO: { background: "#eef2ff", color: "#3730a3" },
    PENDING: { background: "#fff7ed", color: "#c2410c" },
    IN_PROGRESS: { background: "#ecfeff", color: "#0f766e" },
    DONE: { background: "#ecfdf5", color: "#166534" },
  };

  const saveEdit = () => {
    if (!editText.trim()) return;
    onEdit(task.id, editText.trim(), editTime || null, task.dueDate);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(task.text);
    setEditTime(task.time || "");
    setIsEditing(false);
  };

  /* ROW HIGHLIGHT LOGIC */
  const rowStyle = {
    background:
      task.status === "IN_PROGRESS"
        ? "#f0fdf4"
        : hover
        ? "#f9fafb"
        : "transparent",
    transition: "background 0.15s ease",
  };

  return (
    <tr
      style={rowStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* NUMBER */}
      <td
        style={{
          width: "36px",
          textAlign: "right",
          paddingRight: "10px",
          fontSize: "13px",
          color: "#9ca3af",
          borderRight: "1px solid #e5e7eb",
        }}
      >
        {index + 1}
      </td>

      {/* NAME */}
      <td style={{ paddingLeft: "12px" }}>
        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{ width: "100%" }}
          />
        ) : (
          task.text
        )}
      </td>

      {/* TIME / DATE */}
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
              fontWeight: 500,
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
          <div style={{ display: "flex", gap: "6px" }}>
            <button onClick={saveEdit}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        ) : (
          <select
            defaultValue=""
            style={{
              width: "40px",
              height: "28px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onChange={(e) => {
              const action = e.target.value;
              e.target.value = "";

              if (action === "START") onStart(task.id);
              if (action === "PENDING") onStatusChange(task.id, "PENDING");
              if (action === "DONE") onStatusChange(task.id, "DONE");
              if (action === "EDIT") setIsEditing(true);
              if (action === "CLEAR") onClear(task.id);
            }}
          >
            <option value="">⋮</option>

            {(task.status === "TODO" || task.status === "PENDING") && (
              <option value="START">Start</option>
            )}

            {task.status === "IN_PROGRESS" && (
              <option value="PENDING">Pending</option>
            )}

            {task.status !== "DONE" && <option value="DONE">Done</option>}

            <option value="EDIT">Edit</option>
            <option value="CLEAR">Clear</option>
          </select>
        )}
      </td>
    </tr>
  );
}

export default TaskItem;
