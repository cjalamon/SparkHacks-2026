import React from 'react';

function FilterChips({ activeFilter, setActiveFilter }) {
  const filters = [
    'All Creatives',
    'Filmmakers',
    'Actors',
    'Cameramen',
    'Editors',
    'Writers',
    'Musicians',
    'Photographers'
  ];

  return (
    <div className="filter-chips">
      {filters.map((filter) => (
        <div
          key={filter}
          className={`chip ${activeFilter === filter ? 'active' : ''}`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </div>
      ))}
    </div>
  );
}

export default FilterChips;