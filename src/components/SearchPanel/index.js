import React from 'react';
import Input from '../Input';
import State from '../State';
import Table from '../Table';
import useRepositorySearch from '../../hooks/useRepositorySearch';
import useRepositoryResults from '../../hooks/useRepositoryResults';
import s from './style.css';

const SearchPanel = () => {
  const {
    q,
    value,
    loading,
    result,
    errors,
    inputChangeHandler,
  } = useRepositorySearch();

  const {
    columns,
    dataOnCurrentPage,
    rowsPerPage,
    currentPage,
    totalPageNumber,
    sortColumn,
    sortDescending,
    selectorChangeHandler,
    sortChangeHandler,
    paginatorChangeHandler,
    rowsPerPageOptions,
  } = useRepositoryResults({ q, result });

  return (
    <div className={s.wrapper}>
      <Input
        value={value}
        onChange={inputChangeHandler}
      />
      <State
        loading={loading}
        errors={errors}
        render={() => (
          <Table
            rowsPerPageOptions={rowsPerPageOptions}
            columns={columns}
            dataOnCurrentPage={dataOnCurrentPage}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            totalPageNumber={totalPageNumber}
            sortColumn={sortColumn}
            onSelectorChange={selectorChangeHandler}
            onColumnClick={sortChangeHandler}
            sortOrder={sortDescending ? 'sortDesc' : 'sortAsc'}
            onPageChange={paginatorChangeHandler}
          />
        )}
      />
    </div>
  )
};

export default SearchPanel;
