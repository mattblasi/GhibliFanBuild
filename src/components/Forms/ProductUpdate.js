import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Select, { ActionMeta, OnChangeValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { updateProduct } from '../../actions/adminActions';

const ProductUpdate = ({ product, settings, movies, updateProduct }) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { main_image, name, price, small_description, url } = product;
  const [store, setStore] = useState();

  const stores = settings.stores.map((s) => {
    return { value: s, label: s };
  });
  const categories = settings.categories.map((c) => {
    return { value: c, label: c };
  });
  const movieList = movies.map((m) => {
    return { value: m.id, label: m.title };
  });

  const onError = (errors, e) => console.log('test', errors, e);
  const onSubmit = (data, e) => {
    updateProduct({
      ...product,
      ...data,
      title: data.title,
      categories: data.categories.map((m) => m.value),
      store: data.store.value,
      movies: data.movies.map((m) => m.value),
      sorted: true,
    });
  };

  useEffect(() => {
    setStore(stores[0]);
  }, []);

  if (!product) return <div />;

  return (
    <form
      className="card-actions form"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <p className="form-text">Set Options for Product:</p>

      <div className="form-item">
        <label>Display Title</label>
        <input
          {...register('title', { required: true, maxLength: 200 })}
          placeholder="Title"
        />
        {errors.title?.type === `required` && `title is required`}
        {errors.title?.type === `minLength` &&
          `title cannot be longer than 200 charagers`}
      </div>

      <div className="form-item">
        <label>Product Store</label>
        <Controller
          name="store"
          control={control}
          defaultValue={stores[0]}
          render={({ field: { onChange, value, name, ref } }) => (
            <Select
              defaultValue={stores[0]}
              inputRef={ref}
              name={name}
              onChange={(val) => {
                onChange(val);
                setStore(val);
              }}
              options={stores}
            />
          )}
        />
      </div>

      <div className="form-item">
        <label>Movie(s)</label>
        <Controller
          name="movies"
          control={control}
          render={({ field: { onChange, value, name, ref } }) => (
            <Select
              inputRef={ref}
              isMulti
              name={name}
              onChange={(val) => {
                onChange(val);
              }}
              options={movieList}
            />
          )}
        />
      </div>

      <div className="form-item">
        <label>Categories</label>
        <Controller
          name="categories"
          control={control}
          render={({ field: { onChange, value, name, ref } }) => (
            <CreatableSelect
              name={name}
              inputRef={ref}
              options={categories}
              onChange={(val) => {
                onChange(val);
              }}
              isMulti
              isClearable
            />
          )}
        />
      </div>

      {store?.value === 'amazon' && (
        <div className="form-item">
          <label>
            Amazon Affiliate Url (
            <a href={url} target="_blank">
              link
            </a>
            )
          </label>
          <input {...register('affiliate_url')} placeholder="url" />
        </div>
      )}

      <div className="form-item">
        <label>Price</label>
        <input {...register('price')} placeholder="Price" value={price} />
      </div>

      <input type="submit" value="Sort Product" />
    </form>
  );
};

const mapStateToProps = ({ Site: { settings }, Movies: { movies } }) => ({
  settings,
  movies,
});

const mapDispatchToProps = (dispatch) => ({
  updateProduct: (product) => dispatch(updateProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductUpdate);
