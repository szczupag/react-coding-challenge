import React from 'react';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';

const State = ({
  loading,
  errors,
}) => (
  <>
    {loading && <LoadingSpinner />}
    {errors.length > 0 && <ErrorMessage />}
  </>
);

export default State;
