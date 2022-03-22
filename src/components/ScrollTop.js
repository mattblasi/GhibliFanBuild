import React, { useEffect } from 'react';

const ScrollTop = () => {
  let content, scroll;

  useEffect(() => {
    content = document.getElementById('main');
    scroll = document.getElementById('scroll-top');
  }, []);

  if (content)

  function scrollHandler() {
    content.scroll(function () {
      if (scroll.scrollTop() > 100) {
        scroll.classList.add('is-visible');
      } else {
        scroll.classList.remove('is-visible');
      }
    });
  }

  const handleClick = () => {
    content.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      id="scroll-top"
      className="scroll-top"
      onClick={() => handleClick()}
    >
      <span>scroll to top</span>
    </button>
  );
};

export default ScrollTop;
