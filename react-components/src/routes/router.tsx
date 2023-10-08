import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PrimaryLayout from '../components/PrimaryLayout/PrimaryLayout';
import Item from '../components/Item/Item';
import NotFound from '../pages/NotFound/NotFound';

const router = createBrowserRouter([
  {
    element: <PrimaryLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/item/:id',
        element: <Item />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
