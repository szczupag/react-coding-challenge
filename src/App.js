import React from 'react';
import SearchPanel from './components/SearchPanel';
import s from './App.css';

const App = () => {
  return (
    <div className={s.wrapper}>
      <SearchPanel />
    </div>
  );
};

export default App;
