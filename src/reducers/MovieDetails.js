import {
  MOVIES_SET_DETAILS,
  MOVIES_CLEAR_DETAILS,
} from '../actions/actionTypes';
import { REHYDRATE } from 'redux-persist/lib/constants';

const initialState = {
  isLoading: true,
  details: {},
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
      // let { id, title, og_title_jp, og_title_rm, summaries, posters } =
      //   action.data;
      // console.log(action.data);
      // let headerObj = {
      //   id,
      //   title,
      //   og_title_jp,
      //   og_title_rm,
      //   summaries,
      //   poster: posters[[posters.length - 1]],
      // };
      // console.log(headerObj);
      return {
        ...state,
        isLoading: false,
        details: { ...action.data },
      };

    case MOVIES_CLEAR_DETAILS:
      return initialState;

    default:
      return state;
  }
}
