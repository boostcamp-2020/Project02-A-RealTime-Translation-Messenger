import React from 'react';
import ReactDOM from 'react-dom';
import Thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import rootReducer from './modules';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(Thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
