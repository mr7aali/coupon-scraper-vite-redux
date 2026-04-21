import { Check } from 'lucide-react';

const REPORTS_DATA = [
  {
    id: 'REP-001',
    reportedBy: 'John Doe',
    dealStore: 'Nike 20% OFF',
    issueType: 'Code Expired',
    date: '2024-03-02',
    status: 'Pending',
  },
  {
    id: 'REP-002',
    reportedBy: 'Alice Smith',
    dealStore: 'Amazon $50 OFF',
    issueType: 'Fake Deal',
    date: '2024-03-01',
    status: 'Resolved',
  },
];

const Reports = () => {
  return (
    <div className='bg-[#FAFAFA] min-h-full'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-[20.4px] font-bold text-[#111827] mb-2 font-sans'>User Reports & Abuse</h1>
        <p className='text-[#6B7280] text-[15px]'>Review user-reported issues regarding fake deals or expired codes.</p>
      </div>

      {/* Table Container */}
      <div className='bg-white rounded-xl border border-[#F3F4F6] shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-[#F9FAFB] border-b border-[#F3F4F6] text-left'>
                <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563 ]'>Report ID</th>
                <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>Reported By</th>
                <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>Deal / Store</th>
                <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>Issue Type</th>
                <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>Date</th>
                <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>Status</th>
                <th className='px-6 py-4 text-[13px] font-bold text-[#4B5563]'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-[#F3F4F6]'>
              {REPORTS_DATA.map((report) => (
                <tr key={report.id} className='hover:bg-[#F9FAFB] transition-colors'>
                  <td className='px-6 py-5 text-[13px] text-[#6B7280] font-mono'>{report.id}</td>
                  <td className='px-6 py-5 text-[14px] font-medium text-[#111827]'>{report.reportedBy}</td>
                  <td className='px-6 py-5 text-[14px] font-medium text-[#00A1BF]  cursor-pointer'>{report.dealStore}</td>
                  <td className='px-6 py-5 text-[14px] text-[#6B7280]'>{report.issueType}</td>
                  <td className='px-6 py-5 text-[14px] text-[#6B7280]'>{report.date}</td>
                  <td className='px-6 py-5'>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium ${report.status === 'Pending'
                      ? 'bg-[#FEF9C3] text-[#A16207]'
                      : 'bg-[#F0FDF4] text-[#15803D]'
                      }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className='px-6 py-5'>
                    {report.status === 'Pending' ? (
                      <div className='flex items-center gap-2'>
                        <button className='flex items-center gap-1.5 px-3 py-1.5 bg-[#F0FDF4] hover:bg-[#D1F6E2] text-[#15803D] text-[13px] font-medium rounded-md transition-colors'>
                          <Check className='w-4 h-4' />
                          Resolve
                        </button>
                        <button className='px-3 py-1.5 bg-[#FEF2F2] hover:bg-[#FFE4E6] text-[#B91C1C] text-[13px] font-medium rounded-md transition-colors'>
                          Remove Deal
                        </button>
                      </div>
                    ) : (
                      <span className='text-[13px] text-[#9CA3AF]'>No action needed</span>
                    )}
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

export default Reports;
