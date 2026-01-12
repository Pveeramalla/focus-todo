function TaskItem({
  task,
  selectedTaskIds,
  onToggleSelect,
  onStart,
  onResume,
  onStatusChange,
  onEdit,
}) {
  // status pill styles
  const statusStyle = {
    TODO: {
      bg: "#eef2ff",
      color: "#3730a3",
    },
    IN_PROGRESS: {
      bg: "#e0f2fe",
      color: "#0369a1",
    },
    PENDING: {
      bg: "#fff7ed",
      color: "#9a3412",
    },
    DONE: {
      bg: "#eaf7ef",
      color: "#166534",
    },
  };

  return (
    <tr
      style={{
        borderBottom: "1px solid #eee",
        background: selectedTaskIds.includes(task.id)
          ? "#f8fafc"
          : "transparent",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "#f9fafb")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background =
          selectedTaskIds.includes(task.id)
            ? "#f8fafc"
            : "transparent")
      }
    >
      {/* SELECT */}
      <td style={{ padding: "8px" }}>
        <input
          type="checkbox"
          checked={selectedTaskIds.includes(task.id)}
          onChange={() => onToggleSelect(task.id)}
        />
      </td>

      {/* NAME */}
      <td
        style={{
          padding: "8px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "0",
          fontWeight: 500,
        }}
        title={task.text}
      >
        {task.text}
      </td>

      {/* DUE DATE */}
      <td
        style={{
          padding: "8px",
          textAlign: "right",
          color: "#555",
          fontSize: "13px",
        }}
      >
        {task.dueDate || "—"}
      </td>

      {/* STATUS */}
      <td style={{ padding: "8px", textAlign: "right" }}>
        <span
          style={{
            padding: "4px 10px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 500,
            background: statusStyle[task.status]?.bg,
            color: statusStyle[task.status]?.color,
          }}
        >
          {task.status}
        </span>
      </td>

      {/* ACTIONS */}
      <td style={{ padding: "8px", textAlign: "right" }}>
        <select
          onChange={(e) => {
            const action = e.target.value;
            e.target.value = "";

            if (action === "START") onStart(task.id);
            if (action === "RESUME") onResume(task.id);
            if (action === "DONE") onStatusChange(task.id, "DONE");
            if (action === "EDIT") onEdit(task.id);
          }}
          style={{
            padding: "4px 6px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            background: "#fff",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          <option value="">⋮</option>

          {task.status !== "IN_PROGRESS" && (
            <option value="START">Start</option>
          )}

          {task.status === "PENDING" && (
            <option value="RESUME">Resume</option>
          )}

          <option value="DONE">Mark Done</option>
          <option value="EDIT">Edit</option>
        </select>
      </td>
    </tr>
  );
}

export default TaskItem;
