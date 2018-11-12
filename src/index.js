import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import App from './containers/App';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import 'normalize.css';
import './stylesheets/index.css';

const middleware = [thunk];
if (true)
  middleware.push(logger);

const store = createStore(reducer, applyMiddleware(...middleware) );

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
