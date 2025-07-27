import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faServer,
  faDatabase,
  faMicrochip,
  faUser,
  faProjectDiagram,
  faTasks,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function Overview() {
  const [stats, setStats] = useState({ clients: 0, projects: 0, tasks: 0 });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clients, projects, tasks] = await Promise.all([
          axios.get("http://localhost:5000/api/clients"),
          axios.get("http://localhost:5000/api/projects"),
          axios.get("http://localhost:5000/api/tasks"),
        ]);
        setStats({
          clients: clients.data.length,
          projects: projects.data.length,
          tasks: tasks.data.length,
        });

        const recent = [
          {
            time: "2 min ago",
            text: `Added new task: '${tasks.data.at(-1)?.title || "—"}'`,
          },
          {
            time: "10 min ago",
            text: `Created project: '${projects.data.at(-1)?.name || "—"}'`,
          },
          {
            time: "30 min ago",
            text: `Added new client: '${clients.data.at(-1)?.name || "—"}'`,
          },
        ];
        setActivities(recent);
      } catch (err) {
        console.error("❌ Failed to load stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="row g-4">
      <div className="col-md-6">
        <div className="card shadow-sm p-3">
          <div className="d-flex align-items-center mb-3">
            <FontAwesomeIcon icon={faServer} className="me-2 text-primary" />
            <h5 className="mb-0">System SEO Overview</h5>
          </div>
          <div className="d-flex justify-content-around text-center">
            <MetricCard icon={faUser} title="Clients" value={stats.clients} />
            <MetricCard
              icon={faProjectDiagram}
              title="Projects"
              value={stats.projects}
            />
            <MetricCard icon={faTasks} title="Tasks" value={stats.tasks} />
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card shadow-sm p-3">
          <div className="d-flex align-items-center mb-3">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="me-2 text-success"
            />
            <h5 className="mb-0">Recent Activity</h5>
          </div>
          <ul className="list-group list-group-flush">
            {activities.map((a, idx) => (
              <li key={idx} className="list-group-item px-0 py-2">
                <div className="fw-semibold">{a.text}</div>
                <small className="text-muted">{a.time}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const MetricCard = ({ icon, title, value }) => (
  <div
    className="bg-light rounded px-3 py-2 shadow-sm"
    style={{ minWidth: "90px" }}
  >
    <FontAwesomeIcon icon={icon} className="mb-1 text-info fs-4" />
    <h4 className="m-0">{value}</h4>
    <div className="text-muted">{title}</div>
  </div>
);
