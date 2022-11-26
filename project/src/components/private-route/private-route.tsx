import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import Spinner from '../spinner/spinner';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  isLoading: boolean;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, isLoading, children} = props;

  if (isLoading) {
    return <Spinner isLoading />;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;
