import TaskItem from "./TaskItem";

function TaskList({
  tasks,
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
          {/* NUMBER COLUMN */}
          <th style={{ width: "36px", textAlign: "right" }}>#</th>

          <th>Name</th>

          <th style={{ width: "120px" }}>
            {showTime ? "Time" : "Due Date"}
          </th>

          <th style={{ width: "120px" }}>Status</th>
          <th style={{ width: "120px" }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            index={index}
            task={task}
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
