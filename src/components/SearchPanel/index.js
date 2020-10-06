import React from 'react';
import Input from '../Input';
import useRepositorySearch from '../../hooks/useRepositorySearch';

const SearchPanel = () => {
  const {
    value,
    loading,
    result,
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
      {`Is loading: ${loading}`}
      {JSON.stringify(result)}
    </div>
  )
};

export default SearchPanel;
