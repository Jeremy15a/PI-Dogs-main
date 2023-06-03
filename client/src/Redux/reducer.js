import { SET_CURRENT_PAGE, FILTER_BY_NAME, GET_ALL_DOGS, GET_DESCRIPTION, GET_DOGS_BY_NAME, GET_ALL_TEMPERAMENT, FILTER_TEMPERAMENT, FILTER_ORIGIN, ORDER_BY_NAME, ORDER_BY_WEIGHT, POST_DOG } from './actions_types';

const initialState = {
  dogs: [],
  temperaments: [],
  description: [],
  filteredDogs: [],
  orderBy: null,
  currentPage: 1,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: payload,
        filteredDogs: payload,
      };

    case GET_ALL_TEMPERAMENT:
      return {
        ...state,
        temperaments: payload,
      };

    case GET_DESCRIPTION:
      return {
        ...state,
        description:payload
      };

    case FILTER_BY_NAME:
      const filteredDogs = state.dogs.filter((dog) =>
        dog.name.toLowerCase().includes(payload.toLowerCase())
      );
      return {
        ...state,
        filteredDogs,
        orderBy: null,
        currentPage: 1,
      };

    case GET_DOGS_BY_NAME:
      return {
        ...state,
        filteredDogs: payload,
      };

    case FILTER_TEMPERAMENT:
      const filterValue = payload === "all" ? undefined : payload.split(",");
      const dogsFilter = state.dogs.filter((dog) => {
        return (
          !filterValue ||
          (dog.temperaments &&
            filterValue.some(
              (temperament) =>
                dog.temperaments &&
                dog.temperaments.includes(temperament.trim())
            ))
        );
      });

      return {
        ...state,
        filteredDogs: dogsFilter,
      };

    case FILTER_ORIGIN:
      const originValue = payload.toLowerCase();
      let filterDogs = [];

      if (originValue === "database") {
        filterDogs = state.dogs.filter((dog) => {
          return typeof dog.id === "string" && dog.id.includes("-");
        });
      } else if (originValue === "api") {
        filterDogs = state.dogs.filter((dog) => {
          return (
            typeof dog.id === "number" ||
            (typeof dog.id === "string" && !dog.id.includes("-"))
          );
        });
      } else {
        filterDogs = state.dogs;
      }

      return {
        ...state,
        filteredDogs: filterDogs,
      };

    case ORDER_BY_NAME:
      const sortedDogs = [...state.filteredDogs].sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      if (payload === "Z - A") {
        sortedDogs.reverse();
      }
      return {
        ...state,
        filteredDogs: sortedDogs,
        orderBy: "name",
      };

    case ORDER_BY_WEIGHT:
      const sortedWeight = [...state.filteredDogs].sort((a, b) => {
        const [minA, maxA] = a.weight.split(" - ").map(Number);
        const [minB, maxB] = b.weight.split(" - ").map(Number);

        const avgA = (minA + (maxA || 0)) / 2;
        const avgB = (minB + (maxB || 0)) / 2;

        return avgA - avgB;
      });

      if (payload === "DESCENDING") {
        sortedWeight.reverse();
      }

      return {
        ...state,
        filteredDogs: sortedWeight,
      };

    case POST_DOG:
      return { ...state };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };

    default:
      return state;
  }
};

export default reducer;
