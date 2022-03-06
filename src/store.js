import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage/session';
import { createBrowserHistory } from 'history';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducers = persistReducer(persistConfig, reducers);

export const history = createBrowserHistory();

const middleware = [thunk];

export const store = configureStore({
  reducer: persistedReducers,
  middleware,
});

export const persistor = persistStore(store);
export const { dispatch, getState } = store;
