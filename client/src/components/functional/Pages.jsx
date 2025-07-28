import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PageFormModal from "../forms/PageFormModal";

export default function Pages() {
  const [pages, setPages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [pageRes, projectRes, clientRes] = await Promise.all([
        axios.get("/api/pages"),
        axios.get("/api/projects"),
        axios.get("/api/clients"),
      ]);
      setPages(pageRes.data);
      setProjects(projectRes.data);
      setClients(clientRes.data);
    } catch (err) {
      toast.error("Failed to load data");
      console.error(err);
    }
  };

  const handleEdit = (page) => {
    setSelectedPage(page);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this page?")) return;
    try {
      await axios.delete(`/api/pages/${id}`);
      toast.success("🗑️ Page deleted");
      fetchAll();
    } catch (err) {
      toast.error("Failed to delete page");
    }
  };

  const filteredPages = pages.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProject = (id) => projects.find((p) => p._id === id);

  const getClient = (projectId) => {
    const project = getProject(projectId);
    return clients.find((c) => c._id === project?.clientId);
  };

  return (
    <div className="card-tech">
      <div className="card-header-tech d-flex justify-content-between align-items-center flex-wrap">
        <div>
          <h4 className="text-white">Pages</h4>
          {/* Breadcrumbs */}
          {filteredPages.length > 0 && (
            <div className="text-light small">
              {(() => {
                const firstPage = filteredPages[0];
                const project = getProject(firstPage.projectId);
                const client = getClient(firstPage.projectId);
                return (
                  <>
                    <strong>{client?.name || "Client"}</strong> &gt;{" "}
                    <strong>{project?.name || "Project"}</strong> &gt; Pages
                  </>
                );
              })()}
            </div>
          )}
        </div>

        <div className="d-flex gap-2 align-items-center">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "220px" }}
          />
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setShowModal(true)}
          >
            + Add Page
          </button>
        </div>
      </div>

      <div className="card-body-tech">
        {showModal && (
          <PageFormModal
            page={selectedPage}
            onClose={() => {
              setShowModal(false);
              setSelectedPage(null);
            }}
            onSuccess={fetchAll}
            projects={projects}
          />
        )}

        {filteredPages.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>URL</th>
                  <th>Meta Title</th>
                  <th>H1</th>
                  <th>Keywords</th>
                  <th>Project</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPages.map((page) => {
                  const project = getProject(page.projectId);
                  return (
                    <tr key={page._id}>
                      <td>{page.title}</td>
                      <td>{page.url}</td>
                      <td>{page.metaTitle}</td>
                      <td>{page.h1}</td>
                      <td>{(page.keywords || []).join(", ")}</td>
                      <td>{page.projectId?.name || "—"}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEdit(page)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(page._id)}
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
          <div className="text-muted text-center py-4">No pages found</div>
        )}
      </div>
    </div>
  );
}
