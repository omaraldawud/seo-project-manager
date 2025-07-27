// src/components/Sidebar.jsx
import React from "react";
import NavItem from "./NavItem";
import {
  faTachometerAlt,
  faFolder,
  faChartBar,
  faCheck,
  faDownload,
  faSearch,
  faFilter,
  faCog,
  faGlobe,
  faLink,
  faFileAlt,
  faBullseye,
  faCheckDouble,
  faListCheck,
  faUser,
  faDiagramProject,
  faFileExport,
  faKey,
  faUserShield,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { icon: faTachometerAlt, title: "Dashboard" },
    { icon: faUserFriends, title: "Clients" },
    { icon: faDiagramProject, title: "Projects" },
    { icon: faListCheck, title: "Tasks" },
    { icon: faUser, title: "Users" },
    { icon: faKey, title: "Keywords" },
    { icon: faFileAlt, title: "Content Optimizer" },
    { icon: faUserShield, title: "Competitors" },
    { icon: faFileExport, title: "Exports / Reports" },

    { icon: faCog, title: "Settings" }, // App configuration
  ];

  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <ul className="nav flex-column gap-1">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            title={item.title}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </ul>
    </div>
  );
}
