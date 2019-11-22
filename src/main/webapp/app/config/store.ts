import { applyMiddleware, compose, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import reducer, { IRootState } from 'app/shared/reducers';
import errorMiddleware from './error-middleware';
import loggerMiddleware from './logger-middleware';
import { createTransform, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
// @ts-ignore
import storageSession from 'redux-persist/lib/storage/session';

const defaultMiddlewares = [thunkMiddleware, errorMiddleware, promiseMiddleware(), loggerMiddleware];
const composedMiddlewares = middlewares =>
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(
    applyMiddleware(...defaultMiddlewares, ...middlewares)
    // DevTools.instrument()
    )
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const myTransform = createTransform(
  // transform state being rehydrated
  (inboundState, key) => {
    if (key === 'itemDetail') {
      return {
        ...inboundState,
        loadedAttribute: false,
        loading: false,
        requestFailure: false,
        displayViewPaymentOption: false
      };
    } else if (key === 'category') {
      return {
        ...inboundState,
        loading: false,
        menuExpand: false
      };
    } else if (key === 'common') {
      return {
        ...inboundState,
        loadedAttribute: true,
        offlineMode: false
      };
    } else if (key === 'infoModal') {
      return {
        ...inboundState,
        displayModal: false,
        modalContent: ''
      };
    } else if (key === 'checkout') {
      return {
        ...inboundState,
        loading: false,
        requestFailure: false
      };
    } else if (key === 'pageCommon') {
      return {
        ...inboundState,
        loading: false,
        requestFailure: false,
        postContactUsStatus: false
      };
    } else if (key === 'user') {
      return {
        ...inboundState,
        loading: false,
        displayRegisterForm: false,
        loadingCheckAuthenticate: false,
        requestLoginFailure: false,
        requestRegisterFailure: false,
        requestForgotPasswordFailure: false,
        requestForgotPasswordSuccess: false
      };
    } else {
      return { ...inboundState };
    }
  },
  (outboundState, key) => outboundState
);

const persistConfig = {
  key: 'root',
  storage: storageSession,
  transforms: [myTransform],
  whitelist: ['payment', 'itemDetail', 'category', 'carousel', 'user', 'locale']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const initialize = (initialState?: IRootState, middlewares = []) =>
  // @ts-ignore
  createStore(persistedReducer, initialState, composedMiddlewares(middlewares));

export default initialize;
