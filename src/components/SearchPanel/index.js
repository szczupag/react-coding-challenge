import React from 'react';
import Input from '../Input';
import State from '../State';
import Table from '../Table';
import useRepositorySearch from '../../hooks/useRepositorySearch';
import useRepositoryResults from '../../hooks/useRepositoryResults';

const SearchPanel = () => {
  const {
    q,
    value,
    loading,
    result,
    errors,
    inputChangeHandler,
    buttonClickHandler,
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
  } = useRepositoryResults({ q, result });

  return (
    <div>
      <Input
        value={value}
        onChange={inputChangeHandler}
        onClick={buttonClickHandler}
      />
      <State
        loading={loading}
        errors={errors}
        render={() => (
          <Table
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
