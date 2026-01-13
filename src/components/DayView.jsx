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
  onClear,
}) {
  return (
    <>
      {/* HEADER CARD */}
      <div className="page-title-card" style={{ marginBottom: "12px" }}>
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
          {/* TOOLBAR */}
          <div className="card" style={{ marginBottom: "16px" }}>
            <TaskInput onAdd={addTask} />
          </div>

          {/* TASK LIST */}
          <div className="card">
            <TaskList
              tasks={tasks}
              selectedTaskIds={selectedTaskIds}
              onToggleSelect={onToggleSelect}
              onStart={startTask}
              onResume={resumeTask}
              onStatusChange={updateTaskStatus}
              onEdit={editTask}
              onClear={onClear}
              showTime={true} // ✅ KEY CHANGE
            />
          </div>
        </>
      )}

      {/* FOCUS */}
      {activeTab === "FOCUS" && (
        <>
          <div
            style={{
              marginBottom: "12px",
              fontSize: "16px",
              fontWeight: 600,
              color: "#374151",
            }}
          >
            Focus
          </div>
          <div className="card">
            <FocusTimer activeTask={activeTask} />
          </div>
        </>
      )}
    </>
  );
}

export default DayView;
