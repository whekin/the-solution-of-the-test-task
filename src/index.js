import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import './stylesheets/index.css';
import App from './containers/App';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const middleware = [thunk];
if (process.env.NODE_DEV !== 'prodation')
  middleware.push(logger);

const store = createStore(reducer, applyMiddleware(...middleware) );

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
