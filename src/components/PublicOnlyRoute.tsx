import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const PublicOnlyRoute = () => {
  const token = useAppSelector((state) => state.auth.token);

  if (token?.accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
