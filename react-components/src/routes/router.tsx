import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import PrimaryLayout from '../components/PrimaryLayout/PrimaryLayout';

const router = createBrowserRouter([
  {
    element: <PrimaryLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
    ],
  },
]);

export default router;
