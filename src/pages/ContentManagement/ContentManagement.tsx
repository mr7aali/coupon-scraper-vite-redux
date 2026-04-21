import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronLeft, Edit, Edit2, ImagePlus, Plus, Trash2, UploadCloud, X } from 'lucide-react';
import {
  useCreateFaqMutation,
  useCreateHeroSlideMutation,
  useDeleteFaqMutation,
  useDeleteHeroSlideMutation,
  useGetFaqsQuery,
  useGetHeroSlidesQuery,
  useUpdateFaqMutation,
  useUpdateHeroSlideMutation,
  type FaqItem,
  type HeroSlideItem,
} from '../../features/content/contentApi';

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

type EditingCard = typeof CONTENT_CARDS[number] | null;

const ContentManagement = () => {
  const [editingCard, setEditingCard] = useState<EditingCard>(null);
  const [editingFaqId, setEditingFaqId] = useState<number | null>(null);
  const [editingHeroId, setEditingHeroId] = useState<number | null>(null);
  const [faqDrafts, setFaqDrafts] = useState<Record<number, { question: string; answer: string }>>({});
  const [heroDrafts, setHeroDrafts] = useState<Record<number, { title: string; imageUrl: string; buttonTitle: string }>>({});
  const [newHeroFile, setNewHeroFile] = useState<File | null>(null);
  const [isHeroUploadOpen, setIsHeroUploadOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const { data: faqData, isLoading: isFaqLoading, refetch: refetchFaqs } = useGetFaqsQuery();
  const { data: heroData, isLoading: isHeroLoading, refetch: refetchHeroSlides } = useGetHeroSlidesQuery();
  const [createFaq, { isLoading: isCreatingFaq }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdatingFaq }] = useUpdateFaqMutation();
  const [deleteFaq, { isLoading: isDeletingFaq }] = useDeleteFaqMutation();
  const [createHeroSlide, { isLoading: isCreatingHero }] = useCreateHeroSlideMutation();
  const [updateHeroSlide, { isLoading: isUpdatingHero }] = useUpdateHeroSlideMutation();
  const [deleteHeroSlide, { isLoading: isDeletingHero }] = useDeleteHeroSlideMutation();

  const faqs = useMemo(
    () => [...(faqData?.data.items ?? [])].sort((a, b) => a.displayOrder - b.displayOrder || a.id - b.id),
    [faqData],
  );
  const heroSlides = useMemo(
    () => [...(heroData?.data.items ?? [])].sort((a, b) => a.displayOrder - b.displayOrder || a.id - b.id),
    [heroData],
  );

  const isBusy = isCreatingFaq || isUpdatingFaq || isDeletingFaq || isCreatingHero || isUpdatingHero || isDeletingHero;
  const newHeroPreviewUrl = useMemo(
    () => (newHeroFile ? URL.createObjectURL(newHeroFile) : ''),
    [newHeroFile],
  );

  useEffect(() => {
    return () => {
      if (newHeroPreviewUrl) {
        URL.revokeObjectURL(newHeroPreviewUrl);
      }
    };
  }, [newHeroPreviewUrl]);

  const setFaqDraft = (id: number, field: 'question' | 'answer', value: string, fallback: FaqItem) => {
    setFaqDrafts((current) => ({
      ...current,
      [id]: {
        question: current[id]?.question ?? fallback.question,
        answer: current[id]?.answer ?? fallback.answer,
        [field]: value,
      },
    }));
  };

  const setHeroDraft = (id: number, field: 'title' | 'imageUrl' | 'buttonTitle', value: string, fallback: HeroSlideItem) => {
    setHeroDrafts((current) => ({
      ...current,
      [id]: {
        title: current[id]?.title ?? fallback.title,
        imageUrl: current[id]?.imageUrl ?? fallback.imageUrl,
        buttonTitle: current[id]?.buttonTitle ?? fallback.buttonTitle,
        [field]: value,
      },
    }));
  };

  const startFaqEdit = (faq: FaqItem) => {
    setEditingFaqId(faq.id);
    setFaqDrafts((current) => ({
      ...current,
      [faq.id]: {
        question: faq.question,
        answer: faq.answer,
      },
    }));
  };

  const startHeroEdit = (slide: HeroSlideItem) => {
    setEditingHeroId(slide.id);
    setHeroDrafts((current) => ({
      ...current,
      [slide.id]: {
        title: slide.title,
        imageUrl: slide.imageUrl,
        buttonTitle: slide.buttonTitle,
      },
    }));
  };

  const saveFaq = async (faq: FaqItem) => {
    const draft = faqDrafts[faq.id];
    if (!draft) {
      setEditingFaqId(null);
      return;
    }

    try {
      await updateFaq({
        id: faq.id,
        body: {
          question: draft.question,
          answer: draft.answer,
        },
      }).unwrap();
      setEditingFaqId(null);
      setFeedbackMessage('FAQ updated successfully.');
      refetchFaqs();
    } catch (error) {
      setFeedbackMessage(extractErrorMessage(error, 'Unable to update FAQ.'));
    }
  };

  const saveHeroSlide = async (slide: HeroSlideItem) => {
    const draft = heroDrafts[slide.id];
    if (!draft) {
      setEditingHeroId(null);
      return;
    }

    try {
      await updateHeroSlide({
        id: slide.id,
        body: {
          title: draft.title,
          imageUrl: draft.imageUrl,
          buttonTitle: draft.buttonTitle,
        },
      }).unwrap();
      setEditingHeroId(null);
      setFeedbackMessage('Hero slide updated successfully.');
      refetchHeroSlides();
    } catch (error) {
      setFeedbackMessage(extractErrorMessage(error, 'Unable to update hero slide.'));
    }
  };

  const handleAddFaq = async () => {
    try {
      const response = await createFaq({
        question: 'New FAQ Question',
        answer: 'Write your answer here...',
        displayOrder: faqs.length,
        isActive: true,
      }).unwrap();
      setFeedbackMessage('FAQ created successfully.');
      refetchFaqs();
      startFaqEdit(response.data);
    } catch (error) {
      setFeedbackMessage(extractErrorMessage(error, 'Unable to create FAQ.'));
    }
  };

  const handleDeleteFaq = async (id: number) => {
    try {
      await deleteFaq(id).unwrap();
      if (editingFaqId === id) {
        setEditingFaqId(null);
      }
      setFeedbackMessage('FAQ deleted successfully.');
      refetchFaqs();
    } catch (error) {
      setFeedbackMessage(extractErrorMessage(error, 'Unable to delete FAQ.'));
    }
  };

  const handleAddHeroSlide = async () => {
    if (!newHeroFile) {
      setFeedbackMessage('Please choose an image file for the new banner.');
      return;
    }

    try {
      const response = await createHeroSlide({
        title: `Banner ${heroSlides.length + 1}`,
        buttonTitle: 'Shop Now',
        file: newHeroFile,
        displayOrder: heroSlides.length,
        isActive: true,
      }).unwrap();
      setFeedbackMessage('Hero slide created successfully.');
      setNewHeroFile(null);
      setIsHeroUploadOpen(false);
      refetchHeroSlides();
      startHeroEdit(response.data);
    } catch (error) {
      setFeedbackMessage(extractErrorMessage(error, 'Unable to create hero slide.'));
    }
  };

  const handleDeleteHeroSlide = async (id: number) => {
    try {
      await deleteHeroSlide(id).unwrap();
      if (editingHeroId === id) {
        setEditingHeroId(null);
      }
      setFeedbackMessage('Hero slide deleted successfully.');
      refetchHeroSlides();
    } catch (error) {
      setFeedbackMessage(extractErrorMessage(error, 'Unable to delete hero slide.'));
    }
  };

  return (
    <div className="min-h-full bg-[#FAFAFA]">
      <div className="mb-8">
        <h1 className="mb-2 font-sans text-[20.4px] font-bold text-[#111827]">Content Management</h1>
        <p className="text-[15px] text-[#6B7280]">Edit app content, banners, and legal pages.</p>
      </div>

      {feedbackMessage ? (
        <div className="mb-6 rounded-lg border border-[#D1FAE5] bg-[#ECFDF5] px-4 py-3 text-sm text-[#047857]">
          {feedbackMessage}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {CONTENT_CARDS.map((card) => (
          <div key={card.id} className="flex flex-col justify-between rounded-xl border border-[#F3F4F6] bg-white p-6 shadow-sm">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[16px] font-semibold text-[#111827]">{card.title}</h2>
                <span className="rounded-full bg-[#F3F4F6] px-3 py-1 text-[12px] font-medium text-[#4B5563]">
                  {card.type}
                </span>
              </div>
              <p className="mb-6 text-[14px] text-[#6B7280]">{card.description}</p>
            </div>

            <button
              onClick={() => setEditingCard(card)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#E6F9FC] py-2.5 text-[14px] font-medium text-[#00A1BF] transition-colors hover:bg-[#B2EBF2]"
            >
              <card.icon className="h-4 w-4" />
              Edit Content
            </button>
          </div>
        ))}
      </div>

      {editingCard ? (
        <div
          onClick={() => setEditingCard(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className={`max-h-[90vh] w-full overflow-y-auto rounded-2xl shadow-xl ${
              editingCard.id === 3 ? 'max-w-5xl bg-[#FAF7F2]' : 'max-w-5xl bg-white'
            }`}
          >
            {editingCard.id === 3 ? (
              <div className="w-full p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setEditingCard(null)} className="text-[#374151] hover:text-black">
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <h2 className="font-serif text-[20px] font-medium tracking-wide text-[#111827]">Update FAQ</h2>
                  </div>
                  <button
                    onClick={handleAddFaq}
                    disabled={isBusy}
                    className="flex items-center gap-2 rounded-lg border border-[#437256] bg-[#528A69] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#437256] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Plus className="h-4 w-4" />
                    Add FAQ
                  </button>
                </div>

                <div className="overflow-hidden rounded-xl border border-[#F3F4F6] bg-white shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#F3F4F6] text-left">
                        <th className="px-6 py-4 text-[14px] font-medium text-[#4B5563]">ID</th>
                        <th className="px-6 py-4 text-[14px] font-medium text-[#4B5563]">Questions</th>
                        <th className="px-6 py-4 text-[14px] font-medium text-[#4B5563]">Answer</th>
                        <th className="w-[120px] px-6 py-4 text-center text-[14px] font-medium text-[#4B5563]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3F4F6]">
                      {isFaqLoading ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-sm text-[#6B7280]">
                            Loading FAQs...
                          </td>
                        </tr>
                      ) : faqs.map((item) => (
                        <tr key={item.id} className="transition-colors hover:bg-[#F9FAFB]">
                          <td className="px-6 py-5 text-[14px] font-medium text-[#4B5563]">{item.id}</td>
                          <td className="px-6 py-5 text-[14px] font-serif text-[#4B5563]">
                            {editingFaqId === item.id ? (
                              <input
                                type="text"
                                value={faqDrafts[item.id]?.question ?? item.question}
                                onChange={(event) => setFaqDraft(item.id, 'question', event.target.value, item)}
                                className="w-full rounded-md border border-[#D1D5DB] px-3 py-1.5 font-sans outline-none focus:border-[#528A69] focus:ring-1 focus:ring-[#528A69]"
                              />
                            ) : (
                              item.question
                            )}
                          </td>
                          <td className="w-3/5 px-6 py-5 text-[14px] font-serif text-[#4B5563]">
                            {editingFaqId === item.id ? (
                              <textarea
                                value={faqDrafts[item.id]?.answer ?? item.answer}
                                onChange={(event) => setFaqDraft(item.id, 'answer', event.target.value, item)}
                                rows={2}
                                className="w-full resize-none rounded-md border border-[#D1D5DB] px-3 py-1.5 font-sans outline-none focus:border-[#528A69] focus:ring-1 focus:ring-[#528A69]"
                              />
                            ) : (
                              item.answer
                            )}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center justify-center gap-3">
                              {editingFaqId === item.id ? (
                                <button onClick={() => saveFaq(item)} className="text-[#528A69] hover:text-[#437256]">
                                  <Check className="h-5 w-5" />
                                </button>
                              ) : (
                                <>
                                  <button onClick={() => startFaqEdit(item)} className="text-[#4B5563] hover:text-black">
                                    <Edit className="h-5 w-5" />
                                  </button>
                                  <button onClick={() => handleDeleteFaq(item.id)} className="text-[#FCA5A5] hover:text-[#EF4444]">
                                    <Trash2 className="h-5 w-5" />
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
            ) : editingCard.id === 1 ? (
              <>
                <div className="flex items-center justify-between border-b border-[#F3F4F6] p-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#111827]">Edit Home Banners</h2>
                    <p className="mt-1 text-sm text-[#6B7280]">Keep the app storefront fresh with clean, high-impact hero banners.</p>
                  </div>
                  <button
                    onClick={() => setEditingCard(null)}
                    className="rounded-full p-1 text-[#9CA3AF] transition-colors hover:bg-[#F3F4F6] hover:text-[#4B5563]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-6 rounded-2xl border border-[#E5EEF2] bg-[linear-gradient(180deg,#FBFEFF_0%,#F4FBFD_100%)] p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="text-[15px] font-semibold text-[#111827]">Banner Library</h3>
                        <p className="mt-1 text-sm text-[#6B7280]">Add a new visual to the home carousel when you are ready.</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {isHeroUploadOpen ? (
                          <button
                            onClick={() => {
                              setIsHeroUploadOpen(false);
                              setNewHeroFile(null);
                            }}
                            className="rounded-lg border border-[#D1D5DB] bg-white px-4 py-2.5 text-sm font-medium text-[#4B5563] transition-colors hover:bg-[#F9FAFB]"
                          >
                            Cancel
                          </button>
                        ) : null}
                        <button
                          onClick={() => setIsHeroUploadOpen((current) => !current)}
                          className="flex items-center justify-center gap-2 rounded-lg bg-[#00A1BF] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#008ba5]"
                        >
                          <Plus className="h-4 w-4" />
                          Upload Banner
                        </button>
                      </div>
                    </div>

                    {isHeroUploadOpen ? (
                      <div className="mt-5">
                        <label className="group block cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => setNewHeroFile(event.target.files?.[0] ?? null)}
                            className="sr-only"
                          />
                          <div className="overflow-hidden rounded-2xl border-2 border-dashed border-[#BFE8EF] bg-white transition-colors group-hover:border-[#00A1BF] group-hover:bg-[#F8FDFF]">
                            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr),320px]">
                              <div className="flex min-h-[260px] flex-col items-center justify-center px-6 py-8 text-center">
                                <div className="mb-4 rounded-2xl bg-[#E6F9FC] p-4 text-[#00A1BF]">
                                  <UploadCloud className="h-7 w-7" />
                                </div>
                                <h4 className="text-base font-semibold text-[#111827]">Drag and upload banner image</h4>
                                <p className="mt-2 max-w-sm text-sm leading-6 text-[#6B7280]">
                                  Choose a clear wide image for the mobile hero carousel. PNG, JPG, or WEBP works best.
                                </p>
                                <span className="mt-4 inline-flex rounded-lg border border-[#D7EEF3] bg-[#F7FCFD] px-4 py-2 text-sm font-medium text-[#00A1BF]">
                                  Browse files
                                </span>
                                <p className="mt-4 text-sm font-medium text-[#0F766E]">
                                  {newHeroFile ? newHeroFile.name : 'No file chosen'}
                                </p>
                              </div>

                              <div className="border-t border-[#EEF6F8] bg-[#FBFEFF] p-4 lg:border-l lg:border-t-0">
                                <p className="text-sm font-semibold text-[#111827]">Preview</p>
                                <p className="mt-1 text-xs text-[#6B7280]">This is how the next banner asset will look.</p>

                                <div className="mt-4">
                                  {newHeroPreviewUrl ? (
                                    <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]">
                                      <img
                                        src={newHeroPreviewUrl}
                                        alt="New banner preview"
                                        className="h-[180px] w-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div className="flex h-[180px] items-center justify-center rounded-xl border border-dashed border-[#D1D5DB] bg-[#F9FAFB] text-sm text-[#9CA3AF]">
                                      Preview will appear here
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </label>

                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={handleAddHeroSlide}
                            disabled={isBusy || !newHeroFile}
                            className="flex items-center justify-center gap-2 rounded-xl bg-[#00A1BF] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#008ba5] disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <UploadCloud className="h-4 w-4" />
                            Confirm Upload
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {!isHeroUploadOpen ? (
                    <div className="space-y-4">
                      {isHeroLoading ? (
                        <div className="rounded-xl border border-[#F3F4F6] bg-[#F9FAFB] px-4 py-10 text-center text-sm text-[#6B7280]">
                          Loading hero slides...
                        </div>
                      ) : heroSlides.map((slide) => (
                        <div key={slide.id} className="rounded-xl border border-[#F3F4F6] p-4">
                          <div className="grid gap-4 lg:grid-cols-[180px,1fr,160px,140px] lg:items-start">
                            <div className="overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#F9FAFB]">
                              <img
                                src={heroDrafts[slide.id]?.imageUrl ?? slide.imageUrl}
                                alt={heroDrafts[slide.id]?.title ?? slide.title}
                                className="h-[110px] w-full object-cover"
                              />
                            </div>
                            <div className="space-y-3">
                              <input
                                type="text"
                                value={heroDrafts[slide.id]?.title ?? slide.title}
                                disabled={editingHeroId !== slide.id}
                                onChange={(event) => setHeroDraft(slide.id, 'title', event.target.value, slide)}
                                className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2.5 text-sm text-[#111827] outline-none focus:border-[#00A1BF] focus:ring-1 focus:ring-[#00A1BF] disabled:bg-[#F9FAFB]"
                              />
                              <input
                                type="text"
                                value={heroDrafts[slide.id]?.imageUrl ?? slide.imageUrl}
                                disabled={editingHeroId !== slide.id}
                                onChange={(event) => setHeroDraft(slide.id, 'imageUrl', event.target.value, slide)}
                                className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2.5 text-sm text-[#111827] outline-none focus:border-[#00A1BF] focus:ring-1 focus:ring-[#00A1BF] disabled:bg-[#F9FAFB]"
                              />
                            </div>
                            <input
                              type="text"
                              value={heroDrafts[slide.id]?.buttonTitle ?? slide.buttonTitle}
                              disabled={editingHeroId !== slide.id}
                              onChange={(event) => setHeroDraft(slide.id, 'buttonTitle', event.target.value, slide)}
                              className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2.5 text-sm text-[#111827] outline-none focus:border-[#00A1BF] focus:ring-1 focus:ring-[#00A1BF] disabled:bg-[#F9FAFB]"
                            />
                            <div className="flex items-center justify-end gap-3">
                              {editingHeroId === slide.id ? (
                                <button onClick={() => saveHeroSlide(slide)} className="text-[#00A1BF] hover:text-[#008ba5]">
                                  <Check className="h-5 w-5" />
                                </button>
                              ) : (
                                <button onClick={() => startHeroEdit(slide)} className="text-[#4B5563] hover:text-black">
                                  <Edit className="h-5 w-5" />
                                </button>
                              )}
                              <button onClick={() => handleDeleteHeroSlide(slide.id)} className="text-[#FCA5A5] hover:text-[#EF4444]">
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-[#F3F4F6] p-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#111827]">Edit {editingCard.title}</h2>
                    <p className="mt-1 text-sm text-[#6B7280]">Update the content for {editingCard.title.toLowerCase()}</p>
                  </div>
                  <button
                    onClick={() => setEditingCard(null)}
                    className="rounded-full p-1 text-[#9CA3AF] transition-colors hover:bg-[#F3F4F6] hover:text-[#4B5563]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6">
                  {editingCard.type === 'List Selection' ? (
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#374151]">Select Deals to Feature</label>
                      <select className="block w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-sm text-[#111827] outline-none focus:border-[#00A1BF] focus:ring-[#00A1BF]">
                        <option>Summer Sale (50% Off)</option>
                        <option>Black Friday Special</option>
                        <option>New User Discount</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#374151]">Page Content</label>
                      <textarea
                        rows={10}
                        className="block w-full resize-none rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm outline-none transition-colors focus:border-[#00A1BF] focus:ring-[#00A1BF]"
                        placeholder="Write your content here..."
                        defaultValue="These terms and conditions govern your use of the platform..."
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-[#F3F4F6] bg-[#FAFAFA] p-6">
                  <button
                    onClick={() => setEditingCard(null)}
                    className="rounded-lg border border-[#D1D5DB] bg-white px-5 py-2.5 text-sm font-medium text-[#4B5563] transition-colors hover:bg-[#F9FAFB]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setEditingCard(null)}
                    className="rounded-lg border border-transparent bg-[#00A1BF] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#008ba5]"
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

function extractErrorMessage(error: unknown, fallback: string) {
  if (typeof error === 'object' && error !== null && 'data' in error) {
    const apiError = error as { data?: { message?: string } };
    return apiError.data?.message || fallback;
  }
  return fallback;
}

export default ContentManagement;
