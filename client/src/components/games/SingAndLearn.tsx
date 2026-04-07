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
  { letter: 'ا', letterName: 'ألف', emoji: '🐰', song: 'ألف... ألف... أرنب يركض في الحقل' },
  { letter: 'ب', letterName: 'باء', emoji: '🦆', song: 'باء... باء... بطة تسبح في الماء' },
  { letter: 'ت', letterName: 'تاء', emoji: '🐊', song: 'تاء... تاء... تمساح يسير ببطء' },
  { letter: 'ث', letterName: 'ثاء', emoji: '🦊', song: 'ثاء... ثاء... ثعلب ذكي وماهر' },
  { letter: 'ج', letterName: 'جيم', emoji: '🐪', song: 'جيم... جيم... جمل يمشي في الصحراء' },

  { letter: 'ح', letterName: 'حاء', emoji: '🐎', song: 'حاء... حاء... حصان يجري بسرعة' },
  { letter: 'خ', letterName: 'خاء', emoji: '🍞', song: 'خاء... خاء... خبز ساخن ولذيذ' },
  { letter: 'د', letterName: 'دال', emoji: '🐻', song: 'دال... دال... دب لطيف يحب العسل' },
  { letter: 'ذ', letterName: 'ذال', emoji: '🐺', song: 'ذال... ذال... ذئب يعيش في الغابة' },
  { letter: 'ر', letterName: 'راء', emoji: '🌹', song: 'راء... راء... وردة جميلة في الحديقة' },

  { letter: 'ز', letterName: 'زاي', emoji: '🦒', song: 'زاي... زاي... زرافة طويلة الرقبة' },
  { letter: 'س', letterName: 'سين', emoji: '🐟', song: 'سين... سين... سمكة تسبح في البحر' },
  { letter: 'ش', letterName: 'شين', emoji: '☀️', song: 'شين... شين... شمس تضيء السماء' },
  { letter: 'ص', letterName: 'صاد', emoji: '🦅', song: 'صاد... صاد... صقر يطير عاليًا' },
  { letter: 'ض', letterName: 'ضاد', emoji: '🐸', song: 'ضاد... ضاد... ضفدع يقفز في الماء' },

  { letter: 'ط', letterName: 'طاء', emoji: '✈️', song: 'طاء... طاء... طائرة تطير في السماء' },
  { letter: 'ظ', letterName: 'ظاء', emoji: '🦌', song: 'ظاء... ظاء... ظبي سريع في الصحراء' },
  { letter: 'ع', letterName: 'عين', emoji: '👁️', song: 'عين... عين... عين ترى الأشياء' },
  { letter: 'غ', letterName: 'غين', emoji: '☁️', song: 'غين... غين... غيمة تمطر في السماء' },
  { letter: 'ف', letterName: 'فاء', emoji: '🐘', song: 'فاء... فاء... فيل ضخم وقوي' },

  { letter: 'ق', letterName: 'قاف', emoji: '🌙', song: 'قاف... قاف... قمر ينير الليل' },
  { letter: 'ك', letterName: 'كاف', emoji: '📚', song: 'كاف... كاف... كتاب مليء بالعلم' },
  { letter: 'ل', letterName: 'لام', emoji: '🦁', song: 'لام... لام... ليث قوي في الغابة' },
  { letter: 'م', letterName: 'ميم', emoji: '🍌', song: 'ميم... ميم... موز أصفر لذيذ' },
  { letter: 'ن', letterName: 'نون', emoji: '⭐', song: 'نون... نون... نجم يلمع في السماء' },

  { letter: 'ه', letterName: 'هاء', emoji: '🌙', song: 'هاء... هاء... هلال جميل في السماء' },
  { letter: 'و', letterName: 'واو', emoji: '🌹', song: 'واو... واو... وردة حمراء جميلة' },
  { letter: 'ي', letterName: 'ياء', emoji: '🕊️', song: 'ياء... ياء... يمامة تطير في السماء' }
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
