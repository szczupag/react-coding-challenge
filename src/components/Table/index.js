import React, { useMemo } from 'react';
import TableHead from '../TableHead';
import TableRows from '../TableRows';

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
  const data = useMemo(() => reduceItems(result), [result]);

  return (
    <table>
      <TableHead columns={columns} />
      <TableRows
        columnsNames={columns.map(el => el.name)}
        data={data}
      />
    </table>
  );
};

export default Table;
