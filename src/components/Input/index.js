import React from 'react';
import s from './style.css';

const Input = ({
  value,
  onChange,
}) => (
  <div className={s.wrapper}>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={s.input}
    />
  </div>
);

export default Input;
