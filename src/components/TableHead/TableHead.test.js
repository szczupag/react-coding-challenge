import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import TableHead from './index';

const columns = [
  { name: 'name', label: 'Name' },
  { name: 'owner', label: 'Owner' },
  { name: 'stars', label: 'Stars' },
  { name: 'createdAt', label: 'Created at' },
];

it('Renders columns properly.', () => {
  const sortColumn = 'name';
  const sortOrder = 'desc';
  const mockOnColumnClick = jest.fn();
  const { getByText } = render(
    <table>
      <TableHead
        columns={columns}
        onColumnClick={mockOnColumnClick}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
      />
    </table>
  );
  columns.forEach(column => {
    expect(getByText(column.label)).toBeTruthy();
  });
});

it('Calls onColumnClick when column is clicked.', () => {
  const sortColumn = 'name';
  const sortOrder = 'desc';
  const mockOnColumnClick = jest.fn();
  const { getByText } = render(
    <table>
      <TableHead
        columns={columns}
        onColumnClick={mockOnColumnClick}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
      />
    </table>
  );
  const column = getByText('Owner');
  fireEvent.click(column);
  expect(mockOnColumnClick).toHaveBeenCalled();
});

it('Changes active column.', () => {
  const sortOrder = 'asc';
  const TableHeadTest = () => {
    const [sortColumn, setSortColumn] = useState('name');
    return (
      <table>
        <TableHead
          columns={columns}
          onColumnClick={setSortColumn}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
        />
      </table>
    );
  };
  const { getByText } = render(<TableHeadTest />);
  const column = getByText('Owner');
  fireEvent.click(column);
  expect(column.classList.contains(sortOrder)).toBeTruthy();
});
