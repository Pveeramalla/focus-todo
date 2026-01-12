import TaskInput from "./Tasks/TaskInput";
import TaskList from "./Tasks/TaskList";
import FocusTimer from "./Focus/FocusTimer";

function DayView({
  title,
  activeTab,
  setActiveTab,
  tasks,
  addTask,
  startTask,
  resumeTask,
  updateTaskStatus,
  editTask,
  activeTask,
  selectedTaskIds,
  onToggleSelect,
  onClear, // ✅ ADD THIS
}) {
  return (
    <>
      {/* HEADER CARD */}
      <div className="card" style={{ marginBottom: "16px" }}>
        <h2 style={{ margin: 0 }}>{title}</h2>
      </div>

      {/* TABS */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "TASKS" ? "active" : ""}`}
          onClick={() => setActiveTab("TASKS")}
        >
          Tasks
        </button>
        <button
          className={`tab ${activeTab === "FOCUS" ? "active" : ""}`}
          onClick={() => setActiveTab("FOCUS")}
        >
          Focus
        </button>
      </div>

      {/* TASKS */}
      {activeTab === "TASKS" && (
        <>
          {/* TOOLBAR CARD */}
          <div className="card" style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ flex: 1 }}>
                <TaskInput onAdd={addTask} />
              </div>
            </div>
          </div>

          {/* TASK LIST CARD */}
          <div className="card">
            <TaskList
              tasks={tasks}
              selectedTaskIds={selectedTaskIds}
              onToggleSelect={onToggleSelect}
              onStart={startTask}
              onResume={resumeTask}
              onStatusChange={updateTaskStatus}
              onEdit={editTask}
              onClear={onClear} // ✅ PASS IT
            />
          </div>
        </>
      )}

      {/* FOCUS */}
      {activeTab === "FOCUS" && (
        <div className="card">
          <FocusTimer activeTask={activeTask} />
        </div>
      )}
    </>
  );
}

export default DayView;
