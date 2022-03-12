import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const DetailsSummary = ({ summaries }) => {
  const [count, setCount] = useState(0);
  const timeoutRef = React.useRef(null);
  const delay = 500000;

  function resetTimeout() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCount((prevIndex) =>
          prevIndex === summaries.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => resetTimeout();
  }, [count]);

  return (
    <div className="details-storyline">
      <p className="details-storyline--text">
        {summaries[count].slice(0, 250).concat('...')}
      </p>
      <div className="details-storyline--dots">
        {summaries.map((_, i) => (
          <div
            key={i}
            className={`details-storyline--dot${count === i ? ' active' : ''}`}
            onClick={() => setCount(i)}
          ></div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({
  Details: {
    details: { summaries },
  },
}) => ({
  summaries,
});

export default connect(mapStateToProps)(DetailsSummary);
