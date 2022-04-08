import React from 'react';

import apple from '../../images/appstores/appstore-apple.svg';
import google from '../../images/appstores/appstore-google.svg';

const MobileApp = () => {
  return (
    <div className="app-bar">
      <div className="app-bar--content">
        <a href="#" className="app-bar--link" title="download for iOS">
          <img src={apple} />
        </a>
        <a href="#" className="app-bar--link" title="download for Android">
          <img src={google} />
        </a>
      </div>
    </div>
  );
};

export default MobileApp;
