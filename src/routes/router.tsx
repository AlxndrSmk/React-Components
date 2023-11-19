import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PrimaryLayout from '../components/PrimaryLayout/PrimaryLayout';
import Person from '../components/cards/Person/Person';
import NotFound from '../pages/NotFound/NotFound';

export const routerConfig: RouteObject[] = [
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
        children: [
          {
            path: ':id',
            element: <Person />,
          },
        ],
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
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
