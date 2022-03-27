import React from 'react';

import MovieCard from './CardMovie';
import ProductCard from './CardProduct';

const Card = ({ movie, product, recent }) => {
  let classes = `card `;

  if (movie) classes += 'movie';
  if (recent) classes += 'recent';
  if (product) classes += 'product';

  return (
    <div className={classes}>
      {movie && <MovieCard movie={movie} />}
      {recent && <MovieCard movie={recent} basic={true} />}
      {product && <ProductCard product={product} />}
    </div>
  );
};

export default Card;
