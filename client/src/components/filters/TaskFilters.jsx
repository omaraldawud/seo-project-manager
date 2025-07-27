import React, { useState, useEffect } from "react";

export default function TaskFilters({ onChange }) {
  const [filters, setFilters] = useState({
    priority: "",
    category: "",
    completed: null,
  });

  useEffect(() => {
    if (onChange) onChange(filters);
  }, [filters]);

  return (
    <div>
      <div className="mb-3">
        <label className="form-label text-white">Priority</label>
        <select
          className="form-select"
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label text-white">Category</label>
        <select
          className="form-select"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All</option>
          <option value="On-Page">On-Page</option>
          <option value="Off-Page">Off-Page</option>
          <option value="Keyword">Keyword</option>
          <option value="Content">Content</option>
          <option value="Backlink">Backlink</option>
          <option value="Technical SEO">Technical</option>
        </select>
      </div>
    </div>
  );
}
