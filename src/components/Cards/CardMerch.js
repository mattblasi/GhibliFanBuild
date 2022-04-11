import React from 'react';

const MerchCard = ({ merch }) => {
  const { affiliate_url, main_image, name, price, url } = merch;

  return (
    <a
      href={affiliate_url ? affiliate_url : url}
      style={{ backgroundImage: `url(${main_image})` }}
      target="_blank"
    >
      <img className="card-img" src={main_image} />
      <div className="card-info">
        <p className="price">${price}</p>
      </div>
    </a>
  );
};

export default MerchCard;
