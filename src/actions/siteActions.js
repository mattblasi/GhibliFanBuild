import { PAGE_RELOAD } from '../actions/actionTypes';

export const setPageLoaded = (loaded) => {
  return async (dispatch) => {
    dispatch({ type: PAGE_RELOAD, data: loaded });
  };
};
