import { MERCH_GET_PRODUCT } from '../actions/actionTypes';
import { REHYDRATE } from 'redux-persist/lib/constants';

const initialState = {
  products: {},
};

export default function Store(state = initialState, action) {
  switch (action.type) {
    case MERCH_GET_PRODUCT:
      return {
        ...state,
        products: [...action.data],
      };

    default:
      return state;
  }
}
