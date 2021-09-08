import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/wrapper.js';
import reportWebVitals from './reportWebVitals';
import configureStore from './components/configureStore.js';

let initialStore = {
  token: localStorage.getItem ("token") || null,
  user: JSON.parse (localStorage.getItem ("user")) || {},
  transactions: JSON.parse (localStorage.getItem ("transactions")) || [],
};

const store = configureStore(initialStore);

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
