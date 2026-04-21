import React, { useState } from 'react';
import { Plus, Shield, X, Mail, ChevronDown } from 'lucide-react';

const ROLES = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full access to all platform features and settings.',
    membersCount: 2,
  },
  {
    id: 2,
    name: 'Manager',
    description: 'Can manage users, deals, and view reports. Cannot change settings.',
    membersCount: 5,
  },
  {
    id: 3,
    name: 'Deal Manager',
    description: 'Can only add, edit, and manage deals and stores.',
    membersCount: 8,
  },
  {
    id: 4,
    name: 'Support Agent',
    description: 'Can view users, resolve reports, and manage cashback.',
    membersCount: 12,
  },
];

const AdminRoles = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <div className=' bg-[#FAFAFA] min-h-full'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-[20.4px] font-bold text-[#111827] mb-2 font-sans'>Admin Roles & Permissions</h1>
          <p className='text-[#6B7280] text-[15px]'>Manage team access levels and platform permissions.</p>
        </div>
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className='flex items-center gap-2 bg-[#00A1BF] hover:bg-[#008ba5] text-white px-5 py-2.5 rounded-lg font-medium transition-colors'
        >
          <Plus className='w-5 h-5' />
          Invite Member
        </button>
      </div>

      {/* Roles List */}
      <div className='bg-white rounded-xl border border-[#F3F4F6] shadow-sm'>
        {ROLES.map((role, index) => (
          <div
            key={role.id}
            className={`flex items-center justify-between p-6 ${index !== ROLES.length - 1 ? 'border-b border-[#F3F4F6]' : ''
              }`}
          >
            <div className='flex items-center gap-6'>
              {/* Icon Container */}
              <div className='w-12 h-12 flex items-center justify-center bg-[#E0F7FA] text-[#00A1BF] rounded-xl flex-shrink-0'>
                <Shield className='w-6 h-6' strokeWidth={2} />
              </div>

              {/* Role Info */}
              <div>
                <h3 className='text-[15px] font-semibold text-[#111827] mb-1'>{role.name}</h3>
                <p className='text-[#6B7280] text-[13px]'>{role.description}</p>
              </div>
            </div>

            {/* Actions */}
            <div className='flex flex-col items-end gap-2 text-sm'>
              <span className='font-semibold text-[#4B5563]'>{role.membersCount} Members</span>
              <button className='text-[#00A1BF] hover:text-[#008ba5] font-medium  text-[12px]transition-colors'>
                Edit Permissions
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Member Modal */}
      {isInviteModalOpen && (
        <div 
          onClick={() => setIsInviteModalOpen(false)}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className='bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden'
          >
            {/* Modal Header */}
            <div className='flex items-center justify-between p-6 border-b border-[#F3F4F6]'>
              <h2 className='text-xl font-bold text-[#111827]'>Invite Team Member</h2>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className='text-[#9CA3AF] hover:text-[#4B5563] transition-colors rounded-full p-1 hover:bg-[#F3F4F6]'
              >
                <X className='w-5 h-5' />
              </button>
            </div>

            {/* Modal Body */}
            <div className='p-6 space-y-5'>
              <div>
                <label className='block text-sm font-semibold text-[#374151] mb-2'>
                  Email Address
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Mail className='h-5 w-5 text-[#9CA3AF]' />
                  </div>
                  <input
                    type='email'
                    className='block w-full pl-10 pr-3 py-2.5 border border-[#D1D5DB] rounded-lg focus:ring-[#00A1BF] focus:border-[#00A1BF] sm:text-sm outline-none transition-colors placeholder-[#9CA3AF]'
                    placeholder='team@example.com'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-semibold text-[#374151] mb-2'>
                  Assign Role
                </label>
                <div className='relative'>
                  <select className='block w-full pl-3 pr-10 py-2.5 border border-[#D1D5DB] rounded-lg focus:ring-[#00A1BF] focus:border-[#00A1BF] sm:text-sm outline-none appearance-none transition-colors bg-white text-[#111827]'>
                    {ROLES.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                  <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
                    <ChevronDown className='h-4 w-4 text-[#9CA3AF]' />
                  </div>
                </div>
                <p className='mt-2 text-xs text-[#6B7280]'>
                  You can change the role anytime from the members list.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className='flex items-center justify-end gap-3 p-6 border-t border-[#F3F4F6] bg-[#FAFAFA]'>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className='px-4 py-2 text-sm font-medium text-[#4B5563] bg-white border border-[#D1D5DB] rounded-lg hover:bg-[#F9FAFB] transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className='px-4 py-2 text-sm font-medium text-white bg-[#00A1BF] border border-transparent rounded-lg hover:bg-[#008ba5] transition-colors'
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRoles;
