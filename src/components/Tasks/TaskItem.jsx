function TaskItem({ task, onDone }) {
  return (
    <li>
      {task.text}
      <button onClick={() => onDone(task.id)}>
        Done
      </button>
    </li>
  );
}

export default TaskItem;
