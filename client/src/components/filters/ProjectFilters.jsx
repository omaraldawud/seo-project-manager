import React from "react";

export default function ProjectFilters({ filters, setFilters, clients }) {
  return (
    <div
      className="filter-panel p-3 border bg-white sticky-top"
      style={{ top: "80px" }}
    >
      <h6 className="mb-3">Project Filters</h6>

      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          value={filters.status || ""}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All</option>
          <option value="Planned">Planned</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Client</label>
        <select
          className="form-select"
          value={filters.clientId || ""}
          onChange={(e) => setFilters({ ...filters, clientId: e.target.value })}
        >
          <option value="">All Clients</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Search by Project Name</label>
        <input
          type="text"
          className="form-control"
          value={filters.name || ""}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          placeholder="e.g., Redesign SEO"
        />
      </div>
    </div>
  );
}
