import React from 'react';
import Masonry from 'react-masonry-css';

import Card from '../../../components/Cards/Card';

const DetailsMerch = ({ products }) => {
  const breakpointColumnsObj = {
    default: 5,
    1200: 3,
    700: 3,
    500: 2,
  };

  return (
    <div className="products">
      <div className="product-container">
        <h2>Merchandise</h2>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="products-masonry-grid products-list"
          columnClassName="products-masonry-grid_column"
        >
          {products &&
            products.map((p, i) => (
              <Card props={{ merch: p }} key={`merch-${i}`} />
            ))}
        </Masonry>
      </div>
    </div>
  );
};

export default DetailsMerch;
