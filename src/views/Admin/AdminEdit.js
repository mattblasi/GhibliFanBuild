import React, { useState, useEffect } from 'react';
import { Prompt } from 'react-router';

const AdminEdit = ({ movie: [movie] }) => {
  const [mov, setMov] = useState();
  const [hasChange, setChange] = useState(false);
  const formInputs = ['title', 'og_title_rm', 'og_title_jp', 'poster'];

  function handleValueChange(field, val) {
    let newMov = { ...mov };
    newMov[field] = val;
    setMov({ ...newMov });
    if (newMov[field] === movie[field]) {
      document.getElementById(`field-${field}`).classList.remove('edited');
    } else {
      document.getElementById(`field-${field}`).classList.add('edited');
    }
    setChange(document.querySelectorAll('.edited').length > 0);
  } 

  useEffect(() => {
    setMov(movie);
  }, [movie]);

  return (
    <div className="admin-edit"  data-id={movie.id}>
      <p>EDIT MODE {hasChange && ( <span> - [CHANGED]</span> )}</p>
      <h2>
        {movie.title}
        <span>{movie.id}</span>
      </h2>

      {mov && (
        <React.Fragment>
          <div className="admin-edit--form">
            {formInputs.map(item => {

              return (
                <div className="row" id={`field-${item}`} key={`field-${item}`}>
                  <label htmlFor={item}>Field: {item}</label>
                  <input
                    id={item}
                    name={item}
                    type="text"
                    value={mov[item]}
                    onChange={(e) => handleValueChange(item, e.target.value)}
                  />
                </div>
              );
            })}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default AdminEdit;
