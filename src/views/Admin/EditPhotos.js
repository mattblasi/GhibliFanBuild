import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const EditPhotos = ({ photos }) => {
  const [photoList, setPhotos] = useState();
  const [removalList, updateRemovalList] = useState([]);

  useEffect(() => {
    if (photos) setPhotos([...photos]);
    let removals = document.querySelectorAll('.photo.remove');
    removals.forEach((img) => img.classList.remove('remove'));
  }, [photos]);

  function toggleRemoval(p, elem) {
    let list = [...removalList];
    if (list.includes(p)) {
      elem.parentElement.classList.remove('remove');
      updateRemovalList(list.splice(list.indexOf(p), 0));
    } else {
      updateRemovalList([...list, p]);
      elem.parentElement.classList.add('remove');
    }
  }

  return (
    <div className="edit--photos">
      <h3>Photos</h3>
      {photoList &&
        photoList.map((p, i) => (
          <div
            className="photo"
            key={`photo-${i}`}
            style={{ backgroundImage: `url(${p})` }}
          >
            <button onClick={(e) => toggleRemoval(p, e.target)}></button>
          </div>
        ))}
      <button className="photo photo-add" onClick={() => console.log('add')}>
        <span>Add Wallpaper</span>
      </button>
    </div>
  );
};

export default EditPhotos;
