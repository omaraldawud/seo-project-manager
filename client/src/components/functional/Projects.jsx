import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProjectFormModal from "../forms/ProjectFormModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterClient, setFilterClient] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects");
      setProjects(res.data);
    } catch (err) {
      toast.error("Failed to load projects");
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clients");
      setClients(res.data);
    } catch (err) {
      toast.error("Failed to load clients");
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchClients();
  }, []);

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      toast.success("🗑️ Project deleted");
      fetchProjects();
    } catch (err) {
      toast.error("Failed to delete project");
    }
  };

  // Filtered & searched projects
  const filteredProjects = projects.filter((project) => {
    const matchesStatus = filterStatus ? project.status === filterStatus : true;
    const matchesClient = filterClient
      ? project.clientId === filterClient
      : true;
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesClient && matchesSearch;
  });

  return (
    <div className="card-tech">
      <div className="card-header-tech d-flex justify-content-between align-items-center">
        <h4 className="mb-0 text-white">Projects</h4>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setShowModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add Project
        </button>
      </div>

      {/* Filters Row */}
      <div className="p-3 d-flex flex-wrap gap-2 align-items-center">
        <button className="btn btn-sm btn-success">
          <FontAwesomeIcon icon={faFilter} className="me-2" />
          Filters:
        </button>

        <select
          className="form-select form-select-sm"
          style={{ width: "160px" }}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          className="form-select form-select-sm"
          style={{ width: "180px" }}
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
        >
          <option value="">All Clients</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search projects..."
          className="form-control form-control-sm"
          style={{ width: "220px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => {
            setFilterStatus("");
            setFilterClient("");
            setSearchTerm("");
          }}
        >
          Clear Filters
        </button>
      </div>

      <div className="card-body-tech">
        {showModal && (
          <ProjectFormModal
            project={selectedProject}
            onClose={() => {
              setShowModal(false);
              setSelectedProject(null);
            }}
            onSuccess={fetchProjects}
            clients={clients}
          />
        )}

        {filteredProjects.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Start</th>
                  <th>Due</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => {
                  const client = clients.find(
                    (c) => c._id === project.clientId
                  );
                  return (
                    <tr key={project._id}>
                      <td>{project.name}</td>
                      <td>{project.clientId?.name || "—"}</td>
                      <td>
                        <span
                          className={`badge text-bg-${
                            project.status === "Active"
                              ? "success"
                              : project.status === "Completed"
                              ? "secondary"
                              : "warning"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td>{project.startDate?.substring(0, 10) || "—"}</td>
                      <td>{project.dueDate?.substring(0, 10) || "—"}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEdit(project)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(project._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-muted py-4">No projects found</div>
        )}
      </div>
    </div>
  );
}
