function TaskItem({
  task,
  selectedTaskIds,
  onToggleSelect,
  onStart,
  onStatusChange,
  onClear,
}) {
  const statusStyles = {
    TODO: { background: "#eef2ff", color: "#3730a3" },
    PENDING: { background: "#fff7ed", color: "#c2410c" },
    IN_PROGRESS: { background: "#ecfeff", color: "#0f766e" },
    DONE: { background: "#ecfdf5", color: "#166534" },
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

      <td>{task.text}</td>

      <td>{task.dueDate}</td>

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

      <td>
        <select
          defaultValue=""
          onChange={(e) => {
            const action = e.target.value;
            e.target.value = "";

            if (action === "START") onStart(task.id);
            if (action === "DONE") onStatusChange(task.id, "DONE");
            if (action === "CLEAR") onClear(task.id); // ✅ WORKS NOW
          }}
        >
          <option value="">⋮</option>

          {task.status !== "IN_PROGRESS" && (
            <option value="START">Start</option>
          )}

          {task.status !== "DONE" && (
            <option value="DONE">Mark Done</option>
          )}

          <option value="CLEAR">Clear</option>
        </select>
      </td>
    </tr>
  );
}

export default TaskItem;
