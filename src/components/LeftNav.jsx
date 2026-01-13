function LeftNav({ activeView, onChange }) {
  const items = [
    { key: "HOME", label: "Today", icon: "🌤️" },
    { key: "TOMORROW", label: "Tomorrow", icon: "⏭️" },
    { key: "WEEK", label: "This Week", icon: "📆" },
  ];

  return (
    <div
      style={{
        width: "220px",
        padding: "16px",
        borderRight: "1px solid #e5e7eb",
        background: "#fbfcfb",
      }}
    >

      {items.map((item) => (
        <div
          key={item.key}
          onClick={() => onChange(item.key)}
          style={{
            cursor: "pointer",
            padding: "8px 10px",
            borderRadius: "10px",
            marginBottom: "6px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background:
              activeView === item.key ? "#e8f5ee" : "transparent",
            fontWeight:
              activeView === item.key ? "600" : "400",
          }}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default LeftNav;
