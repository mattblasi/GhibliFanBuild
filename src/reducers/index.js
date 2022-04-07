import { combineReducers } from 'redux';
import Admin from './Admin';
import Details from './Details';
import Movies from './Movies';
import Site from './Site';
import Store from './Store';

const appReducer = combineReducers({
  Admin,
  Details,
  Movies,
  Site,
  Store,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
