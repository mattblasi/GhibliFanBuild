import React from 'react';
import { Link } from 'react-router-dom';

const MerchCard = ({ merch }) => {
  const {
    affiliate_url,
    main_image,
    images,
    title,
    name,
    price,
    small_description,
    url,
  } = merch;

  console.log(merch);

  return (
    <Link
      to={affiliate_url ? affiliate_url : url}
      style={{ backgroundImage: `url(${main_image})` }}
    >
      <img className="card-img" src={main_image} />
      <div className="card-info">
        {/* <p className="title">{title}</p> */}
        <p className="price">${price}</p>
      </div>
    </Link>
  );
};

export default MerchCard;
