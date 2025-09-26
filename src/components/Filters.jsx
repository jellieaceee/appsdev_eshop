// src/components/Filters.jsx
import React, { useState, useEffect } from 'react';

const Filters = ({ products, onFilter }) => {
  const [category, setCategory] = useState('all');

  // Extract unique categories from products
  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Whenever category changes, filter products
  useEffect(() => {
    let filtered = products;

    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    onFilter(filtered);
  }, [category, products, onFilter]);

  return (
    
<div className="filter-container">
  <label>Filter by category: </label>
  <select value={category} onChange={e => setCategory(e.target.value)}>
    {categories.map(c => (
      <option key={c} value={c}>{c}</option>
    ))}
  </select>
</div>

  );
};

export default Filters;
