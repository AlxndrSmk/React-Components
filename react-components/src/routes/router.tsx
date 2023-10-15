import { Navigate, createBrowserRouter } from 'react-router-dom';

import App from '../App';
import PrimaryLayout from '../components/PrimaryLayout/PrimaryLayout';
import Person from '../components/Person/Person';
import NotFound from '../pages/NotFound/NotFound';
import Planet from '../components/Planet/Planet';

const router = createBrowserRouter([
  {
    element: <PrimaryLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/people" replace />,
      },
      {
        path: '/people',
        element: <App />,
      },
      {
        path: '/planets',
        element: <App />,
      },
      {
        path: '/films',
        element: <App />,
      },
      {
        path: '/species',
        element: <App />,
      },
      {
        path: '/vehicles',
        element: <App />,
      },
      {
        path: '/starships',
        element: <App />,
      },
      {
        path: '/people/:id',
        element: <Person />,
      },
      {
        path: '/planets/:id',
        element: <Planet />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
