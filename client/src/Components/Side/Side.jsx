import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../Redux/actions';
import style from './Side.module.css';

const Side = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [temperamentOptions, setTemperamentOptions] = useState([]);
  const [selectedTemperament, setSelectedTemperament] = useState(null);

  useEffect(() => {
    dispatch(actions.getAllTemperaments());
  }, [dispatch]);

  const handleOrderByName = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    dispatch(actions.orderByName(value));
  };

  const handleOrderByWeight = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    dispatch(actions.orderByWeight(value));
  };

  const handleFilterByTemperament = (selectedOption) => {
    setSelectedTemperament(selectedOption);
    dispatch(actions.filterByTemperament(selectedOption?.value));
  };

  const handleFilterByOrigin = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    dispatch(actions.filterByOrigin(value));
  };

  useEffect(() => {
    setTemperamentOptions(
      temperaments.map((temperament) => ({
        value: temperament.name,
        label: temperament.name,
      }))
    );
  }, [temperaments]);

  return (
    <div className={style.side}>
      <div className={style.container}>
        <ul className={style.uls}>
          <li className={style.lis}>
            <h2 className={style.h2s}>Order by Name</h2>
            <Select
              options={[
                { value: 'A - Z', label: 'A - Z' },
                { value: 'Z - A', label: 'Z - A' },
              ]}
              placeholder='Select an order'
              isClearable
              isSearchable={false}
              onChange={handleOrderByName}
              className={style.selects}
              classNamePrefix={style.selects}
            />
          </li>
          <br />
          <li className={style.lis}>
            <h2 className={style.h2s}>Order by Weight</h2>
            <Select
              options={[
                { value: 'ASCENDING', label: 'ASCENDING' },
                { value: 'DESCENDING', label: 'DESCENDING' },
              ]}
              placeholder='Select an order'
              isClearable
              isSearchable={false}
              onChange={handleOrderByWeight}
              className={style.selects}
              classNamePrefix={style.selects}
            />
          </li>
          <br />
          <li className={style.lis}>
            <h2 className={style.h2s}>Filter by Origin</h2>
            <Select
              options={[
                { value: 'DATABASE', label: 'DATABASE' },
                { value: 'API', label: 'API' },
              ]}
              placeholder='Filter by Origin'
              isClearable
              isSearchable={false}
              onChange={handleFilterByOrigin}
              className={style.selects}
              classNamePrefix={style.selects}
            />
          </li>
          <br />
          <li className={style.lis}>
            <h2 className={style.h2s}>Filter by Temperament</h2>
            <Select
              value={selectedTemperament}
              options={temperamentOptions}
              isClearable
              isSearchable
              placeholder='Filter by Temperament'
              onChange={handleFilterByTemperament}
              className={style.selects}
              classNamePrefix={style.selects}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Side;






// import style from './Side.module.css';
// import * as actions from '../../Redux/actions';
// import { useDispatch, useSelector} from "react-redux";
// import { useEffect, useState } from 'react';

// const Side = () => {
//   const dispatch = useDispatch();
//   const temperaments = useSelector(state => state.temperaments);
//   const [temperamentOptions, setTempereamentsOptions] = useState([]);

//   useEffect(() => {
//     dispatch(actions.getAllTemperaments());
//   }, [dispatch]);

//   const handleOrderByName = (e) => {
//     dispatch(actions.orderByName(e.target.value));
//   };

//   const handleOrderByWeight = (e) => {
//     dispatch(actions.orderByWeight(e.target.value));
//   };

//   const handleFilterByTemperament = (e) => {
//     dispatch(actions.filterByTemperament(e.target.value));
//   };

//   const handleFilterByOrigin = (e) => {
//       const selectedOption = e.target.value;
//       dispatch(actions.filterByOrigin(selectedOption));
//     };
  
//     useEffect(() => {
//       setTempereamentsOptions(temperaments.map((temperament) => temperament.name)); 
//     }, [temperaments]);

//   return (
//     <div className={style.side}>
//       <div className={style.container}> 
//         <ul className={style.uls}>
//           <li className={style.lis}>
//             <h2 className={style.h2s}>Order by Name</h2>
//             <select name="Order by Name" id="OrderByName" onChange={handleOrderByName} className={style.selects}>
//               <option className={style.options} value="">Order by Name</option>
//               <option className={style.options} value="A - Z">A - Z</option>
//               <option className={style.options} value="Z - A">Z - A</option>
//             </select>
//           </li>
//           <br />
//           <li className={style.lis}>
//             <h2 className={style.h2s}>Order by Weight</h2>
//             <select name="Order by Weight" id="OrderByWeight" onChange={handleOrderByWeight} className={style.selects}>
//               <option className={style.options} value="">Order by Weight</option>
//               <option className={style.options} value="ASCENDING">ASCENDING</option>
//               <option className={style.options} value="DESCENDING">DESCENDING</option>
//             </select>
//           </li>
//           <br />
//           <li className={style.lis}>
//             <h2 className={style.h2s}>Filter by Origin</h2>
//             <select name="Filter by Origin" id="FilterByOrigin" onChange={handleFilterByOrigin} className={style.selects} > 
//               <option className={style.options} value="">Filter by Origin</option>
//               <option className={style.options} value="DATABASE">DATABASE</option>
//               <option className={style.options} value="API">API</option>
//             </select>
//           </li>
//           <br />
//           <li className={style.lis}>
//             <h2 className={style.h2s}>Filter by Temperament</h2>
//             <select name="Filter by Temperament" id="FilterByTemperament" onChange={handleFilterByTemperament} className={style.selects}>
//               <option className={style.options} value="all">All Temperaments</option>
//               {temperamentOptions.map((temperament, index) => (
//                 <option className={style.options} value={temperament} key={index}>
//                   {temperament}
//                 </option>
//               ))}
//             </select>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Side;