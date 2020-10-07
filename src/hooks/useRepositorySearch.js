import { useState } from 'react';

const urlWithParamsBuilder = (baseURL, data) => {
  const searchParams = new URLSearchParams(data);
  const url = new URL(baseURL);
  url.search = searchParams.toString();
  return url;
};

const requestQuery = async (items, q, page) => {
  const per_page = 100;
  const requestsLimit = 5;
  const requestParams = {
    q,
    page,
    per_page,
  };

  const url = urlWithParamsBuilder('https://api.github.com/search/repositories', requestParams);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw(data.errors || data);
  }

  items.push(...data.items);
  const itemsLeft = data.total_count - page * per_page;
  if (itemsLeft > 0 && page < requestsLimit) {
    const pag = await requestQuery(items, q, page + 1);
    return pag;
  }
  return items;
};

const useRepositorySearch = () => {
  const [pervValue, setPrevValue] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [errors, setErrors] = useState(false);

  const inputChangeHandler = (event) => {
    event.persist();
    const { target: { value } } = event;
    setValue(value);
  }

  const buttonClickHandler = () => {
    if (value !== pervValue) {
      setLoading(true);
      setResult([]);
      setErrors(false);
      requestQuery([], value, 1)
        .then(setResult)
        .catch((err) => {
          setErrors(true)
        })
        .then(() => {
          setLoading(false);
          setPrevValue(value);
          setValue('');
        })
    };
  }

  return {
    value,
    loading,
    result,
    errors,
    inputChangeHandler,
    buttonClickHandler,
  }
};

export default useRepositorySearch;
