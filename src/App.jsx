import { useState, useEffect } from "react";

// shared components
import Tabs from "./components/Tabs";

// tasks feature
import TaskInput from "./components/Tasks/TaskInput";
import TaskList from "./components/Tasks/TaskList";

// focus feature
import FocusTimer from "./components/Focus/FocusTimer";

function App() {
  /* -------------------- state -------------------- */

  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("TASKS");

  /* -------------------- effects -------------------- */

  // load tasks from storage (once)
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // save tasks to storage (on change)
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /* -------------------- task actions -------------------- */

  const addTask = ({ text, time }) => {
    const newTask = {
      id: Date.now(),
      text,
      time,
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText, newTime) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, text: newText, time: newTime }
        : task
    );
    setTasks(updatedTasks);
  };

  /* -------------------- render -------------------- */

  return (
    <div style={{ padding: "16px" }}>
      <h1>App is rendering</h1>

      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "TASKS" && (
        <>
          <h2>Tasks</h2>

          <TaskInput onAdd={addTask} />

          <TaskList
            tasks={tasks}
            onDone={removeTask}
            onEdit={editTask}
          />
        </>
      )}

      {activeTab === "FOCUS" && (
        <FocusTimer />
      )}
    </div>
  );
}

export default App;
