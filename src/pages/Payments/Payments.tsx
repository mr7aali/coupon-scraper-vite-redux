import { ExternalLink } from 'lucide-react';

const PAYMENTS_DATA = [
  {
    id: 'pi_3MtwBwLkdIwMg',
    user: 'Emma Thompson',
    amount: '$99.00',
    paymentMethod: 'Visa •••• 4242',
    date: '2024-03-01',
    status: 'Success',
  },
  {
    id: 'pi_4NuxCwLkdIwMg',
    user: 'Michael Chen',
    amount: '$9.99',
    paymentMethod: 'Mastercard •••• 5555',
    date: '2024-03-02',
    status: 'Success',
  },
  {
    id: 'pi_5OvyDwLkdIwMg',
    user: 'Sophie Martin',
    amount: '$9.99',
    paymentMethod: 'Amex •••• 1234',
    date: '2024-03-02',
    status: 'Failed',
  },
];

const Payments = () => {
  return (
    <div className='bg-[#FAFAFA] min-h-full'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-[20.4px] font-bold text-[#111827] mb-2 font-sans'>Payments & Invoices</h1>
        <p className='text-[#6B7280] text-[15px]'>Track subscription payments via Stripe integration.</p>
      </div>

      {/* Table Container */}
      <div className='bg-white rounded-xl border border-[#F3F4F6] shadow-sm overflow-hidden'>
        {/* Search */}
        <div className='p-6 border-b border-[#F3F4F6]'>
          <input
            type='text'
            placeholder='Search by Payment ID...'
            className='w-full max-w-md px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-1 focus:ring-[#00A1BF] focus:border-[#00A1BF] text-[#111827] text-sm outline-none transition-colors placeholder-[#9CA3AF]'
          />
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-[#F9FAFB] border-b border-[#F3F4F6] text-left'>
                <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>Payment ID</th>
                <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>User</th>
                <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>Amount</th>
                <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>Payment Method</th>
                <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>Date</th>
                <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>Status</th>
                <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>Stripe</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-[#F3F4F6]'>
              {PAYMENTS_DATA.map((payment) => (
                <tr key={payment.id} className='hover:bg-[#F9FAFB] transition-colors'>
                  <td className='px-6 py-5 text-[13px] text-[#6B7280] font-mono'>{payment.id}</td>
                  <td className='px-6 py-5 text-[14px] font-medium text-[#111827]'>{payment.user}</td>
                  <td className='px-6 py-5 text-[14px] font-medium text-[#111827]'>{payment.amount}</td>
                  <td className='px-6 py-5 text-[14px] text-[#6B7280]'>{payment.paymentMethod}</td>
                  <td className='px-6 py-5 text-[14px] text-[#6B7280]'>{payment.date}</td>
                  <td className='px-6 py-5'>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium ${payment.status === 'Success'
                        ? 'bg-[#F0FDF4] text-[#15803D]'
                        : 'bg-[#F3F4F6] text-[#4B5563]'
                      }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className='px-6 py-5'>
                    <button className='flex items-center gap-1 text-[#00A1BF] hover:text-[#008ba5] font-medium text-[13px] transition-colors'>
                      View
                      <ExternalLink className='w-3.5 h-3.5' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
