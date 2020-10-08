import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import Paginator from './index';

it('Renders pages indicators.', () => {
  const pages = ['1', '2', '3'];
  const currentPage = 1;
  const mockOnPageChange = jest.fn();
  const { getByText } = render(
    <Paginator
      currentPage={currentPage}
      totalPageNumber={pages.length}
      onPageChange={mockOnPageChange}
    />
  );
  pages.forEach(page => {
    expect(getByText(page)).toBeTruthy();
  });
});

describe('When indicator is clicked', () => {
  it('Calls onChange.', () => {
    const pages = ['1', '2', '3'];
    const currentPage = 1;
    const mockOnPageChange = jest.fn();
    const { getByText } = render(
      <Paginator
        currentPage={currentPage}
        totalPageNumber={pages.length}
        onPageChange={mockOnPageChange}
      />
    );
    const indicator = getByText('2');
    fireEvent.click(indicator);
    expect(mockOnPageChange).toHaveBeenCalled();
  })
  it('Changes active page properly.', () => {
    const pages = ['1', '2', '3'];
    const PaginatorTest = () => {
      const [currentPage, setCurrentPage] = useState(1);
      return (
        <Paginator
          currentPage={currentPage}
          totalPageNumber={pages.length}
          onPageChange={setCurrentPage}
        />
      );
    }
    const { getByText } = render(<PaginatorTest />);
    const indicator = getByText('2');
    fireEvent.click(indicator);
    expect(indicator.classList.contains('active')).toBeTruthy();
  })
});
