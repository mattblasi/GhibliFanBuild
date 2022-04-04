import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getUnsortedProducts } from '../../actions/adminActions';

import Card from '../../components/Cards/Card';

const ProductsUnsorted = ({ unsorted, getUnsortedProducts }) => {
  const [unsortedList, setUnsorted] = useState([]);

  useEffect(() => {
    console.log(unsorted.length);
    if (unsorted.length > 0) {
      setUnsorted(new Set([...unsorted]));
    } else {
      getUnsortedProducts();
    }
  }, [unsorted]);

  return (
    <React.Fragment>
      {!unsorted.length && (
        <button
          className="button unsorted-get"
          onClick={() => getUnsortedProducts()}
        >
          Get Unsorted
        </button>
      )}

      {unsorted.length > 0 && (
        <div className="card-list">
          {unsorted.map((p, i) => (
            <Card props={{ product: p, form: 'update' }} key={`product-${i}`} />
          ))}
        </div>
      )}
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
