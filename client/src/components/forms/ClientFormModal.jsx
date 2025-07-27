import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ClientFormModal({ onClose, onSuccess, client }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    if (client) {
      setName(client.name || "");
      setEmail(client.email || "");
      setCompany(client.company || "");
    }
  }, [client]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, email, company };

    try {
      if (client?._id) {
        await axios.put(
          `http://localhost:5000/api/clients/${client._id}`,
          payload
        );
        toast.success("✅ Client updated");
      } else {
        await axios.post("http://localhost:5000/api/clients", payload);
        toast.success("✅ Client added");
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("❌ Failed to save client");
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content p-4">
        <h5>{client ? "Edit Client" : "Add Client"}</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name *</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Company</label>
            <input
              className="form-control"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              {client ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
