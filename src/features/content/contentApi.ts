import { baseApi } from '../../app/baseApi';
import type { ApiEnvelope } from '../auth/authApi';

export interface HeroSlideItem {
  id: number;
  title: string;
  imageUrl: string;
  buttonTitle: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface HeroSlidesResponse {
  items: HeroSlideItem[];
  total: number;
}

interface FaqsResponse {
  items: FaqItem[];
  total: number;
}

interface SaveHeroSlidePayload {
  title: string;
  buttonTitle: string;
  file: File;
  displayOrder?: number;
  isActive?: boolean;
}

interface UpdateHeroSlidePayload {
  title?: string;
  imageUrl?: string;
  buttonTitle?: string;
  displayOrder?: number;
  isActive?: boolean;
}

interface SaveFaqPayload {
  question: string;
  answer: string;
  displayOrder?: number;
  isActive?: boolean;
}

export const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHeroSlides: builder.query<ApiEnvelope<HeroSlidesResponse>, void>({
      query: () => '/admin/mobile-dashboard/hero-slides',
      providesTags: ['AdminAuth'],
    }),
    createHeroSlide: builder.mutation<ApiEnvelope<HeroSlideItem>, SaveHeroSlidePayload>({
      query: ({ file, title, buttonTitle, displayOrder, isActive }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('buttonTitle', buttonTitle);
        if (displayOrder !== undefined) {
          formData.append('displayOrder', String(displayOrder));
        }
        if (isActive !== undefined) {
          formData.append('isActive', String(isActive));
        }

        return {
        url: '/admin/mobile-dashboard/hero-slides',
        method: 'POST',
        body: formData,
      };
      },
    }),
    updateHeroSlide: builder.mutation<ApiEnvelope<HeroSlideItem>, { id: number; body: UpdateHeroSlidePayload }>({
      query: ({ id, body }) => ({
        url: `/admin/mobile-dashboard/hero-slides/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteHeroSlide: builder.mutation<ApiEnvelope<{ id: number; deleted: boolean }>, number>({
      query: (id) => ({
        url: `/admin/mobile-dashboard/hero-slides/${id}`,
        method: 'DELETE',
      }),
    }),
    getFaqs: builder.query<ApiEnvelope<FaqsResponse>, void>({
      query: () => '/admin/mobile-dashboard/faqs',
      providesTags: ['AdminAuth'],
    }),
    createFaq: builder.mutation<ApiEnvelope<FaqItem>, SaveFaqPayload>({
      query: (body) => ({
        url: '/admin/mobile-dashboard/faqs',
        method: 'POST',
        body,
      }),
    }),
    updateFaq: builder.mutation<ApiEnvelope<FaqItem>, { id: number; body: Partial<SaveFaqPayload> }>({
      query: ({ id, body }) => ({
        url: `/admin/mobile-dashboard/faqs/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteFaq: builder.mutation<ApiEnvelope<{ id: number; deleted: boolean }>, number>({
      query: (id) => ({
        url: `/admin/mobile-dashboard/faqs/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateFaqMutation,
  useCreateHeroSlideMutation,
  useDeleteFaqMutation,
  useDeleteHeroSlideMutation,
  useGetFaqsQuery,
  useGetHeroSlidesQuery,
  useUpdateFaqMutation,
  useUpdateHeroSlideMutation,
} = contentApi;
