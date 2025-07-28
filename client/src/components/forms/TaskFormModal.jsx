import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function TaskFormModal({ onClose, onSuccess, task }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Low");
  const [completed, setCompleted] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [projectId, setProjectId] = useState(task?.projectId?._id || "");
  const [projects, setProjects] = useState([]);

  // Populate form if editing
  useEffect(() => {
    // Fetch all projects
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data));
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setCategory(task.category || "");
      setPriority(task.priority || "Low");
      setCompleted(task.completed || false);
      setAssignedTo(task.assignedTo || "");
      setTagsInput((task.tags || []).join(", "));
      setStartDate(
        task.startDate
          ? new Date(task.startDate).toISOString().split("T")[0]
          : ""
      );
      setDueDate(
        task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
      );
      setProjectId(task.projectId?._id || task.projectId || "");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return toast.error("Title is required");
    }
    if (!projectId) {
      return toast.error("Project is required");
    }
    const payload = {
      title: title.trim(),
      description,
      category,
      priority,
      completed,
      assignedTo,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      startDate,
      dueDate,
      projectId: projectId, // ⬅️ ADD THIS LINE
    };

    try {
      if (task?._id) {
        await axios.put(`http://localhost:5000/api/tasks/${task._id}`, payload);
        toast.success("✅ Task updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/tasks", payload);
        toast.success("✅ Task created successfully");
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to save task");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content p-4">
        <h5
          className="mb-3 text-success"
          style={{
            backGround: "#212529",
            color: "#20c997",
            fontWeight: 600,
            letterSpacing: "0.05em",
            borderBottom: "2px solid #20c997",
            textTransform: "uppercase",
          }}
        >
          {task ? "Edit Task" : "Add Task"}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Project *</label>
            <select
              className="form-select"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              required
            >
              <option value="">-- Select Project --</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          {/* Row 1: Title, Completed, Priority */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Title *</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="completed"
                  checked={completed}
                  onChange={() => setCompleted(!completed)}
                />
                <label className="form-check-label ms-2" htmlFor="completed">
                  Completed
                </label>
              </div>
            </div>
          </div>

          {/* Row 2: Category, Tags, AssignedTo */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="On-Page">On-Page</option>
                <option value="Off-Page">Off-Page</option>
                <option value="Content">Keyword</option>
                <option value="Keyword">Content</option>
                <option value="Backlink">Backlink</option>
                <option value="Technical">Technical</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Tags</label>
              <input
                type="text"
                className="form-control"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="comma-separated"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Assigned To</label>
              <input
                type="text"
                className="form-control"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              />
            </div>
          </div>

          {/* Row 3: Dates */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          {/* Row 4: Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Row 5: Notes (disabled) */}
          <div className="mb-3">
            <label className="form-label text-muted">Notes (coming soon)</label>
            <textarea
              className="form-control"
              disabled
              placeholder="This field will be available in future updates"
            />
          </div>

          {/* Row 6: Buttons */}
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {task ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
