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

const sortByTime = (tasks) => {
  return [...tasks].sort((a, b) => {
    // tasks without time go last
    if (!a.time && !b.time) return 0;
    if (!a.time) return 1;
    if (!b.time) return -1;

    // Compare HH:mm
    return a.time.localeCompare(b.time);
  });
};

function App() {
  /* -------------------- STATE -------------------- */
  const [tasks, setTasks] = useState([]);
  const [activeView, setActiveView] = useState("HOME");
  const [activeTab, setActiveTab] = useState("TASKS");
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  /* -------------------- LOAD / SAVE -------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, isInitialized]);

  /* -------------------- DATES -------------------- */
  const today = getLocalDateString();

  const tomorrow = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return getLocalDateString(d);
  })();

  /* -------------------- FILTERS -------------------- */
  const tasksByDate = (date) =>
    sortByTime(tasks.filter((t) => t.dueDate === date));

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

  /* -------------------- TASK ACTIONS -------------------- */

  const addTask = ({ text, time, dueDate }) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        time: time || null,
        dueDate: dueDate || null,
        status: "TODO",
      },
    ]);
  };

  // ✅ SINGLE IN_PROGRESS GUARANTEE
  const startTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.status === "IN_PROGRESS" && task.id !== id) {
          return { ...task, status: "PENDING" };
        }
        if (task.id === id) {
          return { ...task, status: "IN_PROGRESS" };
        }
        return task;
      })
    );
    setActiveTab("FOCUS");
  };

  const resumeTask = startTask;

  const updateTaskStatus = (id, status) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  const editTask = (id, text, time, dueDate) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text, time, dueDate } : task
      )
    );
  };

  // ✅ DELETE SINGLE TASK
  const clearTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setSelectedTaskIds((prev) => prev.filter((x) => x !== id));
  };

  // ✅ BULK CLEAR
  const clearSelectedTasks = () => {
    if (selectedTaskIds.length === 0) return;
    setTasks((prev) =>
      prev.filter((t) => !selectedTaskIds.includes(t.id))
    );
    setSelectedTaskIds([]);
  };

  /* -------------------- SELECTION -------------------- */
  const toggleTaskSelection = (id) => {
    setSelectedTaskIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const activeTask = tasks.find((t) => t.status === "IN_PROGRESS");

  /* -------------------- GROUP TASKS BY DATE (WEEK) -------------------- */
  const groupTasksByDate = (tasksList) => {
    const grouped = tasksList.reduce((acc, task) => {
      const date = task.dueDate || "NA";
      if (!acc[date]) acc[date] = [];
      acc[date].push(task);
      return acc;
    }, {});

    // sort dates ASC (earliest → latest), keep "NA" last
    return Object.fromEntries(
      Object.entries(grouped).sort(([a], [b]) => {
        if (a === "NA") return 1;
        if (b === "NA") return -1;
        return new Date(a) - new Date(b);
      })
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
            onClear={clearTask}
            showTime={true}
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
            onClear={clearTask}
            showTime={true}
          />
        )}

        {/* THIS WEEK */}
        {activeView === "WEEK" && (
          <>
            <div className="card" style={{ marginBottom: "16px" }}>
              <h2 style={{ margin: 0 }}>This Week</h2>
            </div>

            {Object.entries(groupTasksByDate(weekTasks())).map(
              ([date, taskForDate]) => (
                <div
                  key={date}
                  className="card"
                  style={{ marginBottom: "16px" }}
                >
                  <h4 style={{ margin: "0 0 12px 0" }}>
                    📅 {date === "NA" ? "No Date" : date}
                  </h4>

                  <TaskList
                    tasks={sortByTime(taskForDate)}
                    selectedTaskIds={selectedTaskIds}
                    onToggleSelect={toggleTaskSelection}
                    onStart={startTask}
                    onResume={resumeTask}
                    onStatusChange={updateTaskStatus}
                    onEdit={editTask}
                    onClear={clearTask}
                    showTime={false}   // week shows Due Date (not Time)
                  />
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
