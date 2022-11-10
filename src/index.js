import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Content/App/App.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import { store } from '../src/Redux/Store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);

