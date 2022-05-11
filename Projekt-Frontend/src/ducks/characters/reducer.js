import * as types from "./actionType";
const initialState = {
  characters: [],

  loading: false,
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CHARS_REQUEST:
      return { ...state, loading: true };

    case types.GET_CHARS:
      return {
        ...state,
        characters: [...action.payload],
        loading: false,
      };

    case types.DELETE_USER:
      return {
        ...state,
        characters: state.characters.filter((el) => el.id !== action.payload),
      };
    case types.ADD_USER:
      return { ...state, characters: [...state.characters, action.payload] };
    case types.UPDATE_USER:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default usersReducers;
