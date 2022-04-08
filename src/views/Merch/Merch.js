import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import Masonry from 'react-masonry-css';
import { useForm, Controller } from 'react-hook-form';
import Select, { ActionMeta, OnChangeValue } from 'react-select';

import { getAllProducts } from '../../actions/storeActions';

import ProductFilters from '../../components/Forms/ProductFilters';

import Card from '../../components/Cards/Card';

const Merch = ({ movies, products, settings, getAllProducts }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [scroll, setScroll] = useState();
  const [store, setStore] = useState();

  const breakpointColumnsObj = {
    default: 8,
    1800: 6,
    1400: 5,
    1200: 3,
    700: 3,
    500: 2,
  };

  const IMAGE1 = 'https://wallpaperaccess.com/full/81806.jpg';

  const stores = settings.stores.map((s) => {
    return { value: s, label: s };
  });
  const categories = settings.categories.map((c) => {
    return { value: c, label: c };
  });
  const movieList = movies.map((m) => {
    return { value: m.id, label: m.title };
  });

  useEffect(() => {
    document.title = `Studio Ghibli`;
    setScroll(document.getElementById('main'));
    getAllProducts(movies);
  }, []);

  return (
    <div className="merch">
      <div className="hero">
        <ParallaxProvider className="hero--wrapper" scrollContainer={scroll}>
          <ParallaxBanner layers={[{ image: IMAGE1, speed: -25 }]} />
        </ParallaxProvider>
      </div>
      <div className="merch-content">
        <h1 className="title">Merch</h1>
        <div className="products-filter">
          <h3>Filter Products</h3>
          <ProductFilters />
        </div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="products-masonry-grid products-list"
          columnClassName="products-masonry-grid_column"
        >
          {products.length &&
            products.map((p, i) => (
              <Card props={{ merch: p }} key={`merch-${i}`} />
            ))}
        </Masonry>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  Movies: { movies },
  Store: { products },
  Site: { settings },
}) => ({
  movies,
  products,
  settings,
});

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: (movies) => dispatch(getAllProducts(movies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Merch);
