import React from 'react';
import s from './style.css';

const options = [10, 50, 100];

const Selector = ({
  rowsPerPage,
  onSelectorChange,
}) => (
    <div className={s.selector}>
      {options.map(el => {
        const activeClass = rowsPerPage === el ? s.active : '';
        return (
          <span
            key={el}
            onClick={() => onSelectorChange(el)}
            className={activeClass}
          >
            {el}
          </span>
        )
      })}
    </div>
  );

export default Selector;
