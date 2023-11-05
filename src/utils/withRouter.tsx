import { ComponentType } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { OmitRouter, RouterProps } from '../types/types';

const withRouter =
  <T,>(WrappedComponent: ComponentType<OmitRouter<T> & RouterProps>) =>
  (props: OmitRouter<T>) => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    return <WrappedComponent {...props} params={params} location={location} navigate={navigate} />;
  };

export default withRouter;
