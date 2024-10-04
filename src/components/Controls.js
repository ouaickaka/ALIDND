import React from 'react';
import '../styles/main.css';

// BadgeFilterControls component
const BadgeFilterControls = ({ categoryFilter, setCategoryFilter, categoryColors, searchQuery, setSearchQuery, sortOrder, setSortOrder }) => {
  // Create a list of categories dynamically from `categoryColors`, excluding "Unknown"
  const categories = Object.keys(categoryColors).filter(cat => cat !== 'Unknown');

  return (
    <div className="controls">
      {/* Search Control */}
      <div className="control-item">
        <input
          id="searchQuery"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your soul..."
        />
      </div>

      {/* Filter by Category Control */}
      <div className="control-item">
        <select
          id="categoryFilter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort by Date Control */}
      <div className="control-item">
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default BadgeFilterControls;
