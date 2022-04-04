import React from 'react';
import { addProduct } from '../../actions/adminActions';

import MovieCard from './CardMovie';
import ProductCard from './CardProduct';

const Card = ({ props }) => {
  let classes = `card `;

  if (props?.movie) classes += 'movie';
  if (props?.recent) classes += 'recent';
  if (props?.product) classes += 'product';

  return (
    <div className={classes}>
      {props?.movie && <MovieCard movie={props?.movie} />}
      {props?.recent && <MovieCard movie={props?.recent} basic={true} />}
      {props?.product && (
        <ProductCard
          product={props?.product}
          form={props?.form}
          action={props?.submit}
        />
      )}
    </div>
  );
};

export default Card;
