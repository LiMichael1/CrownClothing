import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';
// import loggerMiddleware from './middleware/logger';

const sagaMiddleware = createSagaMiddleware();

// Only run middleware when development
// & filter out anything that isn't true
const middleWares = [
  process.env.NODE_ENV === 'development' && logger,
  // thunk,
  sagaMiddleware,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistConfig = {
  key: 'root', // location where the state is at
  storage, // browser local storage usually
  blacklist: ['user'], // User State depends on Firebase listener
  // whitelist: ['cart'], // only persist the cart -> get Categories from firebase already
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
