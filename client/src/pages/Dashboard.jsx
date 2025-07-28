import {
  Overview,
  Tasks,
  Projects,
  Exports,
  Users,
  Clients,
  Pages,
} from "../components/functional"; // ← make sure you import it

export default function Dashboard({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 0, label: "Overview", component: <Overview /> },
    { id: 1, label: "Clients", component: <Clients /> },
    { id: 2, label: "Projects", component: <Projects /> },
    { id: 3, label: "Tasks", component: <Tasks /> },
    { id: 4, label: "Users", component: <Users /> },
    { id: 5, label: "Pages", component: <Pages /> },
  ];

  return (
    <>
      <div class="dashboard-header justify-content-center ms-5 ps-2 p-1 mb-5">
        <h2>Welcome to the Dashboard</h2>
      </div>

      <div className="d-flex justify-content-center px-3">
        <div style={{ maxWidth: "1400px", width: "100%" }}>
          {/* Tab Navigation */}
          <div className="tab-nav bg-opacity-10 bg-info mb-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={` text-mute p-3 tab-btn ${
                  activeTab === tab.id ? "active" : ""
                }`}
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
    </>
  );
}
