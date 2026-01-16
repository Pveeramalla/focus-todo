import { useState, useEffect } from "react";

// layout
import LeftNav from "./components/LeftNav";
import TopHeader from "./components/TopHeader";

// views
import DayView from "./components/DayView";

// tasks
import TaskList from "./components/Tasks/TaskList";

import "./layout/Layout.css";

/* ---------------------------------------------
   Local date helper
---------------------------------------------- */
const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const sortByTime = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (!a.time && !b.time) return 0;
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });
};

const groupTasksByDate = (tasks) => {
  const map = {};
  tasks.forEach((task) => {
    if (!task.dueDate) return;
    if (!map[task.dueDate]) map[task.dueDate] = [];
    map[task.dueDate].push(task);
  });

  return Object.keys(map)
    .sort()
    .map((date) => ({ date, tasks: map[date] }));
};

const formatDayLabel = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeView, setActiveView] = useState("HOME");
  const [activeTab, setActiveTab] = useState("TASKS");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, isInitialized]);

  const today = getLocalDateString();
  const tomorrow = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return getLocalDateString(d);
  })();

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

  const clearTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const activeTask = tasks.find((t) => t.status === "IN_PROGRESS");

  return (
    <div className="app-root">
      {/* ✅ FIXED HEADER */}
      <TopHeader />

      {/* ✅ MAIN LAYOUT */}
      <div className="app-shell">
        <LeftNav activeView={activeView} onChange={setActiveView} />

        <div className="app-content">
          {activeView === "HOME" && (
            <DayView
              title="Today"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tasks={tasksByDate(today)}
              addTask={addTask}
              startTask={startTask}
              resumeTask={startTask}
              updateTaskStatus={updateTaskStatus}
              editTask={editTask}
              activeTask={activeTask}
              onClear={clearTask}
            />
          )}

          {activeView === "TOMORROW" && (
            <DayView
              title="Tomorrow"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tasks={tasksByDate(tomorrow)}
              addTask={addTask}
              startTask={startTask}
              resumeTask={startTask}
              updateTaskStatus={updateTaskStatus}
              editTask={editTask}
              activeTask={activeTask}
              onClear={clearTask}
            />
          )}

          {activeView === "WEEK" && (
            <>
              <div className="card" style={{ marginBottom: "16px" }}>
                <h2 style={{ margin: 0 }}>This Week</h2>
              </div>

              {groupTasksByDate(weekTasks()).map(({ date, tasks }) => (
                <div key={date} style={{ marginBottom: "24px" }}>
                  <strong>{formatDayLabel(date)}</strong>
                  <div className="card">
                    <TaskList
                      tasks={tasks}
                      onStart={startTask}
                      onStatusChange={updateTaskStatus}
                      onEdit={editTask}
                      onClear={clearTask}
                      showTime={false}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
