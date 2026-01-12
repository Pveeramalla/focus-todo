import TaskItem from "./TaskItem";

function TaskList({
  tasks = [],                    // ✅ default
  selectedTaskIds = [],           // ✅ default
  onToggleSelect = () => {},      // ✅ safe no-op
  onStart,
  onResume,
  onStatusChange,
  onEdit,
}) {
  if (!tasks.length) {
    return <p>No tasks yet</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
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
    </ul>
  );
}

export default TaskList;
