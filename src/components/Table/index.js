import React, { useEffect, useState } from 'react';
import TableHead from '../TableHead';
import TableBody from '../TableBody';
import RowsPerPageSelector from '../RowsPerPageSelector';
import Paginator from '../Paginator';
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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState();
  const [dataOnCurrentPage, setDataOnCurrentPage] = useState([]);

  const onResultChange = () => {
    const reducedItems = reduceItems(result);
    setData(reducedItems);
  };

  const onSortChange = () => {
    if (sortColumn) {
      const sortedData = [...data].sort((a, b) => {
        const result = (a[sortColumn] < b[sortColumn]) ? -1 : (a[sortColumn] > b[sortColumn]) ? 1 : 0;
        if (sortDescending) return result * -1;
        return result;
      });
      setData(sortedData);
    }
  };

  const onRowsPerPageChange = () => {
    setTotalPageNumber(Math.ceil(data.length/rowsPerPage));
  };

  const onPageChange = () => {
    const pageRangeStart = (currentPage - 1) * rowsPerPage;
    const pageRangeEnd = currentPage * rowsPerPage;
    setDataOnCurrentPage(data.slice(pageRangeStart,pageRangeEnd));
  }

  useEffect(() => onResultChange(), [result]);
  useEffect(() => onSortChange(), [sortColumn, sortDescending]);
  useEffect(() => onRowsPerPageChange(), [data, rowsPerPage]);
  useEffect(() => onPageChange(), [data, rowsPerPage, currentPage]);

  const sortChangeHandler = (column) => {
    if (sortColumn === column) {
      setSortDescending(!sortDescending);
    } else {
      setSortColumn(column);
      setSortDescending(true);
    }
  };

  const selectorChangeHandler = (count) => {
    setCurrentPage(1);
    setRowsPerPage(count);
  };

  const paginatorChangeHandler = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <RowsPerPageSelector
        rowsPerPage={rowsPerPage}
        onSelectorChange={selectorChangeHandler}
      />
      <table className={s.table}>
        <TableHead
          columns={columns}
          onColumnClick={sortChangeHandler}
          sortColumn={sortColumn}
          sortOrder={sortDescending ? 'sortDesc' : 'sortAsc'}
        />
        <TableBody
          columnsNames={columns.map(el => el.name)}
          data={dataOnCurrentPage}
        />
      </table>
      <Paginator
        currentPage={currentPage}
        totalPageNumber={totalPageNumber}
        onPageChange={paginatorChangeHandler}
      />
    </>
  );
};

export default Table;
