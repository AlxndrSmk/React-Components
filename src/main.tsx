import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.scss';
import router from './routes/router';
import { ListDataProvider } from './context/ListDataProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.Fragment>
    <ListDataProvider>
      <RouterProvider router={router} />
    </ListDataProvider>
  </React.Fragment>
);
