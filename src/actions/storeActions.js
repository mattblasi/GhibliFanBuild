import { MERCH_GET_PRODUCT } from '../actions/actionTypes';
import axios from 'axios';

const BASE_URL = `https://ghiblifan.herokuapp.com`;

export const getAllProducts = (movies) => {
  return async (dispatch) => {
    let products = [];
    for (let i = 0; i < movies.length; i++) {
      let movieId = movies[i].id;
      let movieProducts = await getMovieProducts(movieId);
      if (movieProducts.data.length)
        products = products.concat(movieProducts.data);
    }
    dispatch({ type: MERCH_GET_PRODUCT, data: products });
  };
};

const getMovieProducts = async (id) => {
  return await axios.get(`${BASE_URL}/movies/title/${id}/products`);
};
