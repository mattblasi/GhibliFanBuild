import {
  MOVIES_SET_DETAILS,
  MOVIES_SET_PEOPLE,
  MOVIES_CLEAR_DETAILS,
} from '../actions/actionTypes';
import { REHYDRATE } from 'redux-persist/lib/constants';

const initialState = {
  isLoading: true,
  details: {},
  people: {},
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

    case MOVIES_SET_DETAILS:
      return {
        ...state,
        isLoading: false,
        details: { ...action.data },
      };

    case MOVIES_SET_PEOPLE:
      return {
        ...state,
        people: {
          ...action.data.people,
        },
      };

    case MOVIES_CLEAR_DETAILS:
      return initialState;

    default:
      return state;
  }
}