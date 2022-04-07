import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';

import { getAllProducts } from '../../actions/storeActions';

import Card from '../../components/Cards/Card';

const Merch = ({ movies, products, getAllProducts }) => {
  const [scroll, setScroll] = useState();
  //const [] = useState();

  const IMAGE1 = 'https://wallpaperaccess.com/full/1542328.jpg';

  useEffect(() => {
    document.title = `Studio Ghibli`;
    setScroll(document.getElementById('main'));
    getAllProducts(movies);
  }, []);

  console.log(products);

  return (
    <div className="merch">
      <div className="hero">
        <ParallaxProvider className="hero--wrapper" scrollContainer={scroll}>
          <ParallaxBanner layers={[{ image: IMAGE1, speed: -25 }]} />
        </ParallaxProvider>
      </div>
      <div className="merch-content">
        <h1 className="title">Merch</h1>
        <div className="products-list card-grid">
          {products &&
            products.map((p, i) => (
              <Card props={{ merch: p }} key={`merch-${i}`} />
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ Movies: { movies }, Store: { products } }) => ({
  movies,
  products,
});

const mapDispatchToProps = (dispatch) => ({
  getAllProducts: (movies) => dispatch(getAllProducts(movies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Merch);
