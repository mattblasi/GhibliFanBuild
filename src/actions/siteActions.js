import {
  PAGE_RELOAD,
  SITE_UPDATE_RECENTS,
  SITE_SETTINGS,
} from '../actions/actionTypes';
import axios from 'axios';

const BASE_URL = `https://ghiblifan.herokuapp.com`;

export const setPageLoaded = (loaded) => {
  return async (dispatch) => {
    dispatch({ type: PAGE_RELOAD, data: loaded });
  };
};

export const updateRecents = (id) => {
  return async (dispatch) => {
    dispatch({ type: SITE_UPDATE_RECENTS, data: id });
  };
};

export const siteSetting = () => {
  return async (dispatch) => {
    Promise.all([axios.get(`${BASE_URL}/settings/products`)]).then((res) => {
      // eventually update for more settins options
      dispatch({ type: SITE_SETTINGS, data: res[0].data });
    });
  };
};
