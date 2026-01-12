import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  selectedTaskIds,
  onToggleSelect,
  onStart,
  onResume,
  onStatusChange,
  onEdit,
}) {
  if (!tasks || tasks.length === 0) {
    return (
      <div style={{ padding: "16px", color: "#888" }}>
        No tasks yet
      </div>
    );
  }

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "14px",
      }}
    >
      {/* TABLE HEADER */}
      <thead>
        <tr
          style={{
            background: "#f1f4f3",
            borderBottom: "1px solid #ddd",
          }}
        >
          <th style={{ width: "36px" }}></th>

          {/* NAME (flexible) */}
          <th
            style={{
              textAlign: "left",
              padding: "10px 8px",
            }}
          >
            Name
          </th>

          {/* DUE DATE */}
          <th
            style={{
              width: "140px",
              textAlign: "right",
              padding: "10px 8px",
            }}
          >
            Due Date
          </th>

          {/* STATUS */}
          <th
            style={{
              width: "120px",
              textAlign: "right",
              padding: "10px 8px",
            }}
          >
            Status
          </th>

          {/* ACTIONS */}
          <th
            style={{
              width: "120px",
              textAlign: "right",
              padding: "10px 8px",
            }}
          >
            Actions
          </th>
        </tr>
      </thead>

      {/* TABLE BODY */}
      <tbody>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            selectedTaskIds={selectedTaskIds}
            onToggleSelect={onToggleSelect}
            onStart={onStart}
            onResume={onResume}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
