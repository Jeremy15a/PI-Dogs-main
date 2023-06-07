import React, { useState, useEffect } from 'react';
import style from './CreateDog.module.css';
import validation from './Validation';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postDog, getAllTemperaments } from '../../Redux/actions';
import homeIcon from '../../assets/white-home-icon-png-21.jpg';

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
  const [isFormValid, setIsFormValid] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  useEffect(() => {
    const isValid = Object.values(errors).every((error) => error === null) && dogData.name.trim() && dogData.height.trim() && dogData.life_span.trim() && dogData.image.trim()!== '';
    setIsFormValid(isValid);
  }, [errors, dogData]);

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
  
  
  const handleTemperamentSelect = (event) => {
    const temperament = event.target.value;
    if (dogData.temperaments.includes(temperament)) {
      setDogData((prevData) => ({
        ...prevData,
        temperaments: prevData.temperaments.filter((temp) => temp !== temperament)
      }));
    } else {
      setDogData((prevData) => ({
        ...prevData,
        temperaments: [...prevData.temperaments, temperament]
      }));
    }
    setSearchTerm(''); 
  };
  

  const handleRemoveTemperament = (temperament) => {
    setDogData((prevData) => ({
      ...prevData,
      temperaments: prevData.temperaments.filter((temp) => temp !== temperament)
    }));
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

  const handleImageChange = (e) => {
    const { value } = e.target;
    setDogData((prevData) => ({
      ...prevData,
      image: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      image: validation({ ...dogData, image: value }).image || null
    }));
  };


  const renderImagePreview = () => {
    if (dogData.image) {
      return <div><span className={style.preImg}>Preview Image:</span><img src={dogData.image} className={style.imagePreview} alt="Preview" /></div>;
    }
    return null;
  };
  const imgPreview = renderImagePreview()
  
  return (
    <div className={style.super}>
    <div className={style.CContainer}>
      <header>
        <div className={style.homeButtonWrapper}>
          <NavLink to="/home" className={style.link}>
          <button className={style.homeButton} >
            <img src={homeIcon} className={style.homeIcon} alt="Home Icon" />
            <span>The Dog Breed Finder</span>
          </button>
          </NavLink>
        </div>
      </header>
      <form onSubmit={handleSubmit} className={style.formi}>
      <div className={style.formGroup}>
          <label htmlFor="image" className={style.label}>
            Add Image:
          </label>
          <input
            type="text"
            name="image"
            id="image"
            placeholder="Add image"
            value={dogData.image}
            onChange={handleImageChange}
            className={style.input}
          />
          {errors.image && <span className={style.error}>{errors.image}</span>}
          <div>
          {imgPreview}
          </div>
        </div>
  
        <div className={style.formGroup}>
          <label htmlFor="name" className={style.label}>
            Add Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Add name"
            value={dogData.name}
            onChange={handleChange}
            className={style.input}
          />
          {errors.name && <span className={style.error}>{errors.name}</span>}
        </div>
  
        <div className={style.formGroup}>
          <label htmlFor="height" className={style.label}>
            Add Height:
          </label>
          <div className={style.inputGroup}>
            <input
              type="text"
              name="height"
              id="height"
              placeholder='Add height (e.g.: XX - XX)'
              value={dogData.height}
              onChange={handleChange}
              className={style.input}
            />
            <span className={style.unit}>cm</span>
          </div>
          {errors.height && <span className={style.error}>{errors.height}</span>}
        </div>
  
        <div className={style.formGroup}>
          <label htmlFor="weight" className={style.label}>
            Add Weight:
          </label>
          <div className={style.inputGroup}>
          <input
              type="text"
              name="weight"
              id="weight"
              placeholder='Add weight (e.g.: XX - XX)'
              value={dogData.weight}
              onChange={handleChange}
              className={style.input}
            />
            <span className={style.unit}>kg</span>
          </div>
          {errors.weight && <span className={style.error}>{errors.weight}</span>}
        </div>
  
        <div className={style.formGroup}>
          <label htmlFor="life_span" className={style.label}>
            Add Life Span:
          </label>
          <div className={style.inputGroup}>
          <input
              type="text"
              name="life_span"
              id="life_span"
              placeholder='Add life span (e.g.: XX - XX)'
              value={dogData.life_span}
              onChange={handleChange}
              className={style.input}
            />
            <span className={style.unit}>years</span>
          </div>
          {errors.life_span && <span className={style.error}>{errors.life_span}</span>}
        </div>

        <div className={style.formGroup}>
  <label htmlFor="temperaments" className={style.label}>
    Select Temperaments:
  </label>
  <div className={style.temperamentContainer}>
    <input
      type="text"
      name="temperamentSearch"
      id="temperamentSearch"
      placeholder="Search temperaments"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className={style.input}
    />
    <select
      name="temperaments"
      id="temperaments"
      multiple
      value={dogData.temperaments}
      onChange={handleTemperamentSelect}
      className={style.select}
    >
      {temperaments
        .filter((temperament) =>
          temperament.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((temperament) => (
          <option key={temperament.temperaments} value={temperament.temperaments}>
            {temperament.name}
          </option>
        ))}
    </select>
            <div className={style.selectedTemperaments}>
  {dogData.temperaments.map((temperamentId) => {
    const selectedTemperament = temperaments.find(
      (temperament) => temperament.temperaments === temperamentId
    );
    return (
      <div key={temperamentId} className={style.selectedTemperament}>
        {selectedTemperament ? selectedTemperament.name : ''}
        <button
          type="button"
          onClick={() => handleRemoveTemperament(temperamentId)}
          className={style.removeButton}
        >
          X
        </button>
      </div>
    );
  })}
</div>
          </div>
          {errors.temperaments && <span className={style.error}>{errors.temperaments}</span>}
        </div>
  
        <button
  type="submit"
  className={`${style.submitButton} ${!isFormValid ? style.disabledButton : ''} ${style.centerVertical}`}
  disabled={!isFormValid}
>
  Save
</button>
      </form>
      <NavLink to="/home" className={style.link}>
        <button className={style.backButton}>Back to Home</button>
      </NavLink>
    </div>
        </div>

  );
};

export default CreateDog;