import style from './Detail.module.css';
import * as actions from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Detail = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [dog, setDog] = useState({});
  const { id } = useParams();
  const description = useSelector(state => state.description);

  useEffect(() => {
    setLoading(true);
    setDog({}); 
    dispatch(actions.getDescription(id))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [id, dispatch]);

  useEffect(() => {
    setDog(description);
  }, [description]);

  return (
    <div className={style.DetailContainer}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={style.specs}>
          {dog.id && <h4 className={style.id}>Id: {dog.id}</h4>}
          <div className={style.imgConatiner}>
          {dog.image && <img src={dog.image} alt="dog" className={style.imgagi}/>}
          </div>
          {dog.name && <h4 className={style.namee}>Name: {dog.name}</h4>}
          {dog.height ? (
            <h4 className={style.height}>Height: {dog.height} cm</h4>
          ) : dog.height && dog.height.metric ? (
            <h4 className={style.height}>Height: {dog.height.metric} cm</h4>
          ) : null}
          {dog.weight ? (
            <h4 className={style.weight}> Weight: {dog.weight} kg</h4>
          ) : dog.weight && dog.weight.metric ? (
            <h4 className={style.weight}>Weight: {dog.weight.metric} kg</h4>
          ) : null}
          {dog.life_span && <h4 className={style.life}>Life Span: {dog.life_span} years</h4>}
          {dog.temperaments && <h4 className={style.tempos}>Temperaments: {dog.temperaments}</h4>}
        </div>
      )}
      <NavLink to={'/home'} className={style.LinkHomeBut}>
        <button className={style.HomeBut}>Back to home</button>
      </NavLink>
    </div>
  );
};

export default Detail;