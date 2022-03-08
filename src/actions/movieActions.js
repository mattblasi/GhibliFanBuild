import {
  MOVIES_SET_MOVIES,
  MOVIES_SET_DETAILS,
  MOVIES_SET_PEOPLE,
  MOVIES_CLEAR_DETAILS,
  MOVIES_RELOAD_DETAILS,
} from '../actions/actionTypes';
import axios from 'axios';
import { dispatch, getState } from '../store';

const BASE_URL = `https://ghiblifan.herokuapp.com`;

// Get all Movies
export const getAllMovies = () => {
  return async (dispatch) => {
    const response = await axios.get(`${BASE_URL}/movies`);
    console.log(response);
    dispatch({ type: MOVIES_SET_MOVIES, data: response.data });
  };
};

export const getMovieDetails = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`${BASE_URL}/movies/title/${id}`);
    dispatch({ type: MOVIES_SET_DETAILS, data: response.data });
  };
};

export const getMoviePeople = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`${BASE_URL}/movies/title/${id}/people`);
    dispatch({ type: MOVIES_SET_PEOPLE, data: response.data });
  };
};

export const clearMovieDetails = () => {
  return async (dispatch) => dispatch({ type: MOVIES_CLEAR_DETAILS });
};

export const forceReloadDetails = () => {
  return async (dispatch) => dispatch({ type: MOVIES_RELOAD_DETAILS });
};
