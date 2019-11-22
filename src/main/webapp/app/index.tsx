import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppContainer } from 'react-hot-loader';

import DevTools from './config/devtools';
import initStore from './config/store';
import { registerLocale } from './config/translation';
import setupAxiosInterceptors from './config/axios-interceptor';
import { clearAuthentication } from './shared/reducers/authentication';
import ErrorBoundary from './shared/error/error-boundary';
import AppComponent from './app';
import { Route, Router, Switch } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserHistory } from 'history';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools/> : null;

export const store: any = initStore();
registerLocale(store);

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));

// loadIcons();

export const history = createBrowserHistory({
  /* pass a configuration object here if needed */
});

const rootEl = document.getElementById('root');
const persistor = persistStore(store);
const render = Component =>
  ReactDOM.render(
    <ErrorBoundary>
      <AppContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div>
              {/* If this slows down the app in dev disable it and enable when required  */}
              {/*{devTools}*/}
              <Router history={history}>
                <Switch>
                  <Route path="/" component={Component}/>
                </Switch>
              </Router>
            </div>
          </PersistGate>
        </Provider>
      </AppContainer>
    </ErrorBoundary>,
    rootEl
  );

render(AppComponent);

// This is quite unstable
// if (module.hot) {
//   module.hot.accept('./app', () => {
//     const NextApp = require<{ default: typeof AppComponent }>('./app').default;
//     render(NextApp);
//   });
// }
