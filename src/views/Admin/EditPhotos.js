import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { updateData } from '../../actions/adminActions';

import Header from './EditHeader';

const EditPhotos = ({ id, photos, updateData }) => {
  const [photoList, setPhotos] = useState();
  const [removalList, updateRemovalList] = useState([]);

  useEffect(() => {
    if (photos) setPhotos([...photos]);
    let removals = document.querySelectorAll('.photo.remove');
    removals.forEach((img) => img.classList.remove('remove'));
    updateRemovalList([]);
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

  function handleUpdate() {
    let updatedList = photoList.filter((i) => !removalList.includes(i));
    updateData(id, updatedList, 'images');
    updateData(id, removalList, 'unsorted');
  }

  function handleAdd() {
    console.log('add photo');
  }

  const buttons = [
    {
      title: 'Remove Selected',
      click: () => handleUpdate(),
    },
    {
      title: 'Add',
      click: () => handleAdd(),
    },
  ];

  return (
    <div className="edit--photos">
      <Header
        title="Photos"
        buttons={buttons}
        count={removalList?.length}
        total={photoList?.length}
      />
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
      <button className="photo photo-add" onClick={() => handleAdd()}>
        <span>Add Wallpaper</span>
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateData: (id, list, type) => dispatch(updateData(id, list, type)),
});

export default connect(null, mapDispatchToProps)(EditPhotos);
