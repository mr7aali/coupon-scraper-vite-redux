import React from 'react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
  return (
    <div className='p-8 bg-[#F9FAFB] min-h-screen'>
      <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-8'>
        <h1 className='text-2xl font-bold text-[#111827] mb-2'>{title}</h1>
        <p className='text-gray-500 text-sm'>
          {description ?? 'Content for this section will go here. Use this route as a starting point.'}
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
