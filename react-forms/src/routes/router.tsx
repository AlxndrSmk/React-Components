import { createBrowserRouter } from 'react-router-dom';
import Main from '../pages/Main/Main';
import ReactHookForm from '../pages/ReactHookForm/ReactHookForm';
import UncontrolledForm from '../pages/UncontrolledForm/UncontrolledForm';

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
