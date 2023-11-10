import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PrimaryLayout from '../components/PrimaryLayout/PrimaryLayout';
import Person from '../components/cards/Person/Person';
import NotFound from '../pages/NotFound/NotFound';
import Planet from '../components/cards/Planet/Planet';
import Film from '../components/cards/Film/Film';
import Specie from '../components/cards/Specie/Specie';
import Vehicle from '../components/cards/Vehicle/Vehicle';
import Starship from '../components/cards/Starship/Starship';

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
            path: '/people/:id',
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
        path: '/planets/:id',
        element: <Planet />,
      },
      {
        path: '/films/:id',
        element: <Film />,
      },
      {
        path: '/species/:id',
        element: <Specie />,
      },
      {
        path: '/vehicles/:id',
        element: <Vehicle />,
      },
      {
        path: '/starships/:id',
        element: <Starship />,
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
