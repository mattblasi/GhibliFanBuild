import { combineReducers } from 'redux';
import Movies from './Movies';
import Details from './MovieDetails';

const appReducer = combineReducers({
  Movies,
  Details,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
