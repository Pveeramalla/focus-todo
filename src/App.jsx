import { useState, useEffect } from "react";

// shared
import Tabs from "./components/Tabs";

// tasks
import TaskInput from "./components/Tasks/TaskInput";
import TaskList from "./components/Tasks/TaskList";

// focus
import FocusTimer from "./components/Focus/FocusTimer";

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("TASKS");
  const [activeTaskId, setActiveTaskId] = useState(null);

  // load tasks once
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // save tasks on change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = ({ text, time }) => {
    const newTask = {
      id: Date.now(),
      text,
      time,
      status: "TODO",
    };
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = (id, status) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  // Start from TODO
  const startTask = (id) => {
    updateTaskStatus(id, "IN_PROGRESS");
    setActiveTaskId(id);
    setActiveTab("FOCUS");
  };

  // Resume from PENDING (NEW)
  const resumeTask = (id) => {
    updateTaskStatus(id, "IN_PROGRESS");
    setActiveTaskId(id);
    setActiveTab("FOCUS");
  };

  const editTask = (id, newText, newTime) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, text: newText, time: newTime }
        : task
    );
    setTasks(updatedTasks);
  };

  const activeTask = tasks.find((task) => task.id === activeTaskId);

  return (
    <div style={{ padding: "16px" }}>
      <Tabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "TASKS" && (
        <>
          <h2>Tasks</h2>

          <TaskInput onAdd={addTask} />

          <TaskList
            tasks={tasks}
            onStart={startTask}
            onResume={resumeTask}          // NEW
            onStatusChange={updateTaskStatus}
            onEdit={editTask}
          />
        </>
      )}

      {activeTab === "FOCUS" && <FocusTimer activeTask={activeTask} />}
    </div>
  );
}

export default App;
