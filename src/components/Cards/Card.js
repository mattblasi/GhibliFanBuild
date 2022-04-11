import React from 'react';
import { addProduct } from '../../actions/adminActions';

import CastCard from './CardCast';
import MovieCard from './CardMovie';
import MerchCard from './CardMerch';
import ProductCard from './CardProduct';

const Card = ({ props }) => {
  let classes = `card `;

  if (props?.cast) classes += 'cast';
  if (props?.merch) classes += 'merch';
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
      {props?.merch && <MerchCard merch={props?.merch} />}
      {props?.cast && <CastCard person={props?.cast} />}
    </div>
  );
};

export default Card;
