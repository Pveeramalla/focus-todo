import { useState } from "react";

// helper to convert 24h time to AM/PM
const formatTime = (time24) => {          
  const [h, m] = time24.split(":");       
  const hour = Number(h);                 
  const ampm = hour >= 12 ? "PM" : "AM";  
  const hour12 = hour % 12 || 12;         
  return `${hour12}:${m} ${ampm}`;     
};

function TaskItem({ task, onDone, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [time, setTime] = useState(task.time || "");

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onEdit(task.id, text, time);
    setIsEditing(false);
  };

  return (
    <li style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      {isEditing ? (
        <form
          onSubmit={handleEditSubmit}
          style={{ display: "flex", gap: "8px", flex: 1 }}
        >
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <span style={{ flex: 1 }}>
            {task.text}
            {task.time && (
              <span> ⏰ {formatTime(task.time)}</span> 
            )}
          </span>

          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDone(task.id)}>Done</button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
