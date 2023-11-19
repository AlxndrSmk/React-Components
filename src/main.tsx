import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { setupStore } from './store/store';
import router from './routes/router';

import './index.scss';
import { ListDataProvider } from './context/ListDataProvider';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ListDataProvider>
      <RouterProvider router={router} />
    </ListDataProvider>
  </Provider>
);
