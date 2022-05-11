import * as types from "./actionType";
import axios from "axios";

const getCharacters = (characters) => ({
  type: types.GET_CHARS,
  payload: characters,
});
const getUsersRequest = {
  type: types.GET_CHARS_REQUEST,
};
const userDeleted = (character) => ({
  type: types.DELETE_USER,
  payload: character,
});

const userAdded = (user) => ({
  type: types.ADD_USER,
  payload: user,
});

const userUpdated = () => ({
  type: types.UPDATE_USER,
});

export const getUser = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user,
});
export const actorToMovie = (payload) => ({
  type: "ACTOR_ADD_TO_MOVIE",
  payload,
});
export const loadCharacters = () => {
  return async (dispatch) => {
    dispatch(getUsersRequest);

    setTimeout(async () => {
      try {
        const response = await axios.get("http://localhost:3000/characters");
        console.log(response.data);
        dispatch(getCharacters(response.data));
      } catch (error) {
        console.log(error);
      }
    }, 0);
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/characters/${id}`
      );
      console.log(response);
      dispatch(userDeleted(id));
    } catch (err) {
      console.log(err);
    }
  };
};
// export const addUser = (user) => {
//   return function (dispatch) {
//     axios
//       .post(`http://localhost:3000/characters`, user)
//       .then((resp) => {
//         console.log("resp", resp);
//         dispatch(userAdded());
//         dispatch(loadCharacters());
//       })
//       .catch((error) => console.log(error));
//   };
// };
export const addUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/characters",
        user
      );

      dispatch(userAdded(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};
export const updateUser = (user) => {
  return function (dispatch) {
    axios
      .put(`http://localhost:3000/characters/${user.id}`, user)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(userUpdated(resp));
        dispatch(loadCharacters());
      })
      .catch((error) => console.log(error));
  };
};
