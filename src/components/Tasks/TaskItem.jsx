import { useState } from "react";

function TaskItem({ task, onDone, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [time, setTime] = useState(task.time || "");

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onEdit(task.id, text.trim(), time);
    setIsEditing(false);
  };

  return (
    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {isEditing ? (
        <form
          onSubmit={handleEditSubmit}
          style={{ display: "flex", gap: "8px", flex: 1 }}
        >
          <input value={text} onChange={(e) => setText(e.target.value)} style={{ flex: 1 }} />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <span style={{ flex: 1 }}>
            {task.text}{" "}
            {task.time ? (
              <span style={{ marginLeft: "6px", opacity: 0.7 }}>
                ⏰ {task.time}
              </span>
            ) : null}
          </span>

          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDone(task.id)}>Done</button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
