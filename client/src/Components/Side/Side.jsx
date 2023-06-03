import style from './Side.module.css';
import * as actions from '../../Redux/actions';
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from 'react';

const Side = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector(state => state.temperaments);
  const [temperamentOptions, setTempereamentsOptions] = useState([]);

  useEffect(() => {
    dispatch(actions.getAllTemperaments());
  }, [dispatch]);

  const handleOrderByName = (e) => {
    dispatch(actions.orderByName(e.target.value));
  };

  const handleOrderByWeight = (e) => {
    dispatch(actions.orderByWeight(e.target.value));
  };

  const handleFilterByTemperament = (e) => {
    dispatch(actions.filterByTemperament(e.target.value));
  };

  const handleFilterByOrigin = (e) => {
      const selectedOption = e.target.value;
      dispatch(actions.filterByOrigin(selectedOption));
    };
  
    useEffect(() => {
      setTempereamentsOptions(temperaments.map((temperament) => temperament.name)); 
    }, [temperaments]);

  return (
    <div className={style.Side}>
      <div>
        <ul>
          <li>
            <h2>Filter by Origin</h2>
            <select name="Filter by Origin" id="FilterByOrigin" onChange={handleFilterByOrigin}> 
              <option value="">Filter by Origin</option>
              <option value="DATABASE">DATABASE</option>
              <option value="API">API</option>
            </select>
          </li>
          <li>
            <h2>Order by Name</h2>
            <select name="Order by Name" id="OrderByName" onChange={handleOrderByName}>
              <option value="">Order by Name</option>
              <option value="A - Z">A - Z</option>
              <option value="Z - A">Z - A</option>
            </select>
          </li>
          <li>
            <h2>Order by Weight</h2>
            <select name="Order by Weight" id="OrderByWeight" onChange={handleOrderByWeight}>
              <option value="">Order by Weight</option>
              <option value="ASCENDING">ASCENDING</option>
              <option value="DESCENDING">DESCENDING</option>
            </select>
          </li>
          <li>
            <h2>Filter by Temperament</h2>
            <select name="Filter by Temperament" id="FilterByTemperament" onChange={handleFilterByTemperament}>
              <option value="all">All Temperaments</option>
              {temperamentOptions.map((temperament, index) => (
                <option value={temperament} key={index}>
                  {temperament}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Side;

/*
{ <select name="Filter by Temperament" id="FilterByTemperament" onChange={handleFilterByTemperament}>
</select> }*/