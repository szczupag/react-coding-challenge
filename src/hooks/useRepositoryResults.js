import { useState, useEffect } from 'react';

const reduceItems = (items) => {
  return items.map(item => ({
    name: item.full_name,
    owner: item.owner.login,
    stars: Number(item.stargazers_count),
    createdAt: new Date(item.created_at).toISOString().split('T')[0],
  }));
};

const columns = [
  { name: 'name', label: 'Name' },
  { name: 'owner', label: 'Owner' },
  { name: 'stars', label: 'Stars' },
  { name: 'createdAt', label: 'Created at' },
];

const sortData = (data, sortBy, sortDesc) => {
  const sortedData = [...data].sort((a, b) => {
    const result = (a[sortBy] < b[sortBy]) ? -1 : (a[sortBy] > b[sortBy]) ? 1 : 0;
    if (sortDesc) return result * -1;
    return result;
  });
  return sortedData;
};

const useRepositoryResults = ({ q, result }) => {
  const [data, setData] = useState([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortDescending, setSortDescending] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState();
  const [dataOnCurrentPage, setDataOnCurrentPage] = useState([]);

  const onInit = () => {
    const reducedItems = reduceItems(result);
    const searchParams = new URL(window.location).searchParams;
    const sortByParam = searchParams.get('sortBy');
    const sortTypeParam = searchParams.get('sortType');
    if (sortByParam && sortTypeParam) {
      setSortColumn(sortByParam);
      setSortDescending(sortTypeParam === 'desc');
      const sortedData = sortData(reducedItems, sortByParam, sortTypeParam === 'desc');
      setData(sortedData);
    } else {
      setData(reducedItems);
    }
  };

  const onSortChange = () => {
    if (sortColumn) {
        const sortedData = sortData(data, sortColumn, sortDescending);
        setData(sortedData);
    }
  };

  const onRowsPerPageChange = () => {
    setTotalPageNumber(Math.ceil(data.length / rowsPerPage));
  };

  const onPageChange = () => {
    const pageRangeStart = (currentPage - 1) * rowsPerPage;
    const pageRangeEnd = currentPage * rowsPerPage;
    setDataOnCurrentPage(data.slice(pageRangeStart, pageRangeEnd));
  };

  const parseStateToSearchParams = () => {
    const state = {
      q,
      sortBy: sortColumn,
      sortType: sortColumn && (sortDescending ? 'desc' : 'asc'),
    };
    Object.keys(state).forEach(key => state[key] === undefined ? delete state[key] : {});
    return state;
  };

  const onStateToSearchParamsChange = () => {
    if (q) {
      const state = parseStateToSearchParams();
      const url = new URL(window.location);
      url.search = new URLSearchParams(state);
      history.pushState(null, null, url);
    }
  };

  useEffect(() => onInit(), [result]);
  useEffect(() => onSortChange(), [sortColumn, sortDescending]);
  useEffect(() => onRowsPerPageChange(), [data, rowsPerPage]);
  useEffect(() => onPageChange(), [data, rowsPerPage, currentPage]);
  useEffect(() => onStateToSearchParamsChange(), [q, sortColumn, sortDescending]);

  const sortChangeHandler = (column) => {
    if (sortColumn === column) {
      setSortDescending(!sortDescending);
    } else {
      setSortColumn(column);
      setSortDescending(true);
    }
  };

  const selectorChangeHandler = (count) => {
    setCurrentPage(1);
    setRowsPerPage(count);
  };

  const paginatorChangeHandler = (page) => {
    setCurrentPage(page);
  };

  return {
    columns,
    dataOnCurrentPage,
    rowsPerPage,
    currentPage,
    totalPageNumber,
    sortColumn,
    sortDescending,
    selectorChangeHandler,
    sortChangeHandler,
    paginatorChangeHandler,
  }
};

export default useRepositoryResults;
