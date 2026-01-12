function LeftNav({ activeView, onChange }) {
  const items = [
    { key: "HOME", label: "Today", icon: "🌤️" },
    { key: "TOMORROW", label: "Tomorrow", icon: "⏭️" },
    { key: "WEEK", label: "This Week", icon: "📆" },
  ];

  return (
    <div
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "#f1f4f1",            // light sidebar background
        padding: "16px",
        borderRight: "1px solid #e5e7eb",
        boxSizing: "border-box",
      }}
    >
      {/* App Title */}
      <div
        style={{
          fontWeight: "700",
          fontSize: "18px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        📌 <span>Focus</span>
      </div>

      {/* Navigation Items */}
      {items.map((item) => {
        const isActive = activeView === item.key;

        return (
          <div
            key={item.key}
            onClick={() => onChange(item.key)}
            style={{
              cursor: "pointer",
              padding: "10px 12px",
              borderRadius: "8px",
              marginBottom: "6px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: isActive ? "#eaf2ea" : "transparent",
              fontWeight: isActive ? 600 : 400,
              color: "#1f2937",
            }}
          >
            <span style={{ fontSize: "16px" }}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default LeftNav;
