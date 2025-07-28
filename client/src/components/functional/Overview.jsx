import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faProjectDiagram,
  faTasks,
  faFileAlt,
  faWarning,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

// Reusable card component
const MetricCard = ({ icon, title, value, color = "primary" }) => (
  <div
    className="bg-light rounded px-3 py-2 shadow-sm"
    style={{ minWidth: "90px" }}
  >
    <FontAwesomeIcon icon={icon} className={`mb-1 text-${color} fs-4`} />
    <h4 className="m-0">{value}</h4>
    <div className="text-muted">{title}</div>
  </div>
);

// SEO Summary Section
const SeoSummary = ({ stats }) => (
  <div className="card shadow-sm p-3">
    <div className="d-flex align-items-center mb-3">
      <FontAwesomeIcon icon={faProjectDiagram} className="me-2 text-primary" />
      <h5 className="mb-0">SEO Overview</h5>
    </div>
    <div className="d-flex flex-wrap gap-3 justify-content-around">
      <MetricCard icon={faUser} title="Clients" value={stats.clients} />
      <MetricCard
        icon={faProjectDiagram}
        title="Projects"
        value={stats.projects}
      />
      <MetricCard icon={faTasks} title="Tasks" value={stats.tasks} />
      <MetricCard icon={faFileAlt} title="Pages" value={stats.pages} />
    </div>
  </div>
);

// SEO Issues Section
const SeoIssues = ({ stats }) => (
  <div className="card shadow-sm p-3">
    <div className="d-flex align-items-center mb-3">
      <FontAwesomeIcon icon={faWarning} className="me-2 text-warning" />
      <h5 className="mb-0">SEO Issues</h5>
    </div>
    <div className="d-flex flex-wrap gap-3 justify-content-around">
      <MetricCard
        icon={faFileAlt}
        title="Missing Meta Title"
        value={stats.missingMetaTitle}
        color="danger"
      />
      {/* Placeholder for you:  */}
      {/* <MetricCard title="Missing Meta Description" value={...} /> */}
      {/* <MetricCard title="Missing Meta Keywords" value={...} /> */}
      <MetricCard
        icon={faFileAlt}
        title="Missing H1"
        value={stats.missingH1}
        color="danger"
      />
      <MetricCard
        icon={faFileAlt}
        title="Missing H2s"
        value={stats.missingH2s}
        color="danger"
      />
    </div>
  </div>
);

// Recent Activity Section
const ActivityList = ({ activities }) => (
  <div className="card shadow-sm p-3">
    <div className="d-flex align-items-center mb-3">
      <FontAwesomeIcon icon={faCircleCheck} className="me-2 text-success" />
      <h5 className="mb-0">Recent Activity</h5>
    </div>
    {activities.length > 0 ? (
      <ul className="list-group list-group-flush">
        {activities.map((a, idx) => (
          <li key={idx} className="list-group-item px-0 py-2">
            <div className="fw-semibold">{a.text}</div>
            <small className="text-muted">{a.time}</small>
          </li>
        ))}
      </ul>
    ) : (
      <div className="text-muted">No recent activity yet.</div>
    )}
  </div>
);

export default function Overview() {
  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    tasks: 0,
    pages: 0,
    missingMetaTitle: 0,
    missingH1: 0,
    missingH2s: 0,
    noOFH2s: 0,
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clientsRes, projectsRes, tasksRes, pagesRes, activityRes] =
          await Promise.all([
            axios.get("http://localhost:5000/api/clients"),
            axios.get("http://localhost:5000/api/projects"),
            axios.get("http://localhost:5000/api/tasks"),
            axios.get("http://localhost:5000/api/pages"),
            axios.get("http://localhost:5000/api/activity"),
          ]);

        const pages = pagesRes.data;

        const missingMetaTitle = pages.filter((p) => !p.metaTitle).length;
        const missingH1 = pages.filter((p) => !p.h1).length;
        const missingH2s = pages.filter(
          (p) => !p.h2s || p.h2s.length === 0
        ).length;
        const noOFH2s = pages.reduce((total, page) => {
          return total + (page.h2s ? page.h2s.length : 0);
        }, 0);

        setStats({
          clients: clientsRes.data.length,
          projects: projectsRes.data.length,
          tasks: tasksRes.data.length,
          pages: pages.length,
          missingMetaTitle,
          missingH1,
          missingH2s,
          noOFH2s,
        });

        setActivities(
          activityRes.data.map((a) => ({
            text: a.text,
            time: new Date(a.date).toLocaleString(),
          }))
        );
      } catch (err) {
        console.error("❌ Failed to load stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="row g-4">
      <div className="col-md-6">
        <SeoSummary stats={stats} />
      </div>
      <div className="col-md-6">
        <SeoIssues stats={stats} />
      </div>
      <div className="col-md-12">
        <ActivityList activities={activities} />
      </div>
    </div>
  );
}
