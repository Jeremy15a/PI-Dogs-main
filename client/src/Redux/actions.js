import {SET_CURRENT_PAGE, FILTER_BY_NAME, GET_ALL_DOGS, GET_DESCRIPTION, GET_DOGS_BY_NAME, GET_ALL_TEMPERAMENT, FILTER_TEMPERAMENT, FILTER_ORIGIN, ORDER_BY_NAME, ORDER_BY_WEIGHT, POST_DOG } from './actions_types';
import axios from "axios";
export const getAllDogs = () => {
  return async (dispatch, getState) => {
    const { dogs } = getState();
    if (dogs.length > 0) {
      dispatch({
        type: GET_ALL_DOGS,
        payload: dogs
      });
    }
    
    
    try {
      dispatch({
        type: GET_ALL_DOGS,
        payload: []
      });

      const response = await axios.get("http://localhost:3001/dogs");
      const dogs = response.data;
      dispatch({
        type: GET_ALL_DOGS,
        payload: dogs
      });
    } catch (error) {
      console.error("No se pudieron traer los perros:", error);
    }
  }
};

export const getAllTemperaments = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/temperaments");
      const temperaments = response.data;
      dispatch({
        type: GET_ALL_TEMPERAMENT,
        payload: temperaments,
      });
    } catch (error) {
      console.error("No se pudieron traer los temperamentos de los perros:", error);
    }
  };
};

export const filterByTemperament = (temperament) => {
  return {
    type: FILTER_TEMPERAMENT,
    payload: temperament,
  };
};

export const getDescription = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/${id}`);
      const description = response.data;
      dispatch({
        type: GET_DESCRIPTION,
        payload: description,
      });
    } catch (error) {
      console.error("No se pudo traer la descripción del perro:", error);
    }
  };
};

export const getDogByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/name?name=${name}`);
      const dogs = response.data;
      dispatch({
        type: GET_DOGS_BY_NAME,
        payload: dogs,
      });
    } catch (error) {
      alert(`No existe una raza de perros llamada ${name}`);
    }
  };
};

export const filterByName = (name) => {
  return {
    type: FILTER_BY_NAME,
    payload: name,
  };
};

export const postDog = (dog) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:3001/dogs`, dog);
      const newDog = response.data;
      dispatch({
        type: POST_DOG,
        payload: newDog,
      });
    } catch (error) {
      console.error("No se pudo crear tu perro:", error);
    }
  };
};

export const orderByWeight = (orderValue) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload: orderValue,
  };
};

export const orderByName = (name) => {
  return {
    type: ORDER_BY_NAME,
    payload: name,
  };
};

export const filterByOrigin = (origin) => {
  return {
    type: FILTER_ORIGIN,
    payload: origin,
  };
};

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};