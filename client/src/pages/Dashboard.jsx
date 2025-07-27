import {
  Overview,
  Tasks,
  Projects,
  Exports,
  Users,
  Clients,
} from "../components/functional"; // ← make sure you import it

export default function Dashboard({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 0, label: "Overview", component: <Overview /> },
    { id: 1, label: "Clients", component: <Clients /> },
    { id: 2, label: "Projects", component: <Projects /> },
    { id: 3, label: "Tasks", component: <Tasks /> },
    { id: 4, label: "Users", component: <Users /> },
  ];

  return (
    <div className="d-flex justify-content-center px-3">
      <div style={{ maxWidth: "1400px", width: "100%" }}>
        {/* Tab Navigation */}
        <div className="tab-nav mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={` p-3 tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">{tabs[activeTab].component}</div>
      </div>
    </div>
  );
}
