import {
  ADMIN_EDIT,
  ADMIN_CLEAR_DETAILS,
  ADMIN_RELOAD_DETAILS,
  ADMIN_SET_PHOTOS,
  ADMIN_SET_PEOPLE,
  ADMIN_SET_DETAILS,
} from '../actions/actionTypes';
import { REHYDRATE } from 'redux-persist/lib/constants';

const initialState = {
  isLoading: true,
  details: {},
  people: {},
  photos: {},
};

export default function Details(state = initialState, action) {
  switch (action.type) {
    case REHYDRATE:
      if (action.payload) {
        return {
          ...state,
          isLoading: action.payload.Details.isLoading,
          details: action.payload.Details.details,
        };
      } else {
        return { ...state };
      }

    case ADMIN_SET_DETAILS:
      return {
        ...state,
        isLoading: false,
        details: { ...action.data.details },
        people: { ...action.data.people },
        photos: new Set(action.data.photos) || [],
      };

    case ADMIN_SET_PEOPLE:
      return {
        ...state,
        people: {
          ...action.data.people,
        },
      };

    case ADMIN_SET_PHOTOS:
      return {
        ...state,
        photos: new Set([...action.data.images]),
      };

    case ADMIN_RELOAD_DETAILS:
      return {
        ...state,
        isLoading: true,
      };

    case ADMIN_CLEAR_DETAILS:
      return initialState;

    default:
      return state;
  }
}
