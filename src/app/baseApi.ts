import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../features/auth/authSlice';
import type { RootState } from './store';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const baseUrl = rawBaseUrl && rawBaseUrl.length > 0
  ? rawBaseUrl
  : 'http://127.0.0.1:8000/api';

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token?.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);
    if (result.error?.status === 401 || result.error?.status === 403) {
      api.dispatch(logout());
    }
    return result;
  },
  endpoints: () => ({}),
  tagTypes: ['AdminAuth'],
});
