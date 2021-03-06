import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/lib/integration/react';

import App from './App';
import Admin from './views/Admin/Admin';
import Details from './views/Details/Details';
import Merch from './views/Merch/Merch';
import MoviesList from './views/MoviesList';
import Products from './views/Products/Products';
import ProductsUnsorted from './views/Products/ProductsUnsorted';

import './styles/styles.scss';

const app = (AppComponent) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppComponent />}>
              <Route exact path="" element={<MoviesList />} />
              <Route
                exact
                path=":movie_id"
                element={<Details show="default" />}
              />
              <Route
                exact
                path=":movie_id/credits"
                element={<Details show="credits" />}
              />
              <Route
                exact
                path=":movie_id/gallery"
                element={<Details show="gallery" />}
              />
              <Route
                exact
                path=":movie_id/story"
                element={<Details show="story" />}
              />
              <Route
                exact
                path="/merch"
                onLeave={() => console.log('bye')}
                element={<Merch />}
              />
              <Route
                exact
                path="/admin"
                onLeave={() => console.log('bye')}
                element={<Admin />}
              />
              <Route
                exact
                path="/products"
                onLeave={() => console.log('bye')}
                element={<Products />}
              />
              <Route
                exact
                path="/products/unsorted"
                onLeave={() => console.log('bye')}
                element={<ProductsUnsorted />}
              />
              <Route path="*" element={<p>There's nothing here!</p>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(app(App), document.getElementById('root'));
