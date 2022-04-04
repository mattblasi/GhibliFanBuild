import React from 'react';

import Card from './Cards/Card';

const MerchList = ({ movie_id, products }) => {
  console.log('merchList', products);
  return (
    <div className="products">
      <div className="product-container">
        <h2>Merchandise</h2>

        <div className="products-list card-grid">
          {products &&
            products.map((p, i) => (
              <Card props={{ product: p }} key={`product-${i}`} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MerchList;
