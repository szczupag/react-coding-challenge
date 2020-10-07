import React from 'react';

const TableRows = ({
  columnsNames,
  data,
}) => (
    <tbody>
      {data.map(row => (
        <tr>
          {columnsNames.map(columnName => (
            <td>{row[columnName]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );

export default TableRows;
