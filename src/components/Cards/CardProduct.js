import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import ProductUpdate from '../Forms/ProductUpdate';

const ProductCard = ({ product, form, action }) => {
  const [showImages, setShowImages] = useState(false);
  const {
    affiliate_url,
    ASIN = '',
    main_image,
    images,
    title,
    name,
    price,
    small_description,
    url,
  } = product;

  return (
    <React.Fragment>
      <img
        className="card-img"
        src={product?.image ? product.image : main_image}
        alt={name}
      />
      <div className="card-info">
        <h3>
          <a href={affiliate_url ? affiliate_url : url} target="_blank">
            {title ? title : name}
          </a>
        </h3>
        {small_description && <p>{small_description}</p>}
        {price && <p>Price: ${parseFloat(price).toFixed(2)}</p>}
        {ASIN && <p>ASIN: {ASIN}</p>}
        {form === 'add' && <button onClick={action}>Add Product</button>}
      </div>
      {form === 'update' && <ProductUpdate product={product} />}
      {images && showImages && (
        <div className="card-images">
          {images.map((i, index) => (
            <img src={i} key={`image-${ASIN}-${index}`} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductCard;
