import React from 'react';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';

const State = ({
  loading,
  errors,
  render
}) => (
  <>
    {loading && <LoadingSpinner />}
    {errors && <ErrorMessage />}
    {!loading && !errors && render()}
  </>
);

export default State;
