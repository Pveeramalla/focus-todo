import { useState, useEffect } from "react";

// layout
import LeftNav from "./components/LeftNav";

// views
import DayView from "./components/DayView";

// tasks
import TaskList from "./components/Tasks/TaskList";

/* ---------------------------------------------
   Local date helper (NO UTC, NO timezone bug)
---------------------------------------------- */
const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function App() {
  /* -------------------- STATE -------------------- */

  const [tasks, setTasks] = useState([]);
  const [activeView, setActiveView] = useState("HOME"); // HOME | TOMORROW | WEEK
  const [activeTab, setActiveTab] = useState("TASKS"); // TASKS | FOCUS
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);


  /* -------------------- LOAD TASKS -------------------- */

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    setIsInitialized(true);
  }, []);

  /* -------------------- SAVE TASKS -------------------- */

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, isInitialized]);

  /* -------------------- DATE HELPERS -------------------- */

  const today = getLocalDateString();

  const tomorrow = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return getLocalDateString(d);
  })();

  /* -------------------- TASK HELPERS -------------------- */

  const tasksByDate = (date) => {
    return tasks.filter((t) => t.dueDate === date);
  };

  // ✅ Remove only selected tasks
const clearSelectedTasks = () => {
  if (selectedTaskIds.length === 0) return;

  setTasks((prevTasks) =>
    prevTasks.filter((task) => !selectedTaskIds.includes(task.id))
  );

  // clear selection after delete
  setSelectedTaskIds([]);
};


  /* -------------------- WEEK TASKS -------------------- */

  const weekTasks = () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 7);

    return tasks.filter((t) => {
      if (!t.dueDate) return false;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(t.dueDate)) return false;

      const [y, m, d] = t.dueDate.split("-").map(Number);
      const taskDate = new Date(y, m - 1, d);

      return taskDate >= start && taskDate <= end;
    });
  };

  /* -------------------- TASK ACTIONS -------------------- */

  const addTask = ({ text, time, dueDate }) => {
    const newTask = {
      id: Date.now(),
      text,
      time,
      dueDate,
      status: "TODO",
    };
    setTasks([...tasks, newTask]);
  };

  const moveActiveToPending = () => {
    return tasks.map((task) =>
      task.status === "IN_PROGRESS"
        ? { ...task, status: "PENDING" }
        : task
    );
  };

  const startTask = (id) => {
    const updatedTasks = moveActiveToPending().map((task) =>
      task.id === id ? { ...task, status: "IN_PROGRESS" } : task
    );
    setTasks(updatedTasks);
    setActiveTab("FOCUS");
  };

  const resumeTask = (id) => {
    const updatedTasks = moveActiveToPending().map((task) =>
      task.id === id ? { ...task, status: "IN_PROGRESS" } : task
    );
    setTasks(updatedTasks);
    setActiveTab("FOCUS");
  };

  const updateTaskStatus = (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  const editTask = (id, newText, newTime, newDueDate) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: newText, time: newTime, dueDate: newDueDate }
          : task
      )
    );
  };

  /* -------------------- ACTIVE TASK -------------------- */

  const activeTask = tasks.find((t) => t.status === "IN_PROGRESS");

  const toggleTaskSelection = (id) => {
  setSelectedTaskIds((prev) =>
    prev.includes(id)
      ? prev.filter((taskId) => taskId !== id)
      : [...prev, id]
  );
  };


  /* -------------------- RENDER -------------------- */

  return (
    <div style={{ display: "flex" }}>
      <LeftNav activeView={activeView} onChange={setActiveView} />

      <div style={{ padding: "16px", flex: 1 }}>
        {/* HOME */}
        {activeView === "HOME" && (
          <DayView
            title="Today"
            date={today}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tasks={tasksByDate(today)}
            addTask={addTask}
            startTask={startTask}
            resumeTask={resumeTask}
            updateTaskStatus={updateTaskStatus}
            editTask={editTask}
            activeTask={activeTask}
            showClearCompleted={true}
            clearSelectedTasks={clearSelectedTasks}
            selectedTaskIds={selectedTaskIds}
            onToggleSelect={toggleTaskSelection}
          />
        )}

        {/* TOMORROW */}
        {activeView === "TOMORROW" && (
          <DayView
            title="Tomorrow"
            date={tomorrow}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tasks={tasksByDate(tomorrow)}
            addTask={addTask}
            startTask={startTask}
            resumeTask={resumeTask}
            updateTaskStatus={updateTaskStatus}
            editTask={editTask}
            activeTask={activeTask}
            showClearCompleted={true}
            clearSelectedTasks={clearSelectedTasks}
            selectedTaskIds={selectedTaskIds}
            onToggleSelect={toggleTaskSelection}
          />
        )}

        {/* THIS WEEK */}
        {activeView === "WEEK" && (
          <>
            <h2>This Week</h2>
            <TaskList
              tasks={weekTasks()}
              selectedTaskIds={selectedTaskIds}   
              onToggleSelect={toggleTaskSelection}
              onStart={startTask}
              onResume={resumeTask}
              onStatusChange={updateTaskStatus}
              onEdit={editTask}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
