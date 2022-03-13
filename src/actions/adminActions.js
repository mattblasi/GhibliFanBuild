import {
  ADMIN_EDIT,
  ADMIN_SET_DETAILS,
  ADMIN_SET_PEOPLE,
  ADMIN_SET_PHOTOS,
  ADMIN_CLEAR_DETAILS,
  ADMIN_RELOAD_DETAILS,
} from '../actions/actionTypes';
import axios from 'axios';
import { dispatch, getState } from '../store';

const BASE_URL = `https://ghiblifan.herokuapp.com`;

export const getMovieToEdit = (id) => {
  return async (dispatch) => {
    const response = Promise.all([
      axios.get(`${BASE_URL}/movies/title/${id}`),
      axios.get(`${BASE_URL}/movies/title/${id}/people`),
      axios.get(`${BASE_URL}/movies/title/${id}/photos`),
    ]).then((res) => {
      dispatch({
        type: ADMIN_SET_DETAILS,
        data: {
          details: res[0].data,
          people: res[1].data.people,
          photos: res[2].data.images,
        },
      });
    });
  };
};
