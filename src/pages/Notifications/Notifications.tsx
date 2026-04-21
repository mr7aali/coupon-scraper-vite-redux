import { Clock, Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  useCreateAdminNotificationMutation,
  useGetAdminNotificationsQuery,
} from '../../features/notifications/notificationsApi';

const Notifications = () => {
  const [formState, setFormState] = useState({
    title: '',
    body: '',
    targetAudience: 'all_users' as 'all_users' | 'subscribers',
    scheduledFor: '',
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackTone, setFeedbackTone] = useState<'success' | 'error'>('success');

  const { data, isLoading, isFetching, refetch } = useGetAdminNotificationsQuery();
  const [createNotification, { isLoading: isSubmitting }] = useCreateAdminNotificationMutation();
  const campaigns = data?.data.items ?? [];

  const sortedCampaigns = useMemo(
    () =>
      [...campaigns].sort((a, b) => {
        const left = a.sentAt || a.scheduledFor || a.createdAt;
        const right = b.sentAt || b.scheduledFor || b.createdAt;
        return new Date(right).getTime() - new Date(left).getTime();
      }),
    [campaigns],
  );

  const setField = (field: keyof typeof formState, value: string) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const submitCampaign = async (sendMode: 'now' | 'schedule') => {
    setFeedbackMessage('');

    try {
      const payload = {
        title: formState.title,
        body: formState.body,
        targetAudience: formState.targetAudience,
        sendMode,
        scheduledFor: sendMode === 'schedule' ? toIsoString(formState.scheduledFor) : undefined,
      };

      await createNotification(payload).unwrap();
      setFeedbackTone('success');
      setFeedbackMessage(sendMode === 'now' ? 'Notification sent successfully.' : 'Notification scheduled successfully.');
      setFormState({
        title: '',
        body: '',
        targetAudience: 'all_users',
        scheduledFor: '',
      });
      refetch();
    } catch (error) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof error.data === 'object' &&
        error.data !== null &&
        'message' in error.data
          ? String(error.data.message)
          : 'Unable to process notification.';
      setFeedbackTone('error');
      setFeedbackMessage(message);
    }
  };

  return (
    <div className="min-h-full bg-[#FAFAFA]">
      <div className="mb-8">
        <h1 className="mb-2 font-sans text-[20.4px] font-bold text-[#111827]">Push Notifications</h1>
        <p className="text-[15px] text-[#6B7280]">Send alerts, updates, and marketing messages to users.</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full flex-shrink-0 lg:w-[380px]">
          <div className="rounded-xl border border-[#F3F4F6] bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-[16px] font-bold text-[#111827]">Compose Message</h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-[13px] font-semibold text-[#4B5563]">Title</label>
                <input
                  type="text"
                  value={formState.title}
                  onChange={(event) => setField('title', event.target.value)}
                  placeholder="Notification Title"
                  className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-sm text-[#111827] outline-none transition-colors placeholder-[#9CA3AF] focus:border-[#00A1BF] focus:ring-1 focus:ring-[#00A1BF]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-[#4B5563]">Message</label>
                <textarea
                  value={formState.body}
                  onChange={(event) => setField('body', event.target.value)}
                  placeholder="Type your message here..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-sm text-[#111827] outline-none transition-colors placeholder-[#9CA3AF] focus:border-[#00A1BF] focus:ring-1 focus:ring-[#00A1BF]"
                />
              </div>

              <div>
                <label className="mb-3 block text-[13px] font-semibold text-[#4B5563]">Target Audience</label>
                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="audience"
                      checked={formState.targetAudience === 'all_users'}
                      onChange={() => setField('targetAudience', 'all_users')}
                      className="h-4 w-4 accent-[#00A1BF]"
                    />
                    <span className="text-[14px] text-[#4B5563]">All Users</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="audience"
                      checked={formState.targetAudience === 'subscribers'}
                      onChange={() => setField('targetAudience', 'subscribers')}
                      className="h-4 w-4 accent-[#00A1BF]"
                    />
                    <span className="text-[14px] text-[#4B5563]">Subscribers Only</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-[#4B5563]">Schedule Time</label>
                <input
                  type="datetime-local"
                  value={formState.scheduledFor}
                  onChange={(event) => setField('scheduledFor', event.target.value)}
                  className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-sm text-[#111827] outline-none transition-colors focus:border-[#00A1BF] focus:ring-1 focus:ring-[#00A1BF]"
                />
              </div>

              {feedbackMessage ? (
                <div className={`rounded-lg px-3 py-2 text-sm ${
                  feedbackTone === 'success'
                    ? 'bg-[#F0FDF4] text-[#15803D]'
                    : 'bg-[#FEF2F2] text-[#B91C1C]'
                }`}>
                  {feedbackMessage}
                </div>
              ) : null}

              <div className="mt-6 flex items-center gap-3 border-t border-[#F3F4F6] pt-4">
                <button
                  type="button"
                  onClick={() => submitCampaign('schedule')}
                  disabled={isSubmitting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2.5 text-[13px] font-medium text-[#4B5563] transition-colors hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Clock className="h-4 w-4" />
                  Schedule
                </button>
                <button
                  type="button"
                  onClick={() => submitCampaign('now')}
                  disabled={isSubmitting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#00A1BF] px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#008ba5] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  Send Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-[16px] font-bold text-[#111827]">History & Scheduled</h2>
            {isFetching && !isLoading ? (
              <span className="text-xs text-[#9CA3AF]">Refreshing...</span>
            ) : null}
          </div>

          <div className="overflow-hidden rounded-xl border border-[#F3F4F6] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#F3F4F6] bg-[#F9FAFB] text-left">
                    <th className="px-6 py-4 text-[13px] font-bold text-[#4B5563]">Notification Title</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#4B5563]">Target Audience</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#4B5563]">Date & Time</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#4B5563]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-14 text-center text-sm text-[#6B7280]">
                        Loading notifications...
                      </td>
                    </tr>
                  ) : sortedCampaigns.map((item) => (
                    <tr key={item.id} className="transition-colors hover:bg-[#F9FAFB]">
                      <td className="px-6 py-5 text-[14px] font-medium text-[#111827]">{item.title}</td>
                      <td className="px-6 py-5 text-[14px] text-[#6B7280]">{item.targetAudience}</td>
                      <td className="px-6 py-5 text-[14px] text-[#6B7280]">
                        {formatDateTime(item.sentAt || item.scheduledFor || item.createdAt)}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[12px] font-medium ${
                          item.status === 'Sent'
                            ? 'bg-[#F0FDF4] text-[#15803D]'
                            : 'bg-[#F3F4F6] text-[#4B5563]'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!isLoading && sortedCampaigns.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-[#6B7280]">
                No notification campaigns yet.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const toIsoString = (value: string) => {
  if (!value) {
    return undefined;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

const formatDateTime = (value: string | null) => {
  if (!value) {
    return 'N/A';
  }
  return new Date(value).toLocaleString();
};

export default Notifications;
