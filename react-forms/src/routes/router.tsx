import { createBrowserRouter } from 'react-router-dom';
import Main from '../pages/Main';
import UncontrolledForm from '../pages/UncontrolledForm';
import ReactHookForm from '../pages/ReactHookForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: 'uncontrolled-form',
    element: <UncontrolledForm />,
  },
  {
    path: 'react-hook-form',
    element: <ReactHookForm />,
  },
]);

export default router;
