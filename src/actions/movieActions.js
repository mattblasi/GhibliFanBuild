import {
  MOVIES_SET_MOVIES,
  MOVIES_SET_DETAILS,
  MOVIES_SET_PEOPLE,
  MOVIES_CLEAR_DETAILS,
} from '../actions/actionTypes';
import axios from 'axios';
import { dispatch, getState } from '../store';

const BASE_URL = `https://ghiblifan.herokuapp.com`;

// Get all Movies
export const getAllMovies = () => {
  return async (dispatch) => {
    const response = await axios.get(`${BASE_URL}/movies`);
    dispatch(setMovies(response.data));
  };
};

const setMovies = (data) => {
  return { type: MOVIES_SET_MOVIES, data: data };
};

export const getMovieDetails = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`${BASE_URL}/movies/title/${id}`);
    dispatch(setMovieDetails(response.data));
  };
};

const setMovieDetails = (data) => {
  return { type: MOVIES_SET_DETAILS, data: data };
};

export const getMoviePeople = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`${BASE_URL}/movies/title/${id}/people`);
    dispatch({ type: MOVIES_SET_PEOPLE, data: response.data });
  };
};

const setMoviePeople = () => {
  return { type: MOVIES_SET_PEOPLE, data: data };
};

export const clearMovieDetails = () => {
  return async (dispatch) => dispatch(clearMovie());
};

const clearMovie = () => {
  return { type: MOVIES_CLEAR_DETAILS };
};
