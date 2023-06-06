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
    <div className={style.side}>
      <div className={style.container}> 
        <ul className={style.uls}>
          <li className={style.li1}>
            <h2 className={style.h21}>Filter by Origin</h2>
            <select name="Filter by Origin" id="FilterByOrigin" onChange={handleFilterByOrigin} className={style.select1} > 
              <option className={style.option1} value="">Filter by Origin</option>
              <option className={style.option1} value="DATABASE">DATABASE</option>
              <option className={style.option1} value="API">API</option>
            </select>
          </li>
          <li className={style.li2}>
            <h2 className={style.h22}>Order by Name</h2>
            <select name="Order by Name" id="OrderByName" onChange={handleOrderByName} className={style.select2}>
              <option className={style.option2} value="">Order by Name</option>
              <option className={style.option2} value="A - Z">A - Z</option>
              <option className={style.option2} value="Z - A">Z - A</option>
            </select>
          </li>
          <li className={style.li3}>
            <h2 className={style.h23}>Order by Weight</h2>
            <select name="Order by Weight" id="OrderByWeight" onChange={handleOrderByWeight} className={style.select3}>
              <option className={style.option3} value="">Order by Weight</option>
              <option className={style.option3} value="ASCENDING">ASCENDING</option>
              <option className={style.option3} value="DESCENDING">DESCENDING</option>
            </select>
          </li>
          <li className={style.li4}>
            <h2 className={style.h24}>Filter by Temperament</h2>
            <select name="Filter by Temperament" id="FilterByTemperament" onChange={handleFilterByTemperament} className={style.select4}>
              <option className={style.option4} value="all">All Temperaments</option>
              {temperamentOptions.map((temperament, index) => (
                <option className={style.option4} value={temperament} key={index}>
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