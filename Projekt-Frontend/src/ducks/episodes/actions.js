import * as types from "./actionType";
import axios from "axios";

const getEpisodes = (episodes) => ({
  type: types.GET_EPISODES,
  payload: episodes,
});

const episodeDeleted = (episode) => ({
  type: types.DELETE_EPISODE,
  payload: episode,
});

const episodeAdd = (episode) => ({
  type: types.ADD_EPISODE,
  payload: episode,
});

export const getEpisodeStartRequest = {
  type: types.GET_EPISODES_REQUEST_START,
};

export const loadEpisodes = () => {
  return async (dispatch) => {
    dispatch(getEpisodeStartRequest);

    setTimeout(async () => {
      try {
        const response = await axios.get("http://localhost:3000/episodes");
        console.log(response.data);
        dispatch(getEpisodes(response.data));
      } catch (error) {
        console.log(error);
      }
    }, 0);
  };
};

export const deleteEpisode = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/episodes/${id}`
      );
      console.log(response);
      dispatch(episodeDeleted(id));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addEpisode = (episode) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/episodes",
        episode
      );

      dispatch(episodeAdd(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateEpisode = (episode) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/episodes/${episode.id}`,
        episode
      );
      dispatch(episodeDeleted(response.data.id));
      dispatch(episodeAdd(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};
