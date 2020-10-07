import React from 'react';

const TableHead = ({
  columns
}) => (
    <thead>
      <tr>
        {columns.map(({ name, label }) => (
          <th key={name}>{label}</th>
        ))}
      </tr>
    </thead>
  );

export default TableHead;
