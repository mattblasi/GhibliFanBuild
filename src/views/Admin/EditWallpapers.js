import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const EditWallpapers = ({ wallpapers }) => {
  const [wallpaperList, setWallpapers] = useState();
  const [removalList, updateRemovalList] = useState([]);

  useEffect(() => {
    if (wallpapers) setWallpapers([...wallpapers]);
    let removals = document.querySelectorAll('.wallpaper.remove');
    removals.forEach((img) => img.classList.remove('remove'));
  }, [wallpapers]);

  function toggleRemoval(w, elem) {
    let list = [...removalList];
    if (list.includes(w)) {
      elem.parentElement.classList.remove('remove');
      updateRemovalList(list.splice(list.indexOf(w), 0));
    } else {
      updateRemovalList([...list, w]);
      elem.parentElement.classList.add('remove');
    }
  }

  return (
    <div className="edit--wallpapers">
      <h3>Wallpapers</h3>

      {wallpaperList &&
        wallpaperList.map((w, i) => (
          <div
            className="wallpaper"
            key={`wallpaper-${i}`}
            style={{ backgroundImage: `url(${w})` }}
          >
            <button onClick={(e) => toggleRemoval(w, e.target)}></button>
          </div>
        ))}
      <button
        className="wallpaper wallpaper-add"
        onClick={() => console.log('add')}
      >
        <span>Add Wallpaper</span>
      </button>
    </div>
  );
};

export default EditWallpapers;
