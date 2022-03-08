import { MOVIES_SET_DETAILS, PAGE_RELOAD } from '../actions/actionTypes';
import { REHYDRATE } from 'redux-persist/lib/constants';

const initialState = {
  pageLoaded: false,
  detailsId: null,
};

export default function Site(state = initialState, action) {
  switch (action.type) {
    case PAGE_RELOAD:
      return {
        ...state,
        pageLoaded: action.data,
      };

    case MOVIES_SET_DETAILS:
      return {
        ...state,
        detailsId: action.data.id,
      };

    default:
      return state;
  }
}
