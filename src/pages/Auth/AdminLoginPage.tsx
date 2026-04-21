import { AlertCircle, LockKeyhole, Mail } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button';
import { useLoginAdminMutation } from '../../features/auth/authApi';
import { setCredentials } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../hooks';

const AdminLoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const [errorMessage, setErrorMessage] = useState('');
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const redirectTo = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/';

  const handleChange = (field: 'email' | 'password', value: string) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      const response = await loginAdmin({
        email: formState.email,
        password: formState.password,
      }).unwrap();

      dispatch(
        setCredentials({
          admin: response.data.admin,
          token: response.data.token,
        }),
      );
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const fallbackMessage = 'Login failed. Please check your admin credentials.';
      if (typeof error === 'object' && error !== null && 'data' in error) {
        const apiError = error as {
          data?: {
            message?: string;
          };
        };
        setErrorMessage(apiError.data?.message || fallbackMessage);
        return;
      }
      setErrorMessage(fallbackMessage);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] px-4 py-8">
      <div className="w-full max-w-md rounded-2xl border border-[#F3F4F6] bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#00A1BF]">Admin Login</p>
          <h2 className="mt-2 text-2xl font-bold text-[#111827]">Sign in</h2>
          <p className="mt-2 text-sm text-[#6B7280]">
            Enter your admin credentials to continue.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#374151]">Email</span>
                <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 transition focus-within:border-[#00A1BF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00A1BF]/10">
                  <Mail className="h-4 w-4 text-[#9CA3AF]" />
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                    placeholder="admin@coupon.local"
                    className="w-full border-none bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                    autoComplete="email"
                    required
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#374151]">Password</span>
                <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 transition focus-within:border-[#00A1BF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00A1BF]/10">
                  <LockKeyhole className="h-4 w-4 text-[#9CA3AF]" />
                  <input
                    type="password"
                    value={formState.password}
                    onChange={(event) => handleChange('password', event.target.value)}
                    placeholder="Enter your password"
                    className="w-full border-none bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </label>

              {errorMessage ? (
                <div className="flex items-start gap-3 rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#B91C1C]">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              ) : null}

              <Button
                type="submit"
                size="full"
                isLoading={isLoading}
                className="h-11 rounded-xl text-sm font-semibold"
              >
                Sign in
              </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
