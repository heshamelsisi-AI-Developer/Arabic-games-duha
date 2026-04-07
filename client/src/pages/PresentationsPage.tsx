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
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFFBF5] to-[#F8F3FF] flex flex-col">
        {/* Header */}
        <header className="bg-white/40 backdrop-blur-md border-b border-[#E8D4E8] py-4 sticky top-0 z-10">
          <div className="container flex items-center justify-between">
            <button
              onClick={() => setSelectedPresentation(null)}
              className="flex items-center gap-2 text-[#2D1B3D] hover:text-[#FF6B5B] transition-colors font-bold font-poppins"
            >
              <ArrowLeft size={20} />
              الرجوع
            </button>
            <h1 className="text-2xl font-bold text-[#2D1B3D]">
              {selectedPresentation.titleArabic}
            </h1>
            <div className="w-20"></div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 container py-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#B8A8FF]">
            {/* Description */}
            <div className="mb-8">
              <p className="text-[#7A6B8F] font-poppins text-lg">
                {selectedPresentation.descriptionArabic}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-[#2D1B3D] leading-relaxed whitespace-pre-wrap text-lg">
                {selectedPresentation.contentArabic}
              </div>
            </div>

            {/* Metadata */}
            <div className="mt-12 pt-8 border-t-2 border-[#E8D4E8]">
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
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFFBF5] to-[#F8F3FF] flex flex-col">
      {/* Header */}
      <header className="bg-white/40 backdrop-blur-md border-b border-[#E8D4E8] py-4">
        <div className="container flex items-center justify-between">
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#2D1B3D] hover:text-[#FF6B5B] transition-colors font-bold font-poppins"
            >
              <ArrowLeft size={20} />
              الرجوع
            </button>
            <button
              onClick={onAdminClick}
              className="flex items-center gap-2 px-4 py-2 bg-[#FF6B5B] text-white rounded-full font-bold font-poppins hover:shadow-lg transition-all duration-200"
            >
              ⚙️ إدارة الدروس
            </button>
          </div>
          <h1 className="text-3xl font-bold text-[#2D1B3D]">📚 الدروس والشروحات</h1>
          <div className="w-40"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8">
        {presentations.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg border-4 border-[#B8A8FF]">
            <BookOpen size={48} className="mx-auto mb-4 text-[#7A6B8F]" />
            <h2 className="text-2xl font-bold text-[#2D1B3D] mb-2">
              لا توجد دروس حتى الآن
            </h2>
            <p className="text-[#7A6B8F] font-poppins mb-6">
              يمكنك إضافة دروس من خلال لوحة الإدارة
            </p>
            <button
              onClick={onAdminClick}
              className="px-6 py-3 bg-[#4ECDC4] text-white rounded-full font-bold font-poppins hover:shadow-lg transition-all duration-200"
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
                        ? 'bg-[#4ECDC4] text-white shadow-lg'
                        : 'bg-white/60 text-[#2D1B3D] hover:bg-white/80'
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
                          ? 'bg-[#FFD93D] text-[#2D1B3D] shadow-lg'
                          : 'bg-white/60 text-[#2D1B3D] hover:bg-white/80'
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
              <div className="bg-white rounded-2xl p-8 text-center shadow-md border-2 border-[#E8D4E8]">
                <p className="text-[#7A6B8F] font-poppins text-lg">
                  لا توجد دروس في هذه المرحلة
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPresentations.map(presentation => (
                  <button
                    key={presentation.id}
                    onClick={() => setSelectedPresentation(presentation)}
                    className="group bg-white rounded-2xl p-6 shadow-md border-2 border-[#E8D4E8] hover:shadow-xl hover:border-[#4ECDC4] transition-all duration-300 text-left"
                  >
                    {/* Icon */}
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      📖
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#2D1B3D] mb-2">
                      {presentation.titleArabic}
                    </h3>

                    {/* Description */}
                    <p className="text-[#7A6B8F] font-poppins text-sm mb-4 line-clamp-2">
                      {presentation.descriptionArabic}
                    </p>

                    {/* Stage Badge */}
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-[#4ECDC4]/20 text-[#4ECDC4] rounded-full text-xs font-bold font-poppins">
                        {stages.find(s => s.id === presentation.stage)?.name}
                      </span>
                      <span className="px-3 py-1 bg-[#FFD93D]/20 text-[#FFD93D] rounded-full text-xs font-bold font-poppins">
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
      <footer className="bg-white/40 backdrop-blur-sm border-t border-[#E8D4E8] py-4 mt-auto">
        <div className="container text-center">
          <p className="text-[#7A6B8F] font-poppins text-sm">
            إجمالي الدروس: {presentations.length}
            {selectedStage &&
              ` | الدروس في هذه المرحلة: ${sortedPresentations.length}`}
          </p>
        </div>
      </footer>
    </div>
  );
}
