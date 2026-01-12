function LeftNav({ activeView, onChange }) {
  return (
    <div style={{ width: "180px", borderRight: "1px solid #ddd", padding: "8px" }}>
      <div>
        <button onClick={() => onChange("HOME")}>🏠 Home</button>
      </div>

      <div>
        <button onClick={() => onChange("TOMORROW")}>⏭ Tomorrow</button>
      </div>

      <div>
        <button onClick={() => onChange("WEEK")}>📆 This Week</button>
      </div>
    </div>
  );
}

export default LeftNav;
