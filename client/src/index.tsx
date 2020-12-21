import React from 'react';
import ReactDOM from 'react-dom';
import Thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

import App from './App';
import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';

export const history = createBrowserHistory();

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'production' ? applyMiddleware(Thunk) : composeWithDevTools(applyMiddleware(Thunk)),
);

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.querySelector('#root'),
);
