import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthBootstrap from './AuthBootstrap';
import { useAppSelector } from '../hooks';

const RequireAuth = () => {
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.token);

  if (!token?.accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <AuthBootstrap>
      <Outlet />
    </AuthBootstrap>
  );
};

export default RequireAuth;
