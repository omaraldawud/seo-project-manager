import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faFolder,
  faPlus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import TaskFormModal from "../forms/TaskFormModal";
import StickySidebar from "../filters/TaskFilters";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function Tasks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterCompleted, setFilterCompleted] = useState(null);
  const [filterPriority, setFilterPriority] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
        toast.success("🗑️ Task deleted");
        fetchTasks();
      } catch (err) {
        toast.error("Failed to delete task");
      }
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // local functiona
  const handleToggleStatus = async (taskId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${taskId}/status`, {
        completed: newStatus,
      });
      toast.success(`Task marked as ${newStatus ? "completed" : "pending"}`);
      fetchTasks(); // reload the list
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };

  /////////// Search and Filters ///////
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterPriority ? task.priority === filterPriority : true) &&
      (filterCategory ? task.category === filterCategory : true) &&
      (filterCompleted === null ? true : task.completed === filterCompleted)
  );

  return (
    <div className="dashboard-grid" style={{ minWidth: "100%" }}>
      <ToastContainer position="top-right" autoClose={3000} />
      {showModal && (
        <TaskFormModal
          onClose={() => {
            setShowModal(false);
            setSelectedTask(null);
          }}
          onSuccess={fetchTasks}
          task={selectedTask}
        />
      )}

      <div className="card-tech" style={{ gridColumn: "1 / -1" }}>
        <div className="d-flex p-2">
          <div>
            <h3 className="p-4 text text-white">SEO Tasks</h3>
          </div>

          <div className="search-bar" style={{ width: "300px" }}>
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <FontAwesomeIcon icon={faFilter} className="filter-icon" />
          </div>
        </div>
        <div className="card-header-tech">
          <div className="d-flex justify-content-between align-items-center w-100">
            {/* Second div - takes 20% width and right-aligned */}
            <div className="w-10 text-end">
              {/* Custom width - see note below */}
              <button
                style={{ backgroundColor: "#00b4d8" }}
                className="btn btn-sm d-inline-block"
                onClick={() => setShowModal(true)}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Add Task
              </button>
            </div>
            <div className="d-flex gap-2 align-items-center">
              {/* First div - takes 80% width */}
              <div className="w-90">
                {" "}
                {/* Custom width - see note below */}
                <div className="d-flex gap-2 align-items-center flex-wrap">
                  {" "}
                  {/* Added flex-wrap */}
                  <button
                    style={{ backgroundColor: "green" }}
                    className="btn btn-sm"
                  >
                    <FontAwesomeIcon icon={faFilter} className="me-2" />
                    Filters:
                  </button>
                  <button
                    className={`btn btn-sm ${
                      filterCompleted === null
                        ? "btn-light"
                        : filterCompleted
                        ? "btn-success"
                        : "btn-secondary"
                    }`}
                    onClick={() => {
                      setFilterCompleted((prev) =>
                        prev === null ? true : prev === true ? false : null
                      );
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} className="me-2" />
                    {filterCompleted === null
                      ? "All Tasks"
                      : filterCompleted
                      ? "Completed"
                      : "Pending"}
                  </button>
                  <select
                    className="form-select form-select-sm me-2"
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    style={{ width: "140px" }}
                  >
                    <option value="">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <select
                    className="form-select form-select-sm me-2"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={{ width: "160px" }}
                  >
                    <option value="">All Categories</option>
                    <option value="On-Page">On-Page SEO</option>
                    <option value="Off-Page">Off-Page SEO</option>
                    <option value="Keyword">Keyword</option>
                    <option value="Content">Content</option>
                    <option value="Backlink">Backlink</option>
                    <option value="Technical SEO">Technical</option>
                  </select>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => {
                      setFilterPriority("");
                      setFilterCategory("");
                      setFilterCompleted(null);
                      setSearchTerm("");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body-tech">
          {filteredTasks.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th style={{ minWidth: "200px" }}>Title</th>
                    <th>Project</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Start</th>
                    <th>Due</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTasks.map((task) => (
                    <tr key={task._id}>
                      <td className="text-nowrap">
                        <FontAwesomeIcon
                          icon={faFolder}
                          className="collection-icon me-2 text-muted"
                        />
                        {task.title}
                      </td>
                      <td>{task.projectId?.name || "N/A"}</td>
                      <td className="text-capitalize">{task.category}</td>

                      <td>
                        <span
                          className={`badge text-uppercase ${
                            task.priority === "High"
                              ? "bg-danger"
                              : task.priority === "Medium"
                              ? "bg-warning text-dark"
                              : "bg-success"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="form-check form-switch mb-0">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              checked={task.completed}
                              onChange={() =>
                                handleToggleStatus(task._id, !task.completed)
                              }
                            />
                          </div>
                          <span
                            className={`badge ${
                              task.completed ? "bg-success" : "bg-secondary"
                            }`}
                          >
                            {task.completed ? "Completed" : "Pending"}
                          </span>
                        </div>
                      </td>
                      <td>
                        {task.startDate
                          ? new Date(task.startDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td>
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEdit(task)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(task._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-results text-center py-4">
              No tasks found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
