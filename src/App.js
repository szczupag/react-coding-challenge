import React from 'react';
import SearchPanel from './components/SearchPanel';
import s from './App.css';

const App = () => {
  return (
    <div className={s.wrapper}>
      <h1>Github Repository Search</h1>
      <SearchPanel />
    </div>
  );
};

export default App;
