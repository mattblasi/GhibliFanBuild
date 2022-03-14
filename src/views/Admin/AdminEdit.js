import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const AdminEdit = ({ Admin: { details, people, photos } }) => {
  const [hasChange, setChange] = useState(false);
  const [photoList, addPhotos] = useState([]);
  const [mov, setMov] = useState();

  const formInputs = ['title', 'og_title_rm', 'og_title_jp', 'poster'];

  function handleValueChange(field, val) {
    let newMov = { ...mov };
    newMov.details[field] = val;
    if (newMov.details[field] === details[field]) {
      document.getElementById(`field-${field}`).classList.remove('edited');
    } else {
      document.getElementById(`field-${field}`).classList.add('edited');
    }
    setChange(document.querySelectorAll('.edited').length > 0);
    setMov({ ...newMov });
  }

  function addToBeRemoved({ p }, id) {
    document.getElementById(id).classList.add('remove');
    addPhotos([...photoList, p]);
  }

  function removeToBeRemoved(photo) {
    let updatedList = [...photoList];
    addPhotos(updatedList.filter((p) => photo !== p));
    document
      .querySelector(`[src="${photo}"]`)
      .parentElement.classList.remove('remove');
  }

  useEffect(() => {
    setMov({
      details: { ...details },
      people: { ...people },
      photos: [...photos],
    });
    addPhotos([]);
    let removals = document.querySelectorAll('.gallery-image.remove');
    removals.forEach(img => img.classList.remove('remove'));
  }, [details, people, photos]);

  return (
    <div className="admin-edit" data-id={details.id}>
          <p>EDIT MODE {hasChange && <span> - [CHANGED]</span>}</p>
          <h2>
            {details.title} <span>{details.id}</span>
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
                          <li key={`images-${i}`}>
                            <button onClick={() => removeToBeRemoved(p)}>x</button>
                            {p}
                          </li>
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
                          <img src={p} style={{ display: 'none' }} />
                          <button
                            className="gallery-button"
                            onClick={() => {
                              addToBeRemoved({ p }, `images-${i}`);
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

const mapStateToProps = ({ Admin }) => ({
  Admin,
});

export default connect(mapStateToProps)(AdminEdit);
