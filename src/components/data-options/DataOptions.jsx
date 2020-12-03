import React from 'react';


export const DataOptions = ({
  displayClosed,
  onDisplayClosedChange,
  onSortChange,
  sortOptions,
  sortOrder,
}) => (
  <>
    <div>
      <select
        value={sortOrder}
        onChange={onSortChange}
      >
        {sortOptions.map((option) => (
          <option key={option[0]} value={option[0]}>{option[1]}</option>
        ))}
      </select>
    </div>

    <label>
      <input type="checkbox" checked={displayClosed} onChange={onDisplayClosedChange} />
      <span>Show closed entries</span>
    </label>
  </>
);

export default DataOptions;
