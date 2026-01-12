import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  selectedTaskIds,
  onToggleSelect,
  onStart,
  onStatusChange,
  onEdit,
  onClear,
  showTime,
}) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th style={{ width: "40px" }}></th>
          <th>Name</th>
          <th style={{ width: "120px" }}>
            {showTime ? "Time" : "Due Date"}
          </th>
          <th style={{ width: "120px" }}>Status</th>
          <th style={{ width: "120px" }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            selectedTaskIds={selectedTaskIds}
            onToggleSelect={onToggleSelect}
            onStart={onStart}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
            onClear={onClear}
            showTime={showTime}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
