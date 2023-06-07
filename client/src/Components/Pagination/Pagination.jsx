import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../Redux/actions';
import styles from './Pagination.module.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const filteredDogs = useSelector((state) => state.filteredDogs);
  const cardsPerPage = 8;
  const totalPages = Math.ceil(filteredDogs.length / cardsPerPage);
  const currentPage = useSelector((state) => state.currentPage);

  const handleClick = (page) => {
    dispatch(actions.setCurrentPage(page));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(actions.setCurrentPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(actions.setCurrentPage(currentPage + 1));
    }
  };

  return (
    <nav className={styles.pagination}>
      <ul className={styles.paginationList}>
        {currentPage > 1 && (
          <li className={styles.paginationItem}>
            <button onClick={() => handleClick(1)}>First</button>
          </li>
        )}
        {currentPage > 1 && (
          <li className={styles.paginationItem}>
            <button onClick={handlePrevious}>🡸</button>
          </li>
        )}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <li className={styles.paginationItem} key={page}>
            <button
              onClick={() => handleClick(page)}
              className={currentPage === page ? styles.activeButton : ''}
            >
              {page}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li className={styles.paginationItem}>
            <button onClick={handleNext}>🡺</button>
          </li>
        )}
        {currentPage < totalPages && (
          <li className={styles.paginationItem}>
            <button onClick={() => handleClick(totalPages)}>Last</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;