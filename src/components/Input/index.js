import React from 'react';

const Input = ({
  value,
  onChange,
  onClick,
}) => (
  <div>
    <input type="text" value={value} onChange={onChange} />
    <button type="button" onClick={onClick} disabled={!value}>Search</button>
  </div>
);

export default Input;
