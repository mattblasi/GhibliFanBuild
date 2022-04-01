import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const ProductCard = ({ product }) => {
  // create form to manage add and call add function
  // add function should remove product when success
  // add should disable product while waiting for success/ failure
  const { register, handleSubmit } = useForm();
  const { main_image, name } = product;

  return (
    <React.Fragment>
      <img className="card-img" src={main_image} alt={name} />
      <div className="card-info">
        <h3>{name}</h3>
      </div>
      <form
        className="card-actions form"
        onSubmit={handleSubmit((data) => {
          console.log({
            ...product,
            ...data,
          });
          // call up
        })}
      >
        <p className="form-text">Set Options for Product:</p>
        <input {...register('title')} />
        <input type="submit" />
      </form>
    </React.Fragment>
  );
};

export default ProductCard;
