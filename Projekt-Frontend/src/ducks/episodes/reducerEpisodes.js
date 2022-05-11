import * as types from "./actionType";
import { DELETE_USER } from "../characters/actionType";
const initialState = {
  episodes: [],

  loading: false,
};

const episodesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_EPISODES_REQUEST_START:
      return { ...state, loading: true };
    case types.GET_EPISODES:
      return {
        ...state,
        episodes: [...action.payload],
        loading: false,
      };
    case types.DELETE_EPISODE:
      return {
        ...state,
        episodes: state.episodes.filter((el) => el.id !== action.payload),
      };
    case DELETE_USER:
      return {
        ...state,
        episodes: state.episodes.map(function (item) {
          return item.charactersList.includes(action.payload)
            ? {
                ...item,
                charactersList: item.charactersList.filter(
                  (el) => el !== action.payload
                ),
              }
            : { ...item };
        }),
      };
    case types.ADD_EPISODE:
      return { ...state, episodes: [...state.episodes, action.payload] };

    default:
      return state;
  }
};

export default episodesReducer;
