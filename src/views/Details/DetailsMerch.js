import React from 'react';

import Card from '../../components/Cards/Card';

const DetailsMerch = ({ products }) => {
  return (
    <div className="products">
      <div className="product-container">
        <h2>Merchandise</h2>

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

export default DetailsMerch;
