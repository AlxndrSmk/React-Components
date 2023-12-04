import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store from './store/store';

import './index.scss';
import { setCountries } from './store/reducers/countriesSlice';
import { COUNTRIES } from './constatns/countries';

store.dispatch(setCountries(COUNTRIES));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
