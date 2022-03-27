import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUnsortedProducts } from '../../actions/adminActions';

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
      {unsorted &&
        unsorted.map((p, i) => (
          <div className="product" key={`product-${i}`}>
            Product
          </div>
        ))}
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
