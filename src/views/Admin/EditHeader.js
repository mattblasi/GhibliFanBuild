import React from 'react';

const Header = ({ title, buttons, count, total }) => {
  console.log(count, total);
  return (
    <header className="edit-header">
      <h3>{title}</h3>
      {count && total > 0 && (
        <p className="count">
          Selected {count} of {total} ({total - count})
        </p>
      )}
      {buttons &&
        buttons.map((b, i) => (
          <button key={`header-button-${i}`} onClick={b.click}>
            {b.title} {title}
          </button>
        ))}
    </header>
  );
};

export default Header;
