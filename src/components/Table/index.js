import React from 'react';
import TableHead from '../TableHead';
import TableBody from '../TableBody';
import RowsPerPageSelector from '../RowsPerPageSelector';
import Paginator from '../Paginator';
import s from './style.css';

const Table = ({
  columns,
  dataOnCurrentPage,
  rowsPerPage,
  currentPage,
  totalPageNumber,
  sortColumn,
  sortOrder,
  onSelectorChange,
  onColumnClick,
  onPageChange,
  rowsPerPageOptions,
}) => (
    <>
      <RowsPerPageSelector
        options={rowsPerPageOptions}
        rowsPerPage={rowsPerPage}
        onSelectorChange={onSelectorChange}
      />
      <div className={s.wrapper}>
        <table className={s.table}>
          <TableHead
            columns={columns}
            onColumnClick={onColumnClick}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
          />
          <TableBody
            columnsNames={columns.map(el => el.name)}
            data={dataOnCurrentPage}
          />
        </table>
      </div>
      <Paginator
        currentPage={currentPage}
        totalPageNumber={totalPageNumber}
        onPageChange={onPageChange}
      />
    </>
  );

export default Table;
