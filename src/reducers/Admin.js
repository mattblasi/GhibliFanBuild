import {
  ADMIN_EDIT,
  ADMIN_CLEAR_DETAILS,
  ADMIN_RELOAD_DETAILS,
  ADMIN_SET_PHOTOS,
  ADMIN_SET_PEOPLE,
  ADMIN_SET_DETAILS,
  ADMIN_SCRAPE_PRODUCTS,
  ADMIN_SCRAPE_PRODUCTS_PAGE,
  ADMIN_UPDATE_PAGE,
  ADMIN_ADD_UNSORTED,
} from '../actions/actionTypes';
import { REHYDRATE } from 'redux-persist/lib/constants';

const initialState = {
  isLoading: true,
  details: {},
  people: {},
  photos: {},
  products: [],
  unsorted: [],
};

let products;

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
        photos: new Set([...action.data.photos]) || [],
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

    case ADMIN_SCRAPE_PRODUCTS:
      console.log(action.data);
      products = {};
      products[action.data.curPage] = [...action.data.products];
      return {
        ...state,
        curPage: action.data.curPage,
        pages: [...action.data.pages],
        products: { ...products },
      };

    case ADMIN_SCRAPE_PRODUCTS_PAGE:
      console.log(action.data);
      products = { ...state.products };
      products[action.data.curPage] = [...action.data.products];
      return {
        ...state,
        curPage: action.data.curPage,
        products: { ...products },
      };

    case ADMIN_UPDATE_PAGE:
      return {
        ...state,
        curPage: action.data,
      };

    case ADMIN_ADD_UNSORTED:
      return {
        ...state,
        unsorted: action.data,
      };

    case ADMIN_CLEAR_DETAILS:
      return initialState;

    default:
      return state;
  }
}
