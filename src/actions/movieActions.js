import {
  MOVIES_SET_MOVIES,
  MOVIES_SET_DETAILS,
  MOVIES_SET_PEOPLE,
  MOVIES_SET_PHOTOS,
  MOVIES_SET_PRODUCTS,
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
  // console.log(`${BASE_URL}/movies/title/${id}/people`);
  return async (dispatch) => {
    const response = await axios.get(`${BASE_URL}/movies/title/${id}/people`);
    dispatch({ type: MOVIES_SET_PEOPLE, data: response.data });
  };
};

export const getMoviePhotos = (id) => {
  // console.log(`${BASE_URL}/movies/title/${id}/photos`);
  return async (dispatch) => {
    const response = await axios.get(`${BASE_URL}/movies/title/${id}/photos`);
    dispatch({ type: MOVIES_SET_PHOTOS, data: response.data });
  };
};

export const getMovieProducts = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`${BASE_URL}/movies/title/${id}/products`);
    dispatch({ type: MOVIES_SET_PRODUCTS, data: response.data });
  };
};

export const clearMovieDetails = () => {
  return async (dispatch) => dispatch({ type: MOVIES_CLEAR_DETAILS });
};

export const forceReloadDetails = () => {
  return async (dispatch) => dispatch({ type: MOVIES_RELOAD_DETAILS });
};
