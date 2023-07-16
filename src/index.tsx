import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import getStore from './config/store';
import setupAxiosInterceptors from './config/axios-interceptor';
import { clearAuthentication } from './shared/reducers/auth';
import ErrorBoundary from './shared/error/error-boundary';
import AppComponent from './app';

const store = getStore();

setupAxiosInterceptors(() => store.dispatch(clearAuthentication('login.error.unauthorized')));

const rootEl = createRoot(document.getElementById('root')!);

const render = (Component: React.FC) =>
  rootEl.render(
    <ErrorBoundary>
      <Provider store={store}>
        <Component />
      </Provider>
    </ErrorBoundary>,
  );

render(AppComponent);
