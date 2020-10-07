import React from 'react';
import s from './style.css';

const TableBody = ({
  columnsNames,
  data,
}) => (
    <tbody className={s.tableBody}>
      {data.map((row, index) => (
        <tr key={index}>
          {columnsNames.map(columnName => (
            <td key={columnName}>{row[columnName]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );

export default TableBody;
