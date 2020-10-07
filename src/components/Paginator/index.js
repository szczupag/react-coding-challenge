import React from 'react';
import s from './style.css';

const Paginator = ({
  currentPage,
  totalPageNumber,
  onPageChange,
}) => {
  const pagesArray = Array.from(Array(totalPageNumber), (e, i) => i + 1);

  return (
    <div className={s.paginator}>
      {pagesArray.map(page => {
        const indicatorClass = page === currentPage ? s.active : '';
        return (
          <span
            key={page}
            className={indicatorClass}
            onClick={() => onPageChange(page)}
          >
            {page}
          </span>
        );
      })}
    </div>
  );
};

export default Paginator;
