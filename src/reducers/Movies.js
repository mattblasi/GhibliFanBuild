import { MOVIES_SET_MOVIES } from '../actions/actionTypes';
import { REHYDRATE } from 'redux-persist/lib/constants';

const initialState = {
  isLoading: true,
  movies: [],
  sortOrder: 'ASC',
  sortBy: '',
  sortFields: ['title', 'release'],
};

export default function Movies(state = initialState, action) {
  switch (action.type) {
    case REHYDRATE:
      if (action.payload) {
        return {
          ...state,
          isLoading: action.payload.Movies.isLoading,
          movies: [...action.payload.Movies.movies],
        };
      } else {
        return { ...state };
      }

    case MOVIES_SET_MOVIES:
      return {
        ...state,
        isLoading: false,
        movies: [...action.data],
      };

    default:
      return state;
  }
}
