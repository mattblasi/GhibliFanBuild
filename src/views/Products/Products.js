import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {
  getProducts,
  getProductsPage,
  updateCurPage,
  addProduct,
} from '../../actions/adminActions';

const Products = ({
  curPage,
  products,
  pages,
  unsorted,
  movies,
  getProducts,
  getProductsPage,
  updateCurPage,
  addProduct,
}) => {
  const [productList, setProducts] = useState([]);
  const [pageList, setPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visible, setVisible] = useState(false);
  const [movieList, setMovies] = useState([]);
  const [fetchList, setFetchList] = useState([]);
  const [page, setPage] = useState(curPage);
  const [selectedStore, setSelectedStore] = useState();

  const stores = [
    { value: 'amazon', label: 'amazon' },
    { value: 'etsy', label: 'etsy' },
  ];
  const categories = [];

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }
  function handleAddProduct(product, index) {
    addProduct(product);
  }
  function handleGetPage(url, page) {
    // only fetch new data if we don't already have it!
    if (products[page]) {
      setProducts([...products[page]]);
      updateCurPage(page);
    } else {
      getProductsPage(url, page);
    }
  }

  useEffect(() => {
    if (movies.length > 0) {
      let selectVals = [];
      movies.forEach((m) => {
        selectVals.push({
          value: m.id,
          label: m.title,
        });
      });
      setMovies([...selectVals]);
    }
  }, [movies]);

  useEffect(() => {
    if (curPage) setPage(curPage);
  }, [curPage]);

  useEffect(() => {
    if (pages?.length > 0) setPages([...pages]);
  }, [pages]);

  useEffect(() => {
    if (products[curPage] && products[curPage].length > 0) {
      setProducts([...products[curPage]]);
    }
  }, [products]);

  return (
    <React.Fragment>
      <div className="products-details">
        <div className="products">
          <h2>Products</h2>
          <div className="product-search">
            <input
              id="product-search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleChange}
            />
            <Select
              id="product-stores"
              options={stores}
              onChange={(e) => setSelectedStore(e.value)}
            />
            <button onClick={() => getProducts(searchTerm, selectedStore)}>
              Get Products
            </button>
            {productList.length > 0 && (
              <div className="totals">Total Products {productList.length}</div>
            )}
          </div>
          <div className="product-pages">
            {pageList &&
              pageList.map((p, i) => (
                <button
                  className={page === i ? `page active` : `page`}
                  key={`page-${i}`}
                  onClick={() => handleGetPage(p, i)}
                >
                  {i + 1}
                </button>
              ))}
          </div>
          <div className="product-list">
            {productList.length > 0 &&
              productList.map((p, i) => (
                <div className="product" key={`product-${i}`}>
                  <div className="product-image">
                    <img src={p.image} />
                  </div>
                  <div className="product-info">
                    <h3>{p.name}</h3>
                    <p>Price: {p.price_string}</p>
                    <button onClick={() => handleAddProduct(p, i)}>
                      Add Product
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({
  Admin: { curPage, products, pages, unsorted },
  Movies: { movies },
}) => ({
  curPage,
  products,
  pages,
  unsorted,
  movies,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: (searchTerm, store) => dispatch(getProducts(searchTerm, store)),
  getProductsPage: (url, page) => dispatch(getProductsPage(url, page)),
  updateCurPage: (page) => dispatch(updateCurPage(page)),
  addProduct: (product) => dispatch(addProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
