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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#d8f5fb_0%,#eff7ff_38%,#fbfdff_100%)] px-4 py-10 text-[#111827]">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-white/80 shadow-[0_32px_120px_rgba(15,23,42,0.14)] backdrop-blur">
        <section className="hidden w-1/2 flex-col justify-between bg-[linear-gradient(160deg,#0f766e_0%,#0891b2_45%,#1d4ed8_100%)] p-10 text-white lg:flex">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              Coupon Admin
            </p>
            <h1 className="max-w-md text-4xl font-semibold leading-tight">
              Manage deals, content, and app operations from one secure dashboard.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/78">
              This admin area is backed by FastAPI auth, protected routes, and persisted Redux state with RTK Query.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">Security</p>
              <p className="mt-2 text-lg font-semibold">Dedicated admin authentication</p>
              <p className="mt-2 text-sm text-white/75">Separate admin login and protected admin APIs keep dashboard access isolated from app users.</p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">State</p>
              <p className="mt-2 text-lg font-semibold">Redux Toolkit with RTK Query</p>
              <p className="mt-2 text-sm text-white/75">Token persistence, session restore, and API calls are centralized in one predictable store.</p>
            </div>
          </div>
        </section>

        <section className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2 lg:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0891b2]">Admin Login</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0f172a]">Sign in to the dashboard</h2>
              <p className="mt-3 text-sm leading-6 text-[#64748b]">
                Use the seeded admin account from the backend to access the dashboard.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#334155]">Admin email</span>
                <div className="flex items-center gap-3 rounded-2xl border border-[#dbe4ee] bg-[#f8fbfd] px-4 py-3 transition focus-within:border-[#0891b2] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(8,145,178,0.08)]">
                  <Mail className="h-4 w-4 text-[#64748b]" />
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                    placeholder="admin@coupon.local"
                    className="w-full border-none bg-transparent text-sm text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
                    autoComplete="email"
                    required
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#334155]">Password</span>
                <div className="flex items-center gap-3 rounded-2xl border border-[#dbe4ee] bg-[#f8fbfd] px-4 py-3 transition focus-within:border-[#0891b2] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(8,145,178,0.08)]">
                  <LockKeyhole className="h-4 w-4 text-[#64748b]" />
                  <input
                    type="password"
                    value={formState.password}
                    onChange={(event) => handleChange('password', event.target.value)}
                    placeholder="Enter your password"
                    className="w-full border-none bg-transparent text-sm text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </label>

              {errorMessage ? (
                <div className="flex items-start gap-3 rounded-2xl border border-[#fecaca] bg-[#fff1f2] px-4 py-3 text-sm text-[#b91c1c]">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              ) : null}

              <Button
                type="submit"
                size="full"
                isLoading={isLoading}
                className="h-12 rounded-2xl text-sm font-semibold"
              >
                Sign in
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminLoginPage;
