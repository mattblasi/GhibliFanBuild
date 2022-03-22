import { ADMIN_SET_DETAILS } from '../actions/actionTypes';
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
          people:  res[1].data.people,
          photos:  res[2].data.images,
        },
      });
    });
  };
};

export const updateData = (id, list, type) => {
  return async (dispatch) => {
    //console.log('test', id, list, type);
    fetch(`${BASE_URL}/update/${id}/${type}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id, list: list }),
    }).then((res) => {
      dispatch(getMovieToEdit(id));
    });
  };
};
