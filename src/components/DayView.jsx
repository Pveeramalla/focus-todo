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
          <TaskInput onAdd={addTask} />

          {showClearCompleted && (
            <button
              onClick={clearSelectedTasks}
              disabled={selectedTaskIds.length === 0}
              style={{ marginBottom: "8px" }}
            >
              Clear Selected
            </button>
          )}

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
