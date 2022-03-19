import React from 'react';

const Header = ({ title, buttons }) => {
  return (
    <header className="edit-header">
      <h3>{title}</h3>
      {buttons &&
        buttons.map((b, i) => (
          <button key={`header-button-${i}`} onClick={b.click}>
            {title} {b.title}
          </button>
        ))}
    </header>
  );
};

export default Header;
