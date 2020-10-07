import React, { useEffect, useState } from 'react';
import TableHead from '../TableHead';
import TableBody from '../TableBody';
import s from './style.css';

const reduceItems = (items) => {
  return items.map(item => ({
    name: item.full_name,
    owner: item.owner.login,
    stars: Number(item.stargazers_count),
    createdAt: new Date(item.created_at).toISOString().split('T')[0],
  }));
};

const columns = [
  { name: 'name', label: 'Name' },
  { name: 'owner', label: 'Owner' },
  { name: 'stars', label: 'Stars' },
  { name: 'createdAt', label: 'Created at' },
];

const Table = ({
  result,
}) => {
  const [data, setData] = useState([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortDescending, setSortDescending] = useState(true);

  useEffect(() => {
    const reducedItems = reduceItems(result);
    setData(reducedItems);
  }, [result]);

  useEffect(() => {
    if (sortColumn) {
      const sortedData = [...data].sort((a, b) => {
        const result = (a[sortColumn] < b[sortColumn]) ? -1 : (a[sortColumn] > b[sortColumn]) ? 1 : 0;
        if (sortDescending) return result * -1;
        return result;
      });
      setData(sortedData);
    }
  }, [sortColumn, sortDescending]);

  const onSortChangeHandler = (column) => {
    if (sortColumn === column) {
      setSortDescending(!sortDescending);
    } else {
      setSortColumn(column);
      setSortDescending(true);
    }
  };

  return (
    <table className={s.table}>
      <TableHead
        columns={columns}
        onClick={onSortChangeHandler}
        sortColumn={sortColumn}
        sortOrder={sortDescending ? 'sortDesc' : 'sortAsc'}
      />
      <TableBody
        columnsNames={columns.map(el => el.name)}
        data={data}
      />
    </table>
  );
};

export default Table;
