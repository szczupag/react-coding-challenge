import React from 'react';
import Input from '../Input';
import useRepositorySearch from '../../hooks/useRepositorySearch';
import State from '../State';
import Table from '../Table';

const SearchPanel = () => {
  const {
    value,
    loading,
    result,
    errors,
    inputChangeHandler,
    buttonClickHandler,
  } = useRepositorySearch();

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
        render={() => <Table result={result} />}
      />
    </div>
  )
};

export default SearchPanel;
