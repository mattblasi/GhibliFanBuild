import React, { useState } from 'react';

const Dialog = ({ content, header, footer }) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <div className="dialog">
      <div className="dialog-window">
        {header && <header className="dialog-header"></header>}
        <main className="dialog-content">{content}</main>
        {footer && <footer className="dialog-footer"></footer>}
      </div>
    </div>
  );
};

export default Dialog;
