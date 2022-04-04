import {
  ADMIN_SET_DETAILS,
  ADMIN_SCRAPE_PRODUCTS,
  ADMIN_SCRAPE_PRODUCTS_PAGE,
  ADMIN_UPDATE_PAGE,
  ADMIN_ADD_UNSORTED,
  ADMIN_FILTER_UNSORTED,
} from '../actions/actionTypes';
import axios from 'axios';
import { dispatch, getState } from '../store';

import { siteSetting } from './siteActions';

const BASE_URL = `https://ghiblifan.herokuapp.com`;
const SCRAPER_API_KEY = `4f6063d8bd8f350d17dff0c30a127859`;
const SCRAPER_URL = `https://api.scraperapi.com/?api_key=${SCRAPER_API_KEY}&autoparse=true`;
const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const getMovieToEdit = (id) => {
  return async (dispatch) => {
    Promise.all([
      axios.get(`${BASE_URL}/movies/title/${id}`),
      axios.get(`${BASE_URL}/movies/title/${id}/people`),
      axios.get(`${BASE_URL}/movies/title/${id}/photos`),
    ]).then((res) => {
      dispatch({
        type: ADMIN_SET_DETAILS,
        data: {
          details: res[0].data,
          people: res[1].data.people,
          photos: res[2].data.images,
        },
      });
    });
  };
};

export const updateData = (id, list, type) => {
  return async (dispatch) => {
    // console.log('test', id, list, type);
    fetch(`${BASE_URL}/update/${id}/${type}`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ id: id, list: list }),
    }).then((res) => {
      dispatch(getMovieToEdit(id));
    });
  };
};

// Scrape Products
export const getProducts = (term, store = 'amazon') => {
  return async (dispatch) => {
    // Scrapping from Heroku to Amazon is blocked...
    // fetch(`${BASE_URL}/scrape/products`, {
    //   method: 'POST',
    //   headers: HEADERS,
    //   body: JSON.stringify({ term: term, store: store }),
    // }).then((res) => {
    //   console.log(res);
    // });
    if (store === 'amazon') dispatch(getProductsAmazon(term));
  };
};

export const getProductsAmazon = (searchTerm) => {
  // console.log('get amazon products: ', searchTerm);
  return async (dispatch) => {
    let pages = [],
      term = searchTerm.replace(/ /g, '+'),
      productResults = [];

    const url = `https://www.amazon.com/s?k=${term}`;
    const endpoint = `${SCRAPER_URL}&url=${url}`;
    const products = await axios.get(endpoint);

    pages.push(url);
    productResults = [...products.data.results];
    products.data.pagination.forEach((p, i) => {
      if (i > 0) pages.push(`${url}&page=${i + 1}`);
    });

    dispatch({
      type: ADMIN_SCRAPE_PRODUCTS,
      data: { curPage: 0, pages: pages, products: productResults },
    });
  };
};

export const getProductsPage = (pageUrl, page) => {
  return async (dispatch) => {
    const endpoint = `${SCRAPER_URL}&url=${pageUrl}`;
    const products = await axios.get(endpoint);
    dispatch({
      type: ADMIN_SCRAPE_PRODUCTS_PAGE,
      data: { curPage: page, products: [...products.data.results] },
    });
  };
};

export const updateCurPage = (page) => {
  return async (dispatch) => {
    dispatch({ type: ADMIN_UPDATE_PAGE, data: page });
  };
};

// Add products to Firebase Cloud Firestore
export const addProduct = (product) => {
  return async (dispatch) => {
    const { url } = product;
    const prod = await buildProduct(
      await axios.get(`${SCRAPER_URL}&url=${url}`),
      url
    );

    sendProduct(prod);

    async function getVariant(url) {
      sendProduct(
        await buildProduct(await axios.get(`${SCRAPER_URL}&url=${url}`), url)
      );
    }

    if (prod?.variations) {
      prod.variations.forEach((v) => {
        if (v.url) getVariant(v.url);
      });
    }
  };
};

async function buildProduct({ data }, url) {
  // structure the product with only the items we need
  return (({
    name,
    images,
    pricing,
    product_information: { ASIN },
    full_description,
    small_description,
    customization_options: { Style },
  }) => ({
    name,
    images,
    ASIN,
    price: Number(pricing.replace(/[^0-9.-]+/g, '')),
    full_description,
    small_description,
    main_image: images[0],
    variations: Style,
    url: url,
  }))(data);
}

async function sendProduct(product) {
  // send product to endpoint for firestore
  fetch(`${BASE_URL}/product/add`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(product),
  }).then((res) => {
    console.log('added product', res);
  });
}

// Get Unsorted Products
export const getUnsortedProducts = () => {
  return async (dispatch) => {
    const unsorted = await axios.get(`${BASE_URL}/products/unsorted`);
    dispatch({ type: ADMIN_ADD_UNSORTED, data: unsorted.data });
  };
};

// Update and Sort Product
export const updateProduct = (product) => {
  return async (dispatch) => {
    fetch(`${BASE_URL}/product/update/${product.id}`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(product),
    }).then((res) => {
      console.log('added product', res);
      siteSetting(); // update site settings
      dispatch({ type: ADMIN_FILTER_UNSORTED, data: product.id });
    });
  };
};
