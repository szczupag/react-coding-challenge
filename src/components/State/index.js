import React from 'react';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';

const State = ({
  loading,
  errors,
  render,
}) => (
  <>
    {loading && <LoadingSpinner />}
    {errors && <ErrorMessage message={"Couldn't get results. Please, try again later."} />}
    {!loading && !errors && render()}
  </>
);

export default State;
