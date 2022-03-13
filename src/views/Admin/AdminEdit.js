import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const AdminEdit = ({ movie: [movie] }) => {
  const [mov, setMov] = useState();
  console.log('set movie: ', movie);

  // functions to build form returned by useForm() hook
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    errors,
    formState,
  } = useForm();

  function onSubmit(data) {}

  function createUser(data) {}

  function updateUser(id, data) {}

  useEffect(() => {
    console.log('use effect');

  }, []);

  return (
    <div className="admin-edit" data-id={movie.id}>
      <p>EDIT MODE</p>
      <h2>{movie.title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} onReset={reset}></form>
    </div>
  );
};

export default AdminEdit;
