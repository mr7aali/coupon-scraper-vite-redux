import { useState } from 'react';
import { ImagePlus, Edit2, X, ChevronLeft, Plus, Edit, Trash2, Check } from 'lucide-react';

const CONTENT_CARDS = [
  {
    id: 1,
    title: 'Home Banners',
    type: 'Image Carousel',
    description: 'Manage the rotating hero banners on the mobile app home screen.',
    icon: ImagePlus,
  },
  {
    id: 2,
    title: 'Featured Deals',
    type: 'List Selection',
    description: 'Curate the top deals shown in the "Hot Right Now" section.',
    icon: Edit2,
  },
  {
    id: 3,
    title: 'Help & FAQ',
    type: 'Rich Text',
    description: 'Update frequently asked questions and support articles.',
    icon: Edit2,
  },
  {
    id: 4,
    title: 'Terms & Conditions',
    type: 'Rich Text',
    description: 'Legal terms, privacy policy, and cashback rules.',
    icon: Edit2,
  },
];

const ContentManagement = () => {
  const [editingCard, setEditingCard] = useState<typeof CONTENT_CARDS[0] | null>(null);
  const [editingFaqId, setEditingFaqId] = useState<number | null>(null);
  const [faqs, setFaqs] = useState([
    { id: 1, question: 'Leslie Alexander', answer: 'Lorem ipsum dolor sit amet consectetur. Nunc dui tincidunt mi amet diam malesuada et. Consectetur arcu scelerisque ut...' },
    { id: 2, question: 'Leslie Alexander', answer: 'Lorem ipsum dolor sit amet consectetur. Nunc dui tincidunt mi amet diam malesuada et. Consectetur arcu scelerisque ut...' },
    { id: 3, question: 'Leslie Alexander', answer: 'Lorem ipsum dolor sit amet consectetur. Nunc dui tincidunt mi amet diam malesuada et. Consectetur arcu scelerisque ut...' },
    { id: 4, question: 'Leslie Alexander', answer: 'Lorem ipsum dolor sit amet consectetur. Nunc dui tincidunt mi amet diam malesuada et. Consectetur arcu scelerisque ut...' },
    { id: 5, question: 'Leslie Alexander', answer: 'Lorem ipsum dolor sit amet consectetur. Nunc dui tincidunt mi amet diam malesuada et. Consectetur arcu scelerisque ut...' },
  ]);

  const handleUpdateFaq = (id: number, field: 'question' | 'answer', value: string) => {
    setFaqs(faqs.map(faq => faq.id === id ? { ...faq, [field]: value } : faq));
  };

  const handleAddFaq = () => {
    const newId = faqs.length > 0 ? Math.max(...faqs.map(f => f.id)) + 1 : 1;
    setFaqs([...faqs, {
      id: newId,
      question: 'New FAQ Question',
      answer: 'Write your answer here...'
    }]);
    setEditingFaqId(newId);
  };

  const handleDeleteFaq = (id: number) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
    if (editingFaqId === id) setEditingFaqId(null);
  };

  return (
    <div className='bg-[#FAFAFA] min-h-full'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-[20.4px] font-bold text-[#111827] mb-2 font-sans'>Content Management</h1>
        <p className='text-[#6B7280] text-[15px]'>Edit app content, banners, and legal pages.</p>
      </div>

      {/* Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {CONTENT_CARDS.map((card) => (
          <div key={card.id} className='bg-white rounded-xl border border-[#F3F4F6] shadow-sm p-6 flex flex-col justify-between'>
            <div>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-[16px] font-semibold text-[#111827]'>{card.title}</h2>
                <span className='px-3 py-1 bg-[#F3F4F6] text-[#4B5563] text-[12px] font-medium rounded-full'>
                  {card.type}
                </span>
              </div>
              <p className='text-[#6B7280] text-[14px] mb-6'>
                {card.description}
              </p>
            </div>

            <button
              onClick={() => setEditingCard(card)}
              className='w-full flex items-center justify-center gap-2 bg-[#E6F9FC] hover:bg-[#B2EBF2] text-[#00A1BF] py-2.5 rounded-lg font-medium transition-colors text-[14px]'
            >
              <card.icon className='w-4 h-4' />
              Edit Content
            </button>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingCard && (
        <div
          onClick={() => setEditingCard(null)}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`rounded-2xl shadow-xl w-full max-h-[90vh] overflow-y-auto ${editingCard.id === 3 ? 'bg-[#FAF7F2] max-w-5xl' : 'bg-white max-w-2xl'}`}
          >
            {editingCard.id === 3 ? (
              <div className="p-8 w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setEditingCard(null)} className="text-[#374151] hover:text-black">
                      <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
                    </button>
                    <h2 className="text-[20px] font-medium text-[#111827] font-serif tracking-wide">Update FAQ</h2>
                  </div>
                  <button
                    onClick={handleAddFaq}
                    className="flex items-center gap-2 bg-[#528A69] hover:bg-[#437256] text-white px-5 py-2.5 rounded-lg font-medium text-[14px] transition-colors border border-[#437256]"
                  >
                    <Plus className="w-4 h-4" />
                    Add FAQ
                  </button>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-xl border border-[#F3F4F6] shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#F3F4F6] text-left">
                        <th className="px-6 py-4 text-[14px] font-medium text-[#4B5563]">User ID</th>
                        <th className="px-6 py-4 text-[14px] font-medium text-[#4B5563]">Questions</th>
                        <th className="px-6 py-4 text-[14px] font-medium text-[#4B5563]">Answer</th>
                        <th className="px-6 py-4 text-[14px] font-medium text-[#4B5563] text-center w-[120px]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3F4F6]">
                      {faqs.map((item, index) => (
                        <tr key={item.id} className={`transition-colors ${index === 1 ? 'bg-[#EAF3F0]' : 'hover:bg-[#F9FAFB]'}`}>
                          <td className="px-6 py-5 text-[14px] font-medium text-[#4B5563]">{item.id}</td>
                          <td className="px-6 py-5 text-[14px] text-[#4B5563] font-serif">
                            {editingFaqId === item.id ? (
                              <input
                                type="text"
                                value={item.question}
                                onChange={(e) => handleUpdateFaq(item.id, 'question', e.target.value)}
                                className="w-full px-3 py-1.5 border border-[#D1D5DB] rounded-md focus:ring-1 focus:ring-[#528A69] focus:border-[#528A69] outline-none font-sans"
                              />
                            ) : (
                              item.question
                            )}
                          </td>
                          <td className="px-6 py-5 text-[14px] text-[#4B5563] font-serif w-3/5">
                            {editingFaqId === item.id ? (
                              <textarea
                                value={item.answer}
                                onChange={(e) => handleUpdateFaq(item.id, 'answer', e.target.value)}
                                rows={2}
                                className="w-full px-3 py-1.5 border border-[#D1D5DB] rounded-md focus:ring-1 focus:ring-[#528A69] focus:border-[#528A69] outline-none resize-none font-sans"
                              />
                            ) : (
                              item.answer
                            )}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center justify-center gap-3">
                              {editingFaqId === item.id ? (
                                <button
                                  onClick={() => setEditingFaqId(null)}
                                  className="text-[#528A69] hover:text-[#437256]"
                                >
                                  <Check className="w-5 h-5" />
                                </button>
                              ) : (
                                <>
                                  <button
                                    onClick={() => setEditingFaqId(item.id)}
                                    className="text-[#4B5563] hover:text-black"
                                  >
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteFaq(item.id)}
                                    className="text-[#FCA5A5] hover:text-[#EF4444]"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <>
                {/* Modal Header */}
                <div className='flex items-center justify-between p-6 border-b border-[#F3F4F6]'>
                  <div>
                    <h2 className='text-xl font-bold text-[#111827]'>Edit {editingCard.title}</h2>
                    <p className='text-sm text-[#6B7280] mt-1'>Update the content for {editingCard.title.toLowerCase()}</p>
                  </div>
                  <button
                    onClick={() => setEditingCard(null)}
                    className='text-[#9CA3AF] hover:text-[#4B5563] transition-colors rounded-full p-1 hover:bg-[#F3F4F6]'
                  >
                    <X className='w-5 h-5' />
                  </button>
                </div>

                {/* Modal Body - Adaptive Content based on type */}
                <div className='p-6'>
                  {editingCard.type === 'Image Carousel' && (
                    <div className='space-y-4'>
                      <label className='block text-sm font-semibold text-[#374151] mb-2'>Carousel Images</label>
                      <div className='flex flex-col items-center justify-center h-48 border-2 border-dashed border-[#D1D5DB] rounded-xl bg-[#F9FAFB] text-[#6B7280] hover:bg-[#F3F4F6] transition-colors cursor-pointer'>
                        <ImagePlus className='w-8 h-8 mb-3 text-[#9CA3AF]' />
                        <p className='text-sm font-medium text-[#4B5563]'>Click to upload or drag images here</p>
                        <p className='text-xs text-[#9CA3AF] mt-1'>PNG, JPG, or WEBP up to 5MB</p>
                      </div>
                    </div>
                  )}
                  {editingCard.type === 'List Selection' && (
                    <div>
                      <label className='block text-sm font-semibold text-[#374151] mb-2'>Select Deals to Feature</label>
                      <select className='block w-full px-4 py-3 border border-[#D1D5DB] rounded-lg focus:ring-[#00A1BF] focus:border-[#00A1BF] sm:text-sm outline-none bg-white text-[#111827]'>
                        <option>Summer Sale (50% Off)</option>
                        <option>Black Friday Special</option>
                        <option>New User Discount</option>
                      </select>
                    </div>
                  )}
                  {editingCard.type === 'Rich Text' && (
                    <div>
                      <label className='block text-sm font-semibold text-[#374151] mb-2'>Page Content</label>
                      <textarea
                        rows={10}
                        className='block w-full px-4 py-3 border border-[#D1D5DB] rounded-lg focus:ring-[#00A1BF] focus:border-[#00A1BF] sm:text-sm outline-none resize-none transition-colors'
                        placeholder='Write your content here...'
                        defaultValue={"These terms and conditions govern your use of the platform..."}
                      ></textarea>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className='flex items-center justify-end gap-3 p-6 border-t border-[#F3F4F6] bg-[#FAFAFA]'>
                  <button
                    onClick={() => setEditingCard(null)}
                    className='px-5 py-2.5 text-sm font-medium text-[#4B5563] bg-white border border-[#D1D5DB] rounded-lg hover:bg-[#F9FAFB] transition-colors'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setEditingCard(null)}
                    className='px-5 py-2.5 text-sm font-medium text-white bg-[#00A1BF] border border-transparent rounded-lg hover:bg-[#008ba5] transition-colors'
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};








export default ContentManagement;
