import * as React from 'react';
import { CookiesProvider } from 'react-cookie';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Router from './components/router';
import store from './reducers';
import './styles/normalize.scss';

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <Router />
    </CookiesProvider>
  </Provider>,
  document.getElementById('root'),
);
