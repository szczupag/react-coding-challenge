import React, { useState } from 'react';
import Input from '../Input';

const reduceItems = (items) => {
  return items.map(item => ({
    name: item.full_name,
    owner: item.owner.login,
    stars: item.stargazers_count,
    createdAt: item.created_at,
  }));
};

const urlWithParamsBuilder = (baseURL, data) => {
  const searchParams = new URLSearchParams(data);
  const url = new URL(baseURL);
  url.search = searchParams.toString();
  return url;
};

const requestQuery = async (items, q, page) => {
  const per_page = 100;
  const requestsLimit = 10;
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
  const reducedItems = reduceItems(data.items);
  items.push(...reducedItems);

  const itemsLeft = data.total_count - page * per_page;
  if (itemsLeft > 0 && page < requestsLimit) {
    const pag = await requestQuery(items, q, page + 1);
    return pag;
  }
  return items;
};


const SearchPanel = () => {
  const [pervValue, setPrevValue] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const inputChangeHandler = (event) => {
    event.persist();
    const { target: { value } } = event;
    setValue(value);
  }

  const buttonClickHandler = () => {
    if (value !== pervValue) {
      setLoading(true);
      setResult([]);
      requestQuery([], value, 1)
        .then(result => {
          setPrevValue(value);
          setValue('');
          setLoading(false);
          setResult(result);
        });
    };
  }

  return (
    <div>
      <Input
        value={value}
        onChange={inputChangeHandler}
        onClick={buttonClickHandler}
      />
      {`Is loading: ${loading}`}
      {JSON.stringify(result)}
    </div>
  )
};

export default SearchPanel;
