import React from "react";

export default function UserFilters({ filters, setFilters }) {
  return (
    <div
      className="filter-panel p-3 border bg-white sticky-top"
      style={{ top: "80px" }}
    >
      <h6 className="mb-3">User Filters</h6>

      <div className="mb-3">
        <label className="form-label">Role</label>
        <select
          className="form-select"
          value={filters.role || ""}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        >
          <option value="">All</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Search by Name</label>
        <input
          type="text"
          className="form-control"
          value={filters.name || ""}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          placeholder="e.g., Omar"
        />
      </div>
    </div>
  );
}
