import React, { useState, useEffect } from 'react';
import style from './CreateDog.module.css';
import validation from './Validation';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postDog, getAllTemperaments } from '../../Redux/actions';

const CreateDog = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [dogData, setDogData] = useState({
    image: '',
    name: '',
    height: '',
    weight: '',
    life_span: '',
    temperaments: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDogData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validation({ ...dogData, [name]: value })[name] || null
    }));
  };
  

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setDogData((prevData) => {
      if (checked) {
        return {
          ...prevData,
          temperaments: [...prevData.temperaments, value]
        };
      } else {
        return {
          ...prevData,
          temperaments: prevData.temperaments.filter((temperament) => temperament !== value)
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation(dogData);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        await dispatch(postDog(dogData));
        console.log('Valid data:', dogData);
        alert('La raza del perro se guardó correctamente');
      } catch (error) {
        console.error('No se pudo crear tu perro:', error);
      }
    }
  };
  
  

  return (
    <div className={style.CContainer}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">
          <input
            type="text"
            name="image"
            id="image"
            placeholder="add image"
            value={dogData.image}
            onChange={handleChange}
          />
        </label>
        {errors.image && <span className={style.error}>{errors.image}</span>}

        <label htmlFor="name">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="add name"
            value={dogData.name}
            onChange={handleChange}
          />
        </label>
        {errors.name && <span className={style.error}>{errors.name}</span>}

        <label htmlFor="height">
          <input
            type="text"
            name="height"
            id="height"
            placeholder="add height"
            value={dogData.height}
            onChange={handleChange}
          />
          <span>cm</span>
        </label>
        {errors.height && <span className={style.error}>{errors.height}</span>}

        <label htmlFor="weight">
          <input
            type="text"
            name="weight"
            id="weight"
            placeholder="add weight"
            value={dogData.weight}
            onChange={handleChange}
          />
          <span>kg</span>
        </label>
        {errors.weight && <span className={style.error}>{errors.weight}</span>}

        <label htmlFor="life_span">
          <input
            type="text"
            name="life_span"
            id="life_span"
            placeholder="add life span"
            value={dogData.life_span}
            onChange={handleChange}
          />
          <span>years</span>
        </label>
        {errors.life_span && <span className={style.error}>{errors.life_span}</span>}

        <label htmlFor="temperaments">
          <span>Select temperaments:</span>
          {temperaments.map((temperament) => (
            <label key={temperament.temperaments}>
              <input
                type="checkbox"
                name="temperaments"
                value={temperament.temperaments}
                checked={dogData.temperaments.includes(temperament.temperaments)}
                onChange={handleCheckboxChange}
              />
              {temperament.name}
            </label>
          ))}
        </label>
        {errors.temperaments && <span className={style.error}>{errors.temperaments}</span>}

        <button type="submit">Save</button>
      </form>
      <NavLink to={`/home`}>
        <button>Back to home</button>
      </NavLink>
    </div>
  );
};

export default CreateDog;

