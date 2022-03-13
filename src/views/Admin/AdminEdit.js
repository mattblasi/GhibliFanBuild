import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const AdminEdit = ({ details, people, photos }) => {
  const [mov, setMov] = useState();
  const [hasChange, setChange] = useState(false);
  const [photoList, addPhotos] = useState([]);
  const formInputs = ['title', 'og_title_rm', 'og_title_jp', 'poster'];

  function handleValueChange(field, val) {
    let newMov = { ...mov };
    newMov.details[field] = val;
    setMov({ ...newMov });

    console.log(newMov.details[field] === mov.details[field]);
    if (newMov.details[field] === mov.details[field]) {
      document.getElementById(`field-${field}`).classList.remove('edited');
    } else {
      document.getElementById(`field-${field}`).classList.add('edited');
    }
    setChange(document.querySelectorAll('.edited').length > 0);
  }

  function removePhoto({ p }, id) {
    document.getElementById(id).classList.add('remove');
    addPhotos([...photos, p]);
  }

  useEffect(() => {
    setMov({
      details: details,
      people: people,
      photos: photos,
    });
  }, [details, people, photos]);

  if (!mov) return <div />;
  return (
    <div className="admin-edit" data-id={mov.details.id}>
      <p>EDIT MODE {hasChange && <span> - [CHANGED]</span>}</p>
      <h2>
        {mov.details.title} <span>{mov.details.id}</span>
      </h2>

      {mov && (
        <React.Fragment>
          <div className="admin-edit--form">
            {formInputs.map((item) => {
              return (
                <div className="row" id={`field-${item}`} key={`field-${item}`}>
                  <label htmlFor={item}>Field: {item}</label>
                  <input
                    id={item}
                    name={item}
                    type="text"
                    value={mov.details[item]}
                    onChange={(e) => handleValueChange(item, e.target.value)}
                  />
                </div>
              );
            })}
          </div>
          <div className="gallery">
            <div className="gallery-remove">
              <h2>Photos Removal List</h2>
              {photoList.length > 0 && (
                <ul>
                  {photoList.length > 0 &&
                    photoList.map((p, i) => (
                      <li key={`images-${i}`}>&middot; {p}</li>
                    ))}
                </ul>
              )}
              {photos.length <= 0 && <p>no photos to delete</p>}
            </div>
            <div className="gallery-images">
              {mov.photos.length > 0 &&
                mov.photos.map((p, i) => {
                  return (
                    <article
                      id={`images-${i}`}
                      className="gallery-image"
                      key={`images-${i}`}
                      style={{
                        backgroundImage: `url(${p})`,
                      }}
                    >
                      <button
                        className="gallery-button"
                        onClick={() => {
                          removePhoto({ p }, `images-${i}`);
                        }}
                      >
                        remove
                      </button>
                    </article>
                  );
                })}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = ({ Admin: { details, people, photos } }) => ({
  details,
  people,
  photos,
});

export default connect(mapStateToProps)(AdminEdit);
