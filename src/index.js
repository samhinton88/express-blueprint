import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import 'babel-polyfill';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';

import expressBlueprintApp from './reducers';

const store = createStore(expressBlueprintApp, {}, applyMiddleware(reduxThunk));

const title = 'Express Blueprint';

console.log('store.getState', store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
