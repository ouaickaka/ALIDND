import React from 'react';
import { categories, sortOptions } from '../utils/config';

const Controls = ({ searchTerm, setSearchTerm, filterCategory, setFilterCategory, sortOrder, setSortOrder }) => (
  <div className="controls">
    <input
      type="text"
      placeholder="Search..."
      className="controls-input"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    
    <select
      className="controls-select"
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
    
    <select
      className="controls-select"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

export default Controls;
