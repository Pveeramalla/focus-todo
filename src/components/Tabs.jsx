function Tabs({activeTab, onChange}){
    return(
        <div>
            <button onClick={() =>onChange("TASKS")}
                style={{fontWeight: activeTab === "TASKS" ? "bold" : "normal",}}>
                Tasks
            </button>
            <button onClick={() =>onChange("FOCUS")}
                style={{fontWeight: activeTab === "FOCUS" ? "bold" : "normal",}}>
                Focus
            </button>
        </div>
    );
}

export default Tabs;