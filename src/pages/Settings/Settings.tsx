import { Save } from 'lucide-react';

const Settings = () => {
  return (
    <div className='bg-[#FAFAFA] min-h-full'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-[20.4px] font-bold text-[#111827] mb-2 font-sans'>Platform Settings</h1>
          <p className='text-[#6B7280] text-[15px]'>Configure core platform rules, pricing, and integrations.</p>
        </div>
        <button className='flex items-center gap-2 bg-[#00A1BF] hover:bg-[#008ba5] text-white px-5 py-2.5 rounded-lg font-medium transition-colors'>
          <Save className='w-5 h-5' />
          Save Changes
        </button>
      </div>

      <div className='space-y-6'>
        {/* Subscription Pricing */}
        <div className='bg-white rounded-xl border border-[#F3F4F6] shadow-sm p-6'>
          <h2 className='text-[16px] font-semibold text-[#111827] mb-4 pb-4 border-b border-[#F3F4F6]'>Subscription Pricing</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-[13px] font-semibold text-[#4B5563] mb-2'>Pro Monthly Price ($)</label>
              <input
                type='text'
                defaultValue='9.99'
                className='w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-1 focus:ring-[#00A1BF] focus:border-[#00A1BF] text-[#111827] text-sm outline-none transition-colors'
              />
            </div>
            <div>
              <label className='block text-[13px] font-semibold text-[#4B5563] mb-2'>Pro Annual Price ($)</label>
              <input
                type='text'
                defaultValue='99'
                className='w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-1 focus:ring-[#00A1BF] focus:border-[#00A1BF] text-[#111827] text-sm outline-none transition-colors'
              />
            </div>
          </div>
        </div>

        {/* Cashback & Referrals */}
        <div className='bg-white rounded-xl border border-[#F3F4F6] shadow-sm p-6'>
          <h2 className='text-[16px] font-semibold text-[#111827] mb-4 pb-4 border-b border-[#F3F4F6]'>Cashback & Referrals</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-[13px] font-semibold text-[#4B5563] mb-2'>Referral Reward ($)</label>
              <input
                type='text'
                defaultValue='10'
                className='w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-1 focus:ring-[#00A1BF] focus:border-[#00A1BF] text-[#111827] text-sm outline-none transition-colors'
              />
            </div>
            <div>
              <label className='block text-[13px] font-semibold text-[#4B5563] mb-2'>Minimum Payout Threshold ($)</label>
              <input
                type='text'
                defaultValue='25'
                className='w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-1 focus:ring-[#00A1BF] focus:border-[#00A1BF] text-[#111827] text-sm outline-none transition-colors'
              />
            </div>
          </div>
        </div>

        {/* Payment Gateway (Stripe) */}
        <div className='bg-white rounded-xl border border-[#F3F4F6] shadow-sm p-6'>
          <h2 className='text-[16px] font-semibold text-[#111827] mb-4 pb-4 border-b border-[#F3F4F6]'>Payment Gateway (Stripe)</h2>
          <div className='space-y-6'>
            <div>
              <label className='block text-[13px] font-semibold text-[#4B5563] mb-2'>Publishable Key</label>
              <input
                type='text'
                defaultValue='pk_live_51Nx...'
                className='w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-1 focus:ring-[#00A1BF] focus:border-[#00A1BF] text-[#111827] text-sm outline-none transition-colors'
              />
            </div>
            <div>
              <label className='block text-[13px] font-semibold text-[#4B5563] mb-2'>Secret Key</label>
              <input
                type='password'
                defaultValue='sk_live_51Nx...'
                className='w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-1 focus:ring-[#00A1BF] focus:border-[#00A1BF] text-[#111827] text-sm outline-none transition-colors'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
