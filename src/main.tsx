import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { store } from './store/store';
import './index.scss';
import router from './routes/router';
import { ListDataProvider } from './context/ListDataProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.Fragment>
      <ListDataProvider>
        <RouterProvider router={router} />
      </ListDataProvider>
    </React.Fragment>
  </Provider>
);
