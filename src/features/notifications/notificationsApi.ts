import { baseApi } from '../../app/baseApi';
import type { ApiEnvelope } from '../auth/authApi';

export interface AdminNotificationCampaignItem {
  id: number;
  title: string;
  targetAudience: string;
  scheduledFor: string | null;
  sentAt: string | null;
  status: string;
  sentCount: number;
  createdAt: string;
}

interface AdminNotificationsListResponse {
  items: AdminNotificationCampaignItem[];
  total: number;
}

interface CreateAdminNotificationRequest {
  title: string;
  body: string;
  targetAudience: 'all_users' | 'subscribers';
  sendMode: 'now' | 'schedule';
  scheduledFor?: string;
}

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminNotifications: builder.query<ApiEnvelope<AdminNotificationsListResponse>, void>({
      query: () => '/admin/notifications',
      providesTags: ['AdminAuth'],
    }),
    createAdminNotification: builder.mutation<
      ApiEnvelope<AdminNotificationCampaignItem>,
      CreateAdminNotificationRequest
    >({
      query: (body) => ({
        url: '/admin/notifications',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useCreateAdminNotificationMutation,
  useGetAdminNotificationsQuery,
} = notificationsApi;
