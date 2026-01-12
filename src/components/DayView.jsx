import TaskInput from "./Tasks/TaskInput";
import TaskList from "./Tasks/TaskList";
import FocusTimer from "./Focus/FocusTimer";

function DayView({
  title,
  date,
  activeTab,
  setActiveTab,
  tasks,
  addTask,
  startTask,
  resumeTask,
  updateTaskStatus,
  editTask,
  activeTask,
  showClearCompleted,
  clearSelectedTasks,
  selectedTaskIds,
  onToggleSelect,
}) {
  return (
    <>
      {/* PAGE TITLE */}
      <h2 style={{ marginBottom: "12px" }}>{title}</h2>

      {/* TABS */}
      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => setActiveTab("TASKS")}
          style={{
            marginRight: "8px",
            background: activeTab === "TASKS" ? "#eef6f0" : "#fff",
          }}
        >
          Tasks
        </button>
        <button
          onClick={() => setActiveTab("FOCUS")}
          style={{
            background: activeTab === "FOCUS" ? "#eef6f0" : "#fff",
          }}
        >
          Focus
        </button>
      </div>

      {/* TASKS TAB */}
      {activeTab === "TASKS" && (
        <>
          {/* 🔹 TOP TOOLBAR (light background) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              background: "#f7f9f8",
              borderRadius: "10px",
              marginBottom: "16px",
            }}
          >
            {/* LEFT: ADD TASK INPUT */}
            <div style={{ flex: 1 }}>
              <TaskInput onAdd={addTask} />
            </div>

            {/* RIGHT: CLEAR BUTTON */}
            {showClearCompleted && (
              <button
                onClick={clearSelectedTasks}
                disabled={selectedTaskIds.length === 0}
                style={{
                  height: "36px",
                  padding: "0 14px",
                  borderRadius: "8px",
                  background:
                    selectedTaskIds.length === 0 ? "#eee" : "#ffffff",
                  border: "1px solid #ddd",
                  fontSize: "14px",
                  cursor:
                    selectedTaskIds.length === 0
                      ? "not-allowed"
                      : "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Clear Selected
              </button>
            )}
          </div>

          {/* TASK LIST CARD */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "10px",
              border: "1px solid #eee",
              padding: "8px 12px",
            }}
          >
            <TaskList
              tasks={tasks}
              selectedTaskIds={selectedTaskIds}
              onToggleSelect={onToggleSelect}
              onStart={startTask}
              onResume={resumeTask}
              onStatusChange={updateTaskStatus}
              onEdit={editTask}
            />
          </div>
        </>
      )}

      {/* FOCUS TAB */}
      {activeTab === "FOCUS" && (
        <div
          style={{
            background: "#f7f9f8",
            padding: "16px",
            borderRadius: "10px",
            border: "1px solid #eee",
          }}
        >
          <FocusTimer activeTask={activeTask} />
        </div>
      )}
    </>
  );
}

export default DayView;
