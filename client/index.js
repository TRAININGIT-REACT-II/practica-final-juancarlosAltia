import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './src/store'; // Aquí importas tu store de Redux
import App from './src/App'; // Aquí importas tu componente principal de React

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);