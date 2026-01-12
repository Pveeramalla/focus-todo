import { useState, useEffect } from "react";

// layout
import LeftNav from "./components/LeftNav";

// views
import DayView from "./components/DayView";

// tasks
import TaskList from "./components/Tasks/TaskList";

import "./layout/Layout.css";

/* ---------------------------------------------
   Local date helper (NO UTC / NO timezone bug)
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
  const [activeView, setActiveView] = useState("HOME");
  const [activeTab, setActiveTab] = useState("TASKS");
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

  /* -------------------- FILTER HELPERS -------------------- */

  const tasksByDate = (date) =>
    tasks.filter((t) => t.dueDate === date);

  const weekTasks = () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(start.getDate() + 7);

    return tasks.filter((t) => {
      if (!t.dueDate) return false;
      const [y, m, d] = t.dueDate.split("-").map(Number);
      const taskDate = new Date(y, m - 1, d);
      return taskDate >= start && taskDate <= end;
    });
  };

  /* -------------------- GROUP + SORT WEEK TASKS -------------------- */

  const groupTasksByDate = (tasks) => {
    const grouped = tasks.reduce((acc, task) => {
      if (!task.dueDate) return acc;
      acc[task.dueDate] = acc[task.dueDate] || [];
      acc[task.dueDate].push(task);
      return acc;
    }, {});

    return Object.fromEntries(
      Object.entries(grouped).sort(
        ([a], [b]) => new Date(a) - new Date(b)
      )
    );
  };

  /* -------------------- TASK ACTIONS -------------------- */

  const addTask = ({ text, time, dueDate }) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text,
        time,
        dueDate,
        status: "TODO",
      },
    ]);
  };

  const startTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: "IN_PROGRESS" } : t
      )
    );
    setActiveTab("FOCUS");
  };

  const updateTaskStatus = (id, status) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status } : t
      )
    );
  };

  const editTask = (id, newText, newTime, newDueDate) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, text: newText, time: newTime, dueDate: newDueDate }
          : t
      )
    );
  };

  const toggleTaskSelection = (id) => {
    setSelectedTaskIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const clearSelectedTasks = () => {
    setTasks((prev) =>
      prev.filter((t) => !selectedTaskIds.includes(t.id))
    );
    setSelectedTaskIds([]);
  };

  const activeTask = tasks.find(
    (t) => t.status === "IN_PROGRESS"
  );

  /* -------------------- RENDER -------------------- */

  return (
    <div
      style={{
        display: "flex",
        background: "#f7f9f8",   // page background
        minHeight: "100vh",
      }}
    >
      <LeftNav activeView={activeView} onChange={setActiveView} />

      {/* MAIN CONTENT AREA */}
      <div
        style={{
          flex: 1,
          padding: "24px",
        }}
      >
        {/* CARD CONTAINER */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            minHeight: "calc(100vh - 48px)",
          }}
        >
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h2>This Week</h2>
                <button
                  onClick={clearSelectedTasks}
                  disabled={selectedTaskIds.length === 0}
                >
                  Clear Selected
                </button>
              </div>

              {Object.entries(groupTasksByDate(weekTasks())).map(
                ([date, list]) => (
                  <div key={date} style={{ marginBottom: "24px" }}>
                    <h3 style={{ marginBottom: "8px" }}>📅 {date}</h3>
                    <TaskList
                      tasks={list}
                      selectedTaskIds={selectedTaskIds}
                      onToggleSelect={toggleTaskSelection}
                      onStart={startTask}
                      onStatusChange={updateTaskStatus}
                      onEdit={editTask}
                    />
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
