import React from 'react';
import ReactDOM from 'react-dom';
import Thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './App';
import rootReducer from './modules';

export const history = createBrowserHistory();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(Thunk)));

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.querySelector('#root'),
);
