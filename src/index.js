import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/lib/integration/react';

import App from './App';
import MoviesList from './views/MoviesList';
import MovieDetails from './views/MovieDetails';

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
                element={<MovieDetails show="default" />}
              />
              <Route
                exact
                path=":movie_id/credits"
                element={<MovieDetails show="credits" />}
              />
              <Route
                exact
                path=":movie_id/gallery"
                element={<MovieDetails show="default" />}
              />
              <Route
                exact
                path=":movie_id/story"
                element={<MovieDetails show="story" />}
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
