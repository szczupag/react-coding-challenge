import React from 'react';
import s from './style.css';

const Input = ({
  value,
  onChange,
  onClick,
}) => (
  <div className={s.wrapper}>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={s.input}
    />
    <button
      type="button"
      onClick={onClick}
      disabled={!value}>
        Search
    </button>
  </div>
);

export default Input;
