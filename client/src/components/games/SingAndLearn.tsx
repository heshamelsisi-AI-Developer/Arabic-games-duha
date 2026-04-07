import { useState, useEffect } from 'react';
import { Volume2, RotateCcw } from 'lucide-react';

interface GameItem {
  letter: string;
  letterName: string;
  emoji: string;
  song: string;
}

/**
 * Sing & Learn Game
 * Design: Playful & Vibrant
 * - Display letter with emoji
 * - Play song button (placeholder)
 * - Learn letter with music
 */

const GAME_ITEMS: GameItem[] = [
  {
    letter: 'ا',
    letterName: 'ألف',
    emoji: '🍎',
    song: 'ألف... ألف... أرنب يركض في الحقل',
  },
  {
    letter: 'ب',
    letterName: 'باء',
    emoji: '🍌',
    song: 'باء... باء... بطة تسبح في الماء',
  },
  {
    letter: 'ت',
    letterName: 'تاء',
    emoji: '🍅',
    song: 'تاء... تاء... تمساح يسير ببطء',
  },
  {
    letter: 'ث',
    letterName: 'ثاء',
    emoji: '🐯',
    song: 'ثاء... ثاء... ثعلب ذكي وماهر',
  },
  {
    letter: 'ج',
    letterName: 'جيم',
    emoji: '🥕',
    song: 'جيم... جيم... جمل يمشي في الصحراء',
  },
];

export default function SingAndLearn() {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visitedLetters, setVisitedLetters] = useState<number[]>([]);

  const currentItem = GAME_ITEMS[currentItemIndex];

  useEffect(() => {
    if (!visitedLetters.includes(currentItemIndex)) {
      setVisitedLetters([...visitedLetters, currentItemIndex]);
    }
  }, [currentItemIndex]);

  const playSong = () => {
    setIsPlaying(true);
    // Simulate song playback
    const utterance = new SpeechSynthesisUtterance(currentItem.song);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.9;
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (currentItemIndex < GAME_ITEMS.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentItemIndex(0);
    setVisitedLetters([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      {/* Progress */}
      <div className="w-full bg-white/60 backdrop-blur-md border-b-2 border-[#E8D4E8] p-4">
        <div className="container flex justify-between items-center">
          <h2 className="text-3xl font-bold text-[#2D1B3D]">تعلم مع الأغنية</h2>
          <div className="text-lg text-[#7A6B8F] font-poppins">
            {currentItemIndex + 1} / {GAME_ITEMS.length}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full">
        {/* Letter Display */}
        <div className="flex flex-col items-center gap-6">
          {/* Emoji */}
          <div className="text-9xl" style={{ animation: 'bounce 1s ease-in-out infinite' }}>{currentItem.emoji}</div>

          {/* Letter */}
          <div className="text-9xl font-bold text-[#2D1B3D]">{currentItem.letter}</div>

          {/* Letter Name */}
          <h3 className="text-4xl font-bold text-[#4ECDC4]">{currentItem.letterName}</h3>
        </div>

        {/* Song Display */}
        <div className="bg-gradient-to-r from-[#FFD93D]/20 to-[#4ECDC4]/20 rounded-2xl p-8 w-full max-w-2xl border-4 border-dashed border-[#B8A8FF]">
          <p className="text-center text-lg text-[#2D1B3D] font-poppins leading-relaxed">
            {currentItem.song}
          </p>
        </div>

        {/* Play Song Button */}
        <button
          onClick={playSong}
          disabled={isPlaying}
          className="bg-[#FF6B5B] text-white px-12 py-6 rounded-full text-2xl font-bold font-poppins hover:bg-[#E55A4A] transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg"
        >
          <Volume2 size={32} />
          {isPlaying ? 'جاري التشغيل...' : 'اسمع الأغنية'}
        </button>

        {/* Fun Facts */}
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-md border-2 border-[#E8D4E8]">
          <p className="text-center text-[#7A6B8F] font-poppins">
            💡 <span className="font-bold">نصيحة:</span> استمع للأغنية عدة مرات وحاول تكرارها مع الموسيقى!
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full bg-white/60 backdrop-blur-md border-t-2 border-[#E8D4E8] p-6">
        <div className="container flex justify-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentItemIndex === 0}
            className="px-8 py-3 bg-[#B8A8FF] text-white rounded-full font-bold font-poppins hover:bg-[#A89AFF] transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← السابق
          </button>
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-[#FFD93D] text-[#2D1B3D] rounded-full font-bold font-poppins hover:bg-[#FFC91F] transition-all duration-200 hover:shadow-lg flex items-center gap-2"
          >
            <RotateCcw size={20} />
            إعادة تعيين
          </button>
          <button
            onClick={handleNext}
            disabled={currentItemIndex === GAME_ITEMS.length - 1}
            className="px-8 py-3 bg-[#4ECDC4] text-white rounded-full font-bold font-poppins hover:bg-[#3DB8B0] transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            التالي →
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-[#E8D4E8]">
        <div
          className="h-full bg-gradient-to-r from-[#FF6B5B] to-[#4ECDC4] transition-all duration-300"
          style={{ width: `${((currentItemIndex + 1) / GAME_ITEMS.length) * 100}%` }}
        />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
