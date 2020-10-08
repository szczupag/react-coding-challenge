import React from 'react';
import { render } from '@testing-library/react';
import State from './index';

it('Calls render properly.', () => {
  const mockRender = jest.fn();
  render(
    <State
      loading={false}
      errors={false}
      render={mockRender}
    />);
  expect(mockRender).toHaveBeenCalled();
});

describe("Doesn't call render when", () => {
  it('loading property is set to true', () => {
    const mockRender = jest.fn();
    render(
      <State
        loading={true}
        errors={false}
        render={mockRender}
      />);
    expect(mockRender).toHaveBeenCalledTimes(0);
  })
  it('errors property is set to true', () => {
    const mockRender = jest.fn();
    render(
      <State
        loading={false}
        errors={true}
        render={mockRender}
      />);
    expect(mockRender).toHaveBeenCalledTimes(0);
  });
})
