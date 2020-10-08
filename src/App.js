import React from 'react';
import SearchPanel from './components/SearchPanel';
import s from './App.css';

const App = () => {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Github Repository Search</h1>
      <span className={s.subtitle}>Type something and wait to see the result!</span>
      <SearchPanel />
    </div>
  );
};

export default App;
