import TaskItem from "./TaskItem";

function TaskList({ tasks, onDone, onEdit }) {
  if (tasks.length === 0) {
    return <p>No tasks yet</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDone={onDone}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TaskList;
