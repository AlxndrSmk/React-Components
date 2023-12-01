import { RouterProvider } from 'react-router';
import './App.css';
import router from './routes/router';

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
};

export default App;
