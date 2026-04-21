import { baseApi } from '../../app/baseApi';
import type { ApiEnvelope } from '../auth/authApi';

export interface AdminPaymentListItem {
  id: string;
  user: string;
  amount: string;
  paymentMethod: string;
  date: string | null;
  status: string;
  stripeUrl: string | null;
}

export interface AdminPaymentsResponse {
  items: AdminPaymentListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface GetAdminPaymentsParams {
  page: number;
  pageSize: number;
  search?: string;
  status?: string;
}

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminPayments: builder.query<ApiEnvelope<AdminPaymentsResponse>, GetAdminPaymentsParams>({
      query: (params) => ({
        url: '/admin/payments',
        params: {
          page: params.page,
          pageSize: params.pageSize,
          search: params.search || undefined,
          status: params.status || undefined,
        },
      }),
    }),
  }),
});

export const { useGetAdminPaymentsQuery } = paymentsApi;
