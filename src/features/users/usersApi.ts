import { baseApi } from '../../app/baseApi';
import type { ApiEnvelope } from '../auth/authApi';

export interface AdminUserListItem {
  id: string;
  fullName: string;
  email: string;
  location: string | null;
  languageName: 'ENGLISH' | 'FRENCH' | 'ARABIC' | null;
  subscriptionPlan: string | null;
  subscriptionStatus: string | null;
  subscriptionActive: boolean;
  createdAt: string;
}

export interface AdminUsersResponse {
  items: AdminUserListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface GetAdminUsersParams {
  page: number;
  pageSize: number;
  search?: string;
  languageName?: string;
  subscriptionPlan?: string;
  subscriptionStatus?: string;
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUsers: builder.query<ApiEnvelope<AdminUsersResponse>, GetAdminUsersParams>({
      query: (params) => ({
        url: '/admin/users',
        params: {
          page: params.page,
          pageSize: params.pageSize,
          search: params.search || undefined,
          languageName: params.languageName || undefined,
          subscriptionPlan: params.subscriptionPlan || undefined,
          subscriptionStatus: params.subscriptionStatus || undefined,
        },
      }),
    }),
  }),
});

export const { useGetAdminUsersQuery } = usersApi;
