import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Table from './index';

const columns = [
  { name: 'name', label: 'Name' },
  { name: 'owner', label: 'Owner' },
  { name: 'stars', label: 'Stars' },
  { name: 'createdAt', label: 'Created at' },
];

const data = [
  { name: 'tonik/theme', owner: 'tonik', stars: '1141', createdAt: '2016-10-29' },
  { name: 'tonik/docs', owner: 'tonik', stars: '5', createdAt: '2017-05-30' },
  { name: 'tonik/child-theme', owner: 'tonik', stars: '11', createdAt: '2015-05-30' },
];

const options = ['10', '50', '100'];

const mockSelectorChangeHandler = jest.fn();
const mockSortChangeHandler = jest.fn();
const mockPaginatorChangeHandler = jest.fn();

const TableTest = () => (
  <Table
    rowsPerPageOptions={options}
    columns={columns}
    dataOnCurrentPage={data}
    rowsPerPage={10}
    currentPage={1}
    totalPageNumber={2}
    sortColumn={'name'}
    sortOrder={'asc'}
    onSelectorChange={mockSelectorChangeHandler}
    onColumnClick={mockSortChangeHandler}
    onPageChange={mockPaginatorChangeHandler}
  />
);

it('Renders table with columns and rows.', () => {
  const { getByText, getAllByText } = render(<TableTest />);
  columns.forEach(column => {
    expect(getByText(column.label)).toBeTruthy();
  });
  data.forEach(row => {
    columns.forEach(column => {
      expect(getAllByText(row[column.name]).length).toBeGreaterThan(0);
    });
  });
});

describe('Calls proper event when', () => {
  it('Pages indicator is clicked', () => {
    const { getByText } = render(<TableTest />);
    const secondPage = getByText('2');
    fireEvent.click(secondPage);
    expect(mockPaginatorChangeHandler).toHaveBeenCalled();
  })
  it('Pages column is clicked', () => {
    const { getByText } = render(<TableTest />);
    const column = getByText('Stars');
    fireEvent.click(column);
    expect(mockSortChangeHandler).toHaveBeenCalled();
  })
  it('Rows per page option is clicked', () => {
    const { getByText } = render(<TableTest />);
    const option = getByText('50');
    fireEvent.click(option);
    expect(mockSelectorChangeHandler).toHaveBeenCalled();
  })
});
