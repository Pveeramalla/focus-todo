import TaskItem from "./TaskItem";

function TaskList({ tasks, onStart, onResume, onStatusChange, onEdit }) {
  if (tasks.length === 0) return <p>No tasks yet</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
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
