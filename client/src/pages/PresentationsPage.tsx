import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface Presentation {
  id: string;
  title: string;
  titleArabic: string;
  description: string;
  descriptionArabic: string;
  content: string;
  contentArabic: string;
  stage: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PresentationsPageProps {
  onBack: () => void;
  onAdminClick: () => void;
}

/**
 * Presentations Page Component
 * Design: Playful & Vibrant
 * - Display lessons added by admin
 * - Organized by learning stages
 * - Interactive lesson viewer
 */

export default function PresentationsPage({
  onBack,
  onAdminClick,
}: PresentationsPageProps) {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [selectedPresentation, setSelectedPresentation] =
    useState<Presentation | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  // Load presentations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('presentations');
    if (saved) {
      const data = JSON.parse(saved);
      setPresentations(data.filter((p: Presentation) => p.isActive));
    }
  }, []);

  const stages = [
    { id: 'recognition', name: 'التعرف على الحروف', icon: '👁️' },
    { id: 'phonics', name: 'ربط الصوت بالحرف', icon: '🔊' },
    { id: 'blending', name: 'الدمج والتركيب', icon: '🔀' },
    { id: 'reading', name: 'القراءة', icon: '📖' },
    { id: 'fluency', name: 'الطلاقة', icon: '⚡' },
    { id: 'writing', name: 'الكتابة', icon: '✏️' },
  ];

  const filteredPresentations = selectedStage
    ? presentations.filter(p => p.stage === selectedStage)
    : presentations;

  const sortedPresentations = [...filteredPresentations].sort(
    (a, b) => a.order - b.order
  );

  if (selectedPresentation) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-[#D2B48C] flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-b from-[#F5F5DC] to-[#D2B48C] backdrop-blur-md py-2">
          <div className="container flex items-center justify-between">
            <button
              onClick={() => setSelectedPresentation(null)}
              className="flex items-center gap-2 text-[#5D4E37] hover:text-[#8B4513] transition-colors font-bold font-poppins"
            >
              <ArrowLeft size={20} />
              الرجوع
            </button>
            <h1 className="text-xl font-bold text-[#5D4E37]">
              {selectedPresentation.titleArabic}
            </h1>
            <div className="w-20"></div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 container py-4">
          <div className="bg-[#FFF5E6] rounded-3xl p-8 shadow-lg">
            {/* Description */}
            <div className="mb-8">
              <p className="text-[#8B4513] font-poppins text-lg">
                {selectedPresentation.descriptionArabic}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-[#5D4E37] leading-relaxed whitespace-pre-wrap text-lg">
                {selectedPresentation.contentArabic}
              </div>
            </div>

            {/* Metadata */}
            <div className="mt-12 pt-8">
              <div className="flex gap-4 text-sm text-[#7A6B8F] font-poppins">
                <span>
                  تم الإنشاء:{' '}
                  {new Date(selectedPresentation.createdAt).toLocaleDateString(
                    'ar-SA'
                  )}
                </span>
                <span>
                  آخر تحديث:{' '}
                  {new Date(selectedPresentation.updatedAt).toLocaleDateString(
                    'ar-SA'
                  )}
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5DC] to-[#D2B48C] flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-b from-[#F5F5DC] to-[#D2B48C] backdrop-blur-md py-2">
        <div className="container flex items-center justify-between">
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#5D4E37] hover:text-[#8B4513] transition-colors font-bold font-poppins"
            >
              <ArrowLeft size={20} />
              الرجوع
            </button>
            <button
              onClick={onAdminClick}
              className="flex items-center gap-2 px-4 py-2 bg-[#D2691E] text-white rounded-full font-bold font-poppins hover:shadow-lg transition-all duration-200"
            >
              ⚙️ إدارة الدروس
            </button>
          </div>
          <h1 className="text-2xl font-bold text-[#5D4E37]">📚 الدروس والشروحات</h1>
          <div className="w-40"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-4">
        {presentations.length === 0 ? (
          <div className="bg-[#FFF5E6] rounded-3xl p-12 text-center shadow-lg">
            <BookOpen size={48} className="mx-auto mb-4 text-[#8B4513]" />
            <h2 className="text-2xl font-bold text-[#5D4E37] mb-2">
              لا توجد دروس حتى الآن
            </h2>
            <p className="text-[#8B4513] font-poppins mb-6">
              يمكنك إضافة دروس من خلال لوحة الإدارة
            </p>
            <button
              onClick={onAdminClick}
              className="px-6 py-3 bg-[#8B4513] text-white rounded-full font-bold font-poppins hover:shadow-lg transition-all duration-200"
            >
              ⚙️ إدارة الدروس
            </button>
          </div>
        ) : (
          <>
            {/* Stage Filter */}
            <div className="mb-8 overflow-x-auto pb-2">
              <div className="flex gap-3 min-w-max">
                <button
                  onClick={() => setSelectedStage(null)}
                  className={`
                    px-6 py-3 rounded-full font-bold font-poppins transition-all duration-200 whitespace-nowrap
                    ${
                      selectedStage === null
                        ? 'bg-[#8B4513] text-white shadow-lg'
                        : 'bg-[#FFF5E6] text-[#5D4E37] hover:bg-[#F5F5DC]'
                    }
                  `}
                >
                  جميع الدروس
                </button>
                {stages.map(stage => (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStage(stage.id)}
                    className={`
                      px-6 py-3 rounded-full font-bold font-poppins transition-all duration-200 whitespace-nowrap
                      ${
                        selectedStage === stage.id
                          ? 'bg-[#CD853F] text-[#5D4E37] shadow-lg'
                          : 'bg-[#FFF5E6] text-[#5D4E37] hover:bg-[#F5F5DC]'
                      }
                    `}
                  >
                    <span className="mr-2">{stage.icon}</span>
                    {stage.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Presentations Grid */}
            {sortedPresentations.length === 0 ? (
              <div className="bg-[#FFF5E6] rounded-2xl p-8 text-center shadow-md">
                <p className="text-[#8B4513] font-poppins text-lg">
                  لا توجد دروس في هذه المرحلة
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPresentations.map(presentation => (
                  <button
                    key={presentation.id}
                    onClick={() => setSelectedPresentation(presentation)}
                    className="group bg-[#FFF5E6] rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-left"
                  >
                    {/* Icon */}
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      📖
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#5D4E37] mb-2">
                      {presentation.titleArabic}
                    </h3>

                    {/* Description */}
                    <p className="text-[#8B4513] font-poppins text-sm mb-4 line-clamp-2">
                      {presentation.descriptionArabic}
                    </p>

                    {/* Stage Badge */}
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-[#D2691E]/20 text-[#D2691E] rounded-full text-xs font-bold font-poppins">
                        {stages.find(s => s.id === presentation.stage)?.name}
                      </span>
                      <span className="px-3 py-1 bg-[#CD853F]/20 text-[#CD853F] rounded-full text-xs font-bold font-poppins">
                        #{presentation.order}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#D2B48C] to-[#F5F5DC] backdrop-blur-sm py-4 mt-auto">
        <div className="container text-center">
          <p className="text-[#5D4E37] font-poppins text-sm">
            إجمالي الدروس: {presentations.length}
            {selectedStage &&
              ` | الدروس في هذه المرحلة: ${sortedPresentations.length}`}
          </p>
        </div>
      </footer>
    </div>
  );
}
