import { useMemo } from "react";

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
  const tabComponents = useMemo(
    () => ({
      0: <Overview />,
      1: <Clients />,
      2: <Projects />,
      3: <Tasks />,
      4: <Users />,
      5: <Pages />,
    }),
    []
  );

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
      <div className="dashboard-header justify-content-center ms-5 ps-2 p-1 mb-5">
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

          {/* Tab Content with Transition Wrapper */}
          <div className="tab-transition-container">
            {Object.entries(tabComponents).map(([id, component]) => (
              <div
                key={id}
                className={`tab-pane ${
                  activeTab === Number(id) ? "active" : ""
                }`}
              >
                {component}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
