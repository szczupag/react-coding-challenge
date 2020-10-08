import { useEffect, useState } from 'react';

const urlWithParamsBuilder = (baseURL, data) => {
  const searchParams = new URLSearchParams(data);
  const url = new URL(baseURL);
  url.search = searchParams.toString();
  return url;
};

const requestQuery = async (items, q, page) => {
  const per_page = 100;
  const requestsLimit = 1;
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
  const [q, setQ] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [errors, setErrors] = useState(false);

  const requestHandler = (param) => {
    setLoading(true);
    setResult([]);
    setErrors(false);
    requestQuery([], param, 1)
      .then(setResult)
      .catch(() => {
        setErrors(true)
      })
      .then(() => {
        setLoading(false);
        setQ(param);
        setValue('');
      })
  };

  useEffect(() => {
    const searchParams = new URL(window.location).searchParams;
    const qParam = searchParams.get('q');
    if (qParam) {
      setValue(qParam);
      requestHandler(qParam);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value && value !== q) requestHandler(value);
    }, 2000);
    return () => clearTimeout(timeout)
  }, [value]);

  const inputChangeHandler = (event) => {
    event.persist();
    const { target: { value } } = event;
    setValue(value);
  };

  return {
    q,
    value,
    loading,
    result,
    errors,
    inputChangeHandler,
  }
};

export default useRepositorySearch;
