import { useEffect, type ReactNode } from 'react';
import { logout, setAdmin } from '../features/auth/authSlice';
import { useGetAdminMeQuery } from '../features/auth/authApi';
import { useAppDispatch, useAppSelector } from '../hooks';

interface AuthBootstrapProps {
  children: ReactNode;
}

const AuthBootstrap = ({ children }: AuthBootstrapProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const admin = useAppSelector((state) => state.auth.admin);
  const { data, isLoading, isFetching, isError } = useGetAdminMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setAdmin(data.data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (token && isError) {
      dispatch(logout());
    }
  }, [dispatch, isError, token]);

  if (token && !admin && (isLoading || isFetching)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#f4fbfd_0%,#eef4ff_100%)] px-6">
        <div className="rounded-3xl border border-white/80 bg-white/90 px-6 py-5 text-sm font-medium text-[#1f2937] shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          Restoring admin session...
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthBootstrap;
