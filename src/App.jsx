import { useState } from "react";
import TaskInput from "./components/Tasks/TaskInput";
import TaskList from "./components/Tasks/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = ({ text, time }) => {
    const newTask = {
      id: Date.now(),
      text,
      time: time || "", // keep empty if not set
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText, newTime) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText, time: newTime || "" } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2>Tasks</h2>

      <TaskInput onAdd={addTask} />
      <TaskList tasks={tasks} onDone={removeTask} onEdit={editTask} />
    </div>
  );
}

export default App;
