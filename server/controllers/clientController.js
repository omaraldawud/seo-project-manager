import Client from "../models/Client.js";
import { logActivity } from "../utils/logActivity.js";

// Get all clients
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch clients" });
  }
};

// Create new client
export const createClient = async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    // ✅ Log activity
    await logActivity({
      text: `New client "${client.name}" added.`,
      entityType: "client",
      entityId: client._id,
    });
    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({ message: "Failed to create client" });
  }
};

export const updateClient = async (req, res) => {
  try {
    const updated = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Client not found" });
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update client" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "✅ Client deleted" });
  } catch (err) {
    res.status(500).json({ message: "🧪 Failed to delete Client" });
  }
};
