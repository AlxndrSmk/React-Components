import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { WithRouterProps } from '../types/types';

const withRouter = (WrappedComponent) => (props: WithRouterProps) => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return <WrappedComponent {...props} params={params} location={location} navigate={navigate} />;
};

export default withRouter;
