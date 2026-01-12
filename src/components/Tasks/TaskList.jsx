import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  selectedTaskIds = [],
  onToggleSelect,
  onStart,
  onResume,
  onStatusChange,
  onEdit,
}) {
  if (!tasks || tasks.length === 0) {
    return <p>No tasks</p>;
  }

  return (
    <div>
      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "40px 1fr 140px 120px 160px",
          fontWeight: "bold",
          padding: "8px 0",
          borderBottom: "1px solid #ccc",
        }}
      >
        <div></div>
        <div>Name</div>
        <div>Due Date</div>
        <div>Status</div>
        <div>Actions</div>
      </div>

      {/* Task rows */}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isSelected={selectedTaskIds.includes(task.id)}
          onToggleSelect={onToggleSelect}
          onStart={onStart}
          onResume={onResume}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;
