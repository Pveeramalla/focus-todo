import { useState } from "react";
import TaskInput from "./components/Tasks/TaskInput";
import TaskList from "./components/Tasks/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  // add new task
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
    };
    setTasks([...tasks, newTask]);
  };

  // remove task (mark as done)
  const removeTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2>Tasks</h2>

      <TaskInput onAdd={addTask} />
      <TaskList tasks={tasks} onDone={removeTask} />
    </div>
  );
}

export default App;
