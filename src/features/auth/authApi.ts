import { baseApi } from '../../app/baseApi';
import type { AdminUser, AuthToken } from './authSlice';

interface ApiError {
  field?: string | null;
  message: string;
}

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  errors: ApiError[] | null;
}

interface AdminLoginRequest {
  email: string;
  password: string;
}

interface AdminLoginResponse {
  token: AuthToken;
  admin: AdminUser;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation<ApiEnvelope<AdminLoginResponse>, AdminLoginRequest>({
      query: (body) => ({
        url: '/admin/auth/login',
        method: 'POST',
        body,
      }),
    }),
    getAdminMe: builder.query<ApiEnvelope<AdminUser>, void>({
      query: () => '/admin/auth/me',
      providesTags: ['AdminAuth'],
    }),
  }),
});

export const {
  useGetAdminMeQuery,
  useLoginAdminMutation,
} = authApi;

export type { ApiEnvelope };
