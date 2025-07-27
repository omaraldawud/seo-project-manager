import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ClientFormModal from "../forms/ClientFormModal";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clients");
      setClients(res.data);
    } catch (err) {
      console.error("Failed to fetch clients", err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/clients/${id}`);
      toast.success("🗑️ Client deleted");
      fetchClients();
    } catch (err) {
      toast.error("❌ Failed to delete client");
    }
  };

  const updateClient = async (req, res) => {
    try {
      const updated = await Client.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(updated);
    } catch (err) {
      console.error("Error updating client:", err);
      res.status(500).json({ message: "Failed to update client" });
    }
  };

  return (
    <div className="dashboard-grid" style={{ minWidth: "100%" }}>
      {showModal && (
        <ClientFormModal
          client={selectedClient}
          onClose={() => {
            setShowModal(false);
            setSelectedClient(null);
          }}
          onSuccess={fetchClients}
        />
      )}

      <div className="card-tech" style={{ gridColumn: "1 / -1" }}>
        <div className="card-header-tech d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Clients</h3>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setShowModal(true)}
          >
            + Add Client
          </button>
        </div>

        <div className="card-body-tech">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client._id}>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.company}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => {
                            setSelectedClient(client);
                            setShowModal(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(client._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {clients.length === 0 && (
              <p className="text-center text-muted py-3">No clients yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
