import { useState } from "react";

function TaskItem({ task, onDone, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(task.id, text);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
      ) : (
        <>
          {task.text}
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDone(task.id)}>Done</button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
