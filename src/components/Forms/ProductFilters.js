import React from 'react';
import { connect } from 'react-redux';
import { updateProduct } from '../../actions/adminActions';

import Form from './Form';

const ProductFilters = ({ settings, movies }) => {
  const title = 'Filter Products';

  const stores = settings.stores.map((s) => {
    return { value: s, label: s };
  });
  const categories = settings.categories.map((c) => {
    return { value: c, label: c };
  });
  const movieList = movies.map((m) => {
    return { value: m.id, label: m.title };
  });

  const fields = [
    { name: 'movies', type: 'multiselect', options: movieList, required: true },
    { name: 'store', type: 'select', options: stores },
    { name: 'categories', type: 'multiselect', options: categories },
  ];

  const actions = {
    onSubmit: (data, e) => console.log('submit: ', data, e),
    onError: (data, e) => console.log('submit: ', data, e),
  };

  return <Form form="filters" items={fields} actions={actions} />;
};

const mapStateToProps = ({ Site: { settings }, Movies: { movies } }) => ({
  settings,
  movies,
});

const mapDispatchToProps = (dispatch) => ({
  updateProduct: (product) => dispatch(updateProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductFilters);
