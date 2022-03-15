import { PAGE_RELOAD, SITE_UPDATE_RECENTS } from '../actions/actionTypes';

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
