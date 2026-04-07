import { useState } from 'react';
import { ChevronRight, Volume2, ArrowLeft, Check, X } from 'lucide-react';
import { ARABIC_LETTERS, ArabicLetter } from '@/lib/arabicLetters';

interface PresentationsProps {
  onBack: () => void;
}

/**
 * Presentations Page
 * Design: Playful & Vibrant
 * - Lesson view for each letter
 * - Examples and pronunciation
 * - Quick exercises
 */

export default function Presentations({ onBack }: PresentationsProps) {
  const [selectedLetterIndex, setSelectedLetterIndex] = useState<number | null>(null);
  const [completedLetters, setCompletedLetters] = useState<Set<number>>(new Set());

  const currentLetter = selectedLetterIndex !== null ? ARABIC_LETTERS[selectedLetterIndex] : null;

  const playSound = (letter: string) => {
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.7;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };

  const handleCompleteLesson = () => {
    if (selectedLetterIndex !== null) {
      const newCompleted = new Set(completedLetters);
      newCompleted.add(selectedLetterIndex as number);
      setCompletedLetters(newCompleted);
      
      // Move to next letter
      if ((selectedLetterIndex as number) < ARABIC_LETTERS.length - 1) {
        setSelectedLetterIndex((selectedLetterIndex as number) + 1);
      }
    }
  };

  const handleSelectLetter = (index: number) => {
    setSelectedLetterIndex(index);
  };

  if (currentLetter && selectedLetterIndex !== null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFFBF5] to-[#F8F3FF] flex flex-col">
        {/* Header */}
        <header className="bg-white/40 backdrop-blur-md border-b border-[#E8D4E8] py-4">
          <div className="container flex items-center justify-between">
            <button
              onClick={() => setSelectedLetterIndex(null)}
              className="flex items-center gap-2 text-[#2D1B3D] hover:text-[#FF6B5B] transition-colors font-bold font-poppins"
            >
              <ArrowLeft size={20} />
              العودة للقائمة
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[#2D1B3D]">درس الحرف</h1>
              <p className="text-sm text-[#7A6B8F] font-poppins">
                {selectedLetterIndex + 1} / {ARABIC_LETTERS.length}
              </p>
            </div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#2D1B3D] hover:text-[#FF6B5B] transition-colors font-bold font-poppins"
            >
              الرئيسية
              <ArrowLeft size={20} />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container py-8 flex flex-col items-center justify-center gap-8">
          {/* Letter Display */}
          <div className="bg-white rounded-3xl p-12 shadow-lg border-4 border-[#4ECDC4] w-full max-w-2xl">
            {/* Letter */}
            <div className="text-9xl font-bold text-[#2D1B3D] text-center mb-6">
              {currentLetter.letter}
            </div>

            {/* Letter Name */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-[#4ECDC4] mb-2">
                {currentLetter.name}
              </h2>
              <p className="text-lg text-[#7A6B8F] font-poppins">
                {currentLetter.nameEnglish}
              </p>
            </div>

            {/* Play Sound Button */}
            <button
              onClick={() => playSound(currentLetter.letter)}
              className="w-full bg-gradient-to-r from-[#FF6B5B] to-[#FFB84D] text-white py-4 rounded-2xl font-bold font-poppins text-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mb-8"
            >
              <Volume2 size={24} />
              استمع للنطق الصحيح
            </button>

            {/* Example */}
            <div className="bg-gradient-to-r from-[#FFD93D]/20 to-[#4ECDC4]/20 rounded-2xl p-6 mb-6">
              <p className="text-sm text-[#7A6B8F] font-poppins mb-2">مثال على الكلمة:</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-[#2D1B3D]">{currentLetter.example}</p>
                  <p className="text-lg text-[#7A6B8F] font-poppins">{currentLetter.exampleMeaning}</p>
                </div>
                <div className="text-6xl">{currentLetter.emoji}</div>
              </div>
            </div>

            {/* Quick Exercise */}
            <div className="bg-white border-2 border-[#E8D4E8] rounded-2xl p-6">
              <p className="text-lg font-bold text-[#2D1B3D] mb-4">
                ✓ تمرين سريع: هل تستطيع نطق الحرف بشكل صحيح؟
              </p>
              <p className="text-[#7A6B8F] font-poppins mb-4">
                استمع للنطق الصحيح أعلاه، ثم حاول نطق الحرف بنفسك عدة مرات
              </p>
              <button
                onClick={() => playSound(currentLetter.letter)}
                className="w-full bg-[#4ECDC4] text-white py-3 rounded-xl font-bold font-poppins hover:bg-[#3DB8B0] transition-all duration-200"
              >
                استمع مرة أخرى
              </button>
            </div>
          </div>

          {/* Complete Button */}
          <button
            onClick={handleCompleteLesson}
            className="px-12 py-4 bg-gradient-to-r from-[#4ECDC4] to-[#FFD93D] text-white rounded-full font-bold font-poppins text-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <Check size={24} />
            انتهيت من الدرس
          </button>
        </main>

        {/* Footer */}
        <footer className="bg-white/40 backdrop-blur-sm border-t border-[#E8D4E8] py-4">
          <div className="container text-center">
            <p className="text-[#7A6B8F] font-poppins text-sm">
              الدروس المكتملة: {completedLetters.size} / {ARABIC_LETTERS.length}
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFFBF5] to-[#F8F3FF] flex flex-col">
      {/* Header */}
      <header className="bg-white/40 backdrop-blur-md border-b border-[#E8D4E8] py-4">
        <div className="container flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#2D1B3D] hover:text-[#FF6B5B] transition-colors font-bold font-poppins"
          >
            <ArrowLeft size={20} />
            الرئيسية
          </button>
          <h1 className="text-3xl font-bold text-[#2D1B3D]">📚 الدروس والشروحات</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8">
        {/* Progress */}
        <div className="mb-8 bg-white rounded-2xl p-4 shadow-md border-2 border-[#E8D4E8]">
          <p className="text-center text-[#7A6B8F] font-poppins mb-2">
            الدروس المكتملة
          </p>
          <div className="w-full bg-[#E8D4E8] rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#4ECDC4] to-[#FFD93D] h-full transition-all duration-300"
              style={{
                width: `${(completedLetters.size / ARABIC_LETTERS.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-center text-sm text-[#2D1B3D] font-bold mt-2">
            {completedLetters.size} / {ARABIC_LETTERS.length}
          </p>
        </div>

        {/* Letters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {ARABIC_LETTERS.map((letter, index) => {
            const isCompleted = completedLetters.has(index);
            return (
              <button
                key={index}
                onClick={() => handleSelectLetter(index)}
                className={`
                  p-4 rounded-2xl transition-all duration-200 border-4 font-bold text-center
                  ${
                    isCompleted
                      ? 'bg-[#4ECDC4] border-[#4ECDC4] text-white shadow-lg'
                      : 'bg-white border-[#FFD93D] text-[#2D1B3D] hover:shadow-lg hover:scale-105'
                  }
                `}
              >
                <div className="text-3xl mb-2">{letter.letter}</div>
                <div className="text-xs font-poppins text-[#7A6B8F]">
                  {letter.name}
                </div>
                {isCompleted && (
                  <div className="text-lg mt-1">✓</div>
                )}
              </button>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#E8D4E8]">
          <h3 className="text-2xl font-bold text-[#2D1B3D] mb-4">💡 كيفية استخدام الدروس</h3>
          <ul className="space-y-3 text-[#7A6B8F] font-poppins">
            <li className="flex items-start gap-3">
              <span className="text-2xl">1️⃣</span>
              <span>اختر حرفاً من القائمة لبدء الدرس</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">2️⃣</span>
              <span>استمع للنطق الصحيح للحرف</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">3️⃣</span>
              <span>تعلم مثالاً على كلمة تبدأ بهذا الحرف</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">4️⃣</span>
              <span>مارس نطق الحرف عدة مرات</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">5️⃣</span>
              <span>اضغط "انتهيت من الدرس" للانتقال للحرف التالي</span>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/40 backdrop-blur-sm border-t border-[#E8D4E8] py-4 mt-auto">
        <div className="container text-center">
          <p className="text-[#7A6B8F] font-poppins text-sm">
            🌟 استمتع بتعلم الحروف العربية!
          </p>
        </div>
      </footer>
    </div>
  );
}
