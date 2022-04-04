import {
  MOVIES_SET_DETAILS,
  PAGE_RELOAD,
  SITE_UPDATE_RECENTS,
  SITE_SETTINGS
} from '../actions/actionTypes';
import { REHYDRATE } from 'redux-persist/lib/constants';

const initialState = {
  pageLoaded: false,
  detailsId: null,
  recentlyViewed: [],
  settings: {}
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

    case SITE_UPDATE_RECENTS:
      let recents = [...state.recentlyViewed];
      if (recents.includes(action.data)) {
        let index = recents.indexOf(action.data);
        recents.splice(index, 1);
      }
      recents.unshift(action.data);
      return {
        ...state,
        recentlyViewed: [...recents.slice(0, 5)],
      };

    case SITE_SETTINGS:
      return {
        ...state,
        settings: { ...action.data }
      }

    default:
      return state;
  }
}
