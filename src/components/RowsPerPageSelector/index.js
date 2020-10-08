import React from 'react';
import s from './style.css';

const Selector = ({
  options,
  rowsPerPage,
  onSelectorChange,
}) => (
    <div className={s.selector}>
      <span>Rows per page:</span>
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
