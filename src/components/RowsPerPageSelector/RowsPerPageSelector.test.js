import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import RowsPerPageSelector from './index';

it('Renders options.', () => {
  const options = ['10', '50', '100'];
  const rowsPerPage = 10;
  const mockOnSelectorChange = jest.fn();
  const { getByText } = render(
    <RowsPerPageSelector
      options={options}
      rowsPerPage={rowsPerPage}
      onSelectorChange={mockOnSelectorChange}
    />
  );
  options.forEach(option => {
    expect(getByText(option)).toBeTruthy();
  });
});

describe('When option is clicked', () => {
  it('Calls onChange.', () => {
    const options = ['10', '50', '100'];
    const rowsPerPage = 10;
    const mockOnSelectorChange = jest.fn();
    const { getByText } = render(
      <RowsPerPageSelector
        options={options}
        rowsPerPage={rowsPerPage}
        onSelectorChange={mockOnSelectorChange}
      />
    );
    const option = getByText('50');
    fireEvent.click(option);
    expect(mockOnSelectorChange).toHaveBeenCalled();
  })
  it('Changes active option properly.', () => {
    const options = ['10', '50', '100'];
    const SelectorTest = () => {
      const [currentOption, setCurrentOption] = useState(10);
      return (
        <RowsPerPageSelector
          options={options}
          rowsPerPage={currentOption}
          onSelectorChange={setCurrentOption}
        />
      );
    }
    const { getByText } = render(<SelectorTest />);
    const option = getByText('50');
    fireEvent.click(option);
    expect(option.classList.contains('active')).toBeTruthy();
  })
});
