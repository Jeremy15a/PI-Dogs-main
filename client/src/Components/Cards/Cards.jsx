import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../Redux/actions';
import Card from '../Card/Card';
import style from './Cards.module.css';
import Loading from '../Loading/Loading';

function Cards() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);

  useEffect(() => {
    dispatch(actions.getAllDogs());
  }, [dispatch]);

  const filteredDogs = useSelector((state) => state.filteredDogs);
  const cardsPerPage = 8;
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = filteredDogs.slice(startIndex, endIndex);

  return (
    <div className={style.cards}>
      {currentCards && currentCards.length > 0 ? (
        currentCards.map((dog) => (
          <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            weight={dog.weight}
            image={dog.image}
            temperaments={dog.temperaments}
          />
        ))
      ) : (
        <Loading/>
      )}
    </div>
  );
}

export default Cards;