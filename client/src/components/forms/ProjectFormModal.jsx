import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";

export default function ProjectFormModal({
  onClose,
  onSuccess,
  project,
  clients,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Planned");

  useEffect(() => {
    if (project) {
      setName(project.name || "");
      setDescription(project.description || "");
      setClientId(project.clientId || "");
      setStartDate(project.startDate?.substring(0, 10) || "");
      setDueDate(project.dueDate?.substring(0, 10) || "");
      setStatus(project.status || "Planned");
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      description,
      clientId,
      startDate,
      dueDate,
      status,
    };

    try {
      if (project?._id) {
        await axios.put(
          `http://localhost:5000/api/projects/${project._id}`,
          payload
        );
        toast.success("✅ Project updated");
      } else {
        await axios.post("http://localhost:5000/api/projects", payload);
        toast.success("✅ Project created");
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("❌ Failed to save project");
      console.error(err);
    }
  };

  const modal = (
    <div className="modal-overlay">
      <div className="modal-content p-4">
        <h5>{project ? "Edit Project" : "Add Project"}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Project Name *</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Client</label>
            <select
              className="form-select"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            >
              <option value="">-- Select Client --</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Planned">Planned</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {project ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}
