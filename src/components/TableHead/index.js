import React from 'react';
import s from './style.css';

const TableHead = ({
  columns,
  onColumnClick,
  sortColumn,
  sortOrder,
}) => (
    <thead className={s.tableHead}>
      <tr>
        {columns.map(({ name, label }) => {
          const columnClass = sortColumn === name ? sortOrder : '';
          return (
            <th
              key={name}
              onClick={() => onColumnClick(name)}
              className={s[columnClass]}
            >
              {label}
              <div className={s.sortIcon}></div>
            </th>
          )
        })}
      </tr>
    </thead>
  );

export default TableHead;
