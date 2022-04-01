import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUnsortedProducts } from '../../actions/adminActions';

import Card from '../../components/Cards/Card';

const ProductsUnsorted = ({ unsorted, getUnsortedProducts }) => {
  const [unsortedList, setUnsorted] = useState([]);

  useEffect(() => {
    if (unsorted.length > 0) {
      setUnsorted(new Set([...unsorted]));
    }
  }, [unsorted]);

  return (
    <React.Fragment>
      <nav>
        <button
          className="button unsorted-get"
          onClick={() => getUnsortedProducts()}
        >
          Get Unsorted
        </button>
      </nav>
      <div className="card-list">
        {unsorted &&
          unsorted.map((p, i) => <Card product={p} key={`product-${i}`} />)}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ Admin: { unsorted } }) => ({
  unsorted,
});

const mapDispatchToProps = (dispatch) => ({
  getUnsortedProducts: () => dispatch(getUnsortedProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsUnsorted);
