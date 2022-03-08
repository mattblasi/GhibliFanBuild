import { combineReducers } from 'redux';
import Movies from './Movies';
import Details from './MovieDetails';
import Site from './Site';

const appReducer = combineReducers({
  Details,
  Movies,
  Site,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
