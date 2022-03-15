import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import EditDetails from './EditDetails';
import EditPhotos from './EditPhotos';
import EditWallpapers from './EditWallpapers';

const Edit = ({ Admin: { details, people, photos } }) => {
  const [hasChange, setChange] = useState(false);
  const [tab, setTab] = useState();
  const [mov, setMov] = useState();

  const formSections = ['details', 'synopsis', 'summaries', 'images'];

  const handleTabClick = (t) => setTab(t);
  const TabLink = ({ val }) => {
    let classes = val === tab ? 'tab active' : 'tab';
    return (
      <li className={classes} onClick={() => handleTabClick(val)}>
        {val}
      </li>
    );
  };

  return (
    <div className="admin-edit">
      <span>Edit Movie</span>
      <ul className="tabs">
        {formSections.map((s, i) => (
          <TabLink val={s} key={`tab-${i}`} />
        ))}
      </ul>
      {tab === 'details' && <EditDetails details={details} />}
      {tab === 'images' && <EditWallpapers wallpapers={details.wallpapers} />}
      {tab === 'images' && <EditPhotos photos={photos} />}
    </div>
  );
};

const mapStateToProps = ({ Admin }) => ({
  Admin,
});

export default connect(mapStateToProps)(Edit);
