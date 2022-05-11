import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import usersReducers from "./characters/reducer";
import episodesReducer from "./episodes/reducerEpisodes";

const store = createStore(
  combineReducers({
    characters: usersReducers,
    episodes: episodesReducer,
  }),
  applyMiddleware(thunk, logger)
);

export default store;
