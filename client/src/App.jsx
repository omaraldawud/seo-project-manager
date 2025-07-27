import { useState } from "react";
import GreenSideBar from "./components/layout/GreenSideBar";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./pages/Dashboard";
import "./assets/css/dashboard.css";

export default function App() {
  const [activeTab, setActiveTab] = useState(0); // Initialize with first tab

  return (
    <div className="d-flex vh-100">
      {/* First Sidebar (Vertical Text) */}
      <div
        className="d-flex flex-column bg-success min-vh-100 p-4"
        style={{ width: "40px" }}
      >
        <GreenSideBar />
      </div>

      {/* Second Sidebar (With Logo) */}
      <div
        className="d-flex flex-column bg-secondary"
        style={{ minHeight: "100vh" }}
      >
        <div className="header-wrapper">
          {" "}
          {/* Can add className for styling */}
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              height: "100px",
              minHeight: "100px",
              flexShrink: 0,
              background: `
            linear-gradient(135deg, #0a192f 0%, #172a45 100%),
            url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0z' fill='none'/%3E%3Cpath d='M1 1h2v2H1zm4 0h2v2H5zm4 0h2v2H9zm4 0h2v2h-2zM1 5h2v2H1zm4 0h2v2H5zm4 0h2v2H9zm4 0h2v2h-2zM1 9h2v2H1zm4 0h2v2H5zm4 0h2v2H9zm4 0h2v2h-2zM1 13h2v2H1zm4 0h2v2H5zm4 0h2v2H9zm4 0h2v2h-2zM1 17h2v2H1zm4 0h2v2H5zm4 0h2v2H9zm4 0h2v2h-2z' fill='%2300b4d8' fill-opacity='0.1'/%3E%3C/svg%3E")
          `,
              backgroundBlendMode: "overlay",
              borderBottom: "2px solid rgba(0, 180, 216, 0.3)",
            }}
          >
            <img
              src="/images/seo-tracker-logo.svg"
              alt="SEO Tracker logo"
              style={{ height: "80px", width: "250px" }}
            />
          </div>
          {/* You could add other elements here if needed */}
        </div>

        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content Area */}
      <div className="d-flex flex-column flex-grow-1 overflow-auto">
        <Topbar />
        <main className="container-fluid p-4" style={{ width: "1200px" }}>
          <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} />
        </main>
      </div>
    </div>
  );
}
