import TaskItem from "./TaskItem";

function TaskList(props) {
  const { tasks } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th style={{ width: "40px" }}></th>
          <th>Name</th>
          <th style={{ width: "140px" }}>Due Date</th>
          <th style={{ width: "120px" }}>Status</th>
          <th style={{ width: "120px" }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} {...props} />
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
