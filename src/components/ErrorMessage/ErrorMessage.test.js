import React from 'react';
import { render } from '@testing-library/react';
import ErrorMessage from './index';

it('Displays error message.', () => {
  const message = "Error :(";
  const { getByText } = render(
    <ErrorMessage message={message} />
  );
  expect(getByText(message)).toBeTruthy();
});
