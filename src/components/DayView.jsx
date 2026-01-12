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
      <h2>{title}</h2>

      {/* Tabs */}
      <div style={{ marginBottom: "12px" }}>
        <button onClick={() => setActiveTab("TASKS")}>Tasks</button>
        <button onClick={() => setActiveTab("FOCUS")}>Focus</button>
      </div>

      {/* TASKS TAB */}
      {activeTab === "TASKS" && (
        <>
          {/* 🔹 TOP TOOLBAR */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            {/* Left: Add Task */}
            <div style={{ flex: 1 }}>
              <TaskInput onAdd={addTask} />
            </div>

            {/* Right: Clear Selected */}
            {showClearCompleted && (
              <button
                onClick={clearSelectedTasks}
                disabled={selectedTaskIds.length === 0}
                style={{
                  whiteSpace: "nowrap",
                  height: "32px",
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* TASK LIST */}
          <TaskList
            tasks={tasks}
            selectedTaskIds={selectedTaskIds}
            onToggleSelect={onToggleSelect}
            onStart={startTask}
            onResume={resumeTask}
            onStatusChange={updateTaskStatus}
            onEdit={editTask}
          />
        </>
      )}

      {/* FOCUS TAB */}
      {activeTab === "FOCUS" && (
        <FocusTimer activeTask={activeTask} />
      )}
    </>
  );
}

export default DayView;
