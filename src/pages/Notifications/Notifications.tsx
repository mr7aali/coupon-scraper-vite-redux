import { Clock, Send } from 'lucide-react';

const HISTORY_DATA = [
  {
    id: 1,
    title: 'Flash Sale: 50% OFF Nike',
    audience: 'All Users',
    datetime: '2024-03-01 10:00 AM',
    status: 'Sent',
  },
  {
    id: 2,
    title: 'Your Pro Plan is expiring',
    audience: 'Subscribers',
    datetime: '2024-03-02 09:00 AM',
    status: 'Scheduled',
  },
];

const Notifications = () => {
  return (
    <div className='bg-[#FAFAFA] min-h-full'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-[20.4px] font-bold text-[#111827] mb-2 font-sans'>Push Notifications</h1>
        <p className='text-[#6B7280] text-[15px]'>Send alerts, updates, and marketing messages to users.</p>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Left Side: Compose Message */}
        <div className='w-full lg:w-[380px] flex-shrink-0'>
          <div className='bg-white rounded-xl border border-[#F3F4F6] shadow-sm p-6'>
            <h2 className='text-[16px] font-bold text-[#111827] mb-6'>Compose Message</h2>
            
            <div className='space-y-5'>
              <div>
                <label className='block text-[13px] font-semibold text-[#4B5563] mb-2'>Title</label>
                <input 
                  type='text' 
                  placeholder='Notification Title' 
                  className='w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-1 focus:ring-[#00A1BF] focus:border-[#00A1BF] text-[#111827] text-sm outline-none transition-colors placeholder-[#9CA3AF]'
                />
              </div>

              <div>
                <label className='block text-[13px] font-semibold text-[#4B5563] mb-2'>Message</label>
                <textarea 
                  placeholder='Type your message here...' 
                  rows={4}
                  className='w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-1 focus:ring-[#00A1BF] focus:border-[#00A1BF] text-[#111827] text-sm outline-none resize-none transition-colors placeholder-[#9CA3AF]'
                />
              </div>

              <div>
                <label className='block text-[13px] font-semibold text-[#4B5563] mb-3'>Target Audience</label>
                <div className='space-y-3'>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input type='radio' name='audience' defaultChecked className='w-4 h-4 text-[#00A1BF] focus:ring-[#00A1BF] accent-[#00A1BF]' />
                    <span className='text-[14px] text-[#4B5563]'>All Users</span>
                  </label>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input type='radio' name='audience' className='w-4 h-4 text-[#00A1BF] focus:ring-[#00A1BF] accent-[#00A1BF]' />
                    <span className='text-[14px] text-[#4B5563]'>Subscribers Only</span>
                  </label>
                </div>
              </div>

              <div className='flex items-center gap-3 pt-4 border-t border-[#F3F4F6] mt-6'>
                <button className='flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-[#F9FAFB] text-[13px] font-medium rounded-lg transition-colors'>
                  <Clock className='w-4 h-4' />
                  Schedule
                </button>
                <button className='flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00A1BF] hover:bg-[#008ba5] text-white text-[13px] font-medium rounded-lg transition-colors'>
                  <Send className='w-4 h-4' />
                  Send Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: History & Scheduled */}
        <div className='flex-1'>
          <h2 className='text-[16px] font-bold text-[#111827] mb-6'>History & Scheduled</h2>
          
          <div className='bg-white rounded-xl border border-[#F3F4F6] shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-[#F9FAFB] border-b border-[#F3F4F6] text-left'>
                    <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>Notification Title</th>
                    <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>Target Audience</th>
                    <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>Date & Time</th>
                    <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>Status</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-[#F3F4F6]'>
                  {HISTORY_DATA.map((item) => (
                    <tr key={item.id} className='hover:bg-[#F9FAFB] transition-colors'>
                      <td className='px-6 py-5 text-[14px] font-medium text-[#111827]'>{item.title}</td>
                      <td className='px-6 py-5 text-[14px] text-[#6B7280]'>{item.audience}</td>
                      <td className='px-6 py-5 text-[14px] text-[#6B7280]'>{item.datetime}</td>
                      <td className='px-6 py-5'>
                        <span className='inline-flex items-center px-3 py-1 bg-[#F3F4F6] text-[#4B5563] rounded-full text-[12px] font-medium'>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
