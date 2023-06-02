import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../Redux/actions'
import style from './Pagination.module.css'

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
    <nav>
      <ul className={style.uls}>
        <li className={style.lisa}>
          <button onClick={() => handleClick(1)}>First</button>
        </li>
        <li className={style.lisa}>
          <button onClick={handlePrevious}>Previous</button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <li className={style.lisa} key={page}>
            <button onClick={() => handleClick(page)}>{page}</button>
          </li>
        ))}
        <li className={style.lisa}>
          <button onClick={handleNext}>Next</button>
        </li>
        <li className={style.lisa}>
          <button onClick={() => handleClick(totalPages)}>Last</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;


