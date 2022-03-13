import { combineReducers } from 'redux';
import Admin from './Admin';
import Details from './Details';
import Movies from './Movies';
import Site from './Site';

const appReducer = combineReducers({
  Admin,
  Details,
  Movies,
  Site,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
