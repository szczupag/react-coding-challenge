import React from 'react';
import { render } from '@testing-library/react';
import TableBody from './index';

const columnsNames = ['name', 'owner', 'stars', 'createdAt'];

const data = [
  { name: 'tonik/theme', owner: 'tonik', stars: 1141, createdAt: '2016-10-29' },
  { name: 'tonik/docs', owner: 'tonik', stars: 5, createdAt: '2017-05-30' },
];

it('Renders table body with data.', () => {
  const { getByText } = render(
    <table>
      <TableBody
        columnsNames={columnsNames}
        data={data}
      />
    </table>
  );
  const firstRowByName = getByText(data[0].name);
  expect(firstRowByName).toBeTruthy();
  const secondRowByDate = getByText(data[1].createdAt);
  expect(secondRowByDate).toBeTruthy();
});
