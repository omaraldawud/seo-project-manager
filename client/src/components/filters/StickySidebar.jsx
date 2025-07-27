import React from "react";
import TaskFilters from "../filters/TaskFilters";
import UserFilters from "../filters/UserFilters";
import ProjectFilters from "../filters/ProjectFilters";

export default function StickySidebar({ activeTab }) {
  const renderFilters = () => {
    switch (activeTab) {
      case "Users":
        return <UserFilters />;
      case "Projects":
        return <ProjectFilters />;
      default:
        return null;
    }
  };

  return (
    <div
      className="position-sticky"
      style={{
        top: "80px",
        height: "calc(100vh - 100px)",
        width: "250px",
        background: "#f8f9fa",
        padding: "1rem",
        borderLeft: "1px solid #ddd",
        overflowY: "auto",
      }}
    >
      <h6 className="mb-3 text-primary">Filters</h6>
      {renderFilters()}
    </div>
  );
}
