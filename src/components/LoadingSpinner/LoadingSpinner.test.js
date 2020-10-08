import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from './index';

it('Renders loading spinner.', () => {
  const loading = 'Loading...'
  const { getByText } = render(
    <LoadingSpinner />
  );
  expect(getByText(loading)).toBeTruthy();
});
