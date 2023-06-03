import style from './Detail.module.css';
import * as actions from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Detail = () => {
  const dispatch = useDispatch();
  const [dog, setDog] = useState({});
  const { id } = useParams();
  const description = useSelector(state => state.description);

  useEffect(() => {
    dispatch(actions.getDescription(id));
  }, [id, dispatch]);

  useEffect(() => {
    setDog(description);
  }, [description]);

  return (
    <div className={style.DetailContainer}>
      {dog.image && <img src={dog.image} alt="dog" />}
      {dog.name && <h4>Name: {dog.name}</h4>}
      {dog.height ? (
        <h4>Height: {dog.height} cm</h4>
      ) : dog.height && dog.height.metric ? (
        <h4>Height: {dog.height.metric} cm</h4>
      ) : null}
      {dog.weight ? (
        <h4>Weight: {dog.weight} kg</h4>
      ) : dog.weight && dog.weight.metric ? (
        <h4>Weight: {dog.weight.metric} kg</h4>
      ) : null}
      {dog.life_span && <h4>Life Span: {dog.life_span} years</h4>}
      {dog.temperaments && <h4>Temperaments: {dog.temperaments}</h4>}
        <NavLink to={`/home`}>
            <button>Back to home</button>
        </NavLink>
    </div>
  );
};

export default Detail;
