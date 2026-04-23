import { useState, useEffect } from 'react';
import { Volume2, RotateCcw } from 'lucide-react';
import { playUISound } from '@/lib/audioManager';
import CelebrationConfetti from './CelebrationConfetti';

interface GameItem {
  letter: string;
  letterName: string;
  correctImage: string;
  correctImageName: string;
  options: Array<{ image: string; name: string; isCorrect: boolean }>;
}

/**
 * Sound & Picture Match Game
 * Design: Playful & Vibrant
 * - Play letter sound
 * - Show 3 images
 * - Click the image that starts with the letter
 */

const GAME_ITEMS: GameItem[] = [
  {
    letter: 'أ',
    letterName: 'ألف',
    correctImage: '🐰',
    correctImageName: 'أرنب (Rabbit)',
    options: [
      { image: '🍎', name: 'تفاح', isCorrect: false },
      { image: '🐰', name: 'أرنب', isCorrect: true },
      { image: '🚗', name: 'سيارة', isCorrect: false },
    ],
  },
  {
    letter: 'ب',
    letterName: 'باء',
    correctImage: '🦆',
    correctImageName: 'بطة (Duck)',
    options: [
      { image: '🦆', name: 'بطة', isCorrect: true },
      { image: '🍎', name: 'تفاح', isCorrect: false },
      { image: '🐱', name: 'قطة', isCorrect: false },
    ],
  },
  {
    letter: 'ت',
    letterName: 'تاء',
    correctImage: '🍎',
    correctImageName: 'تفاح (Apple)',
    options: [
      { image: '🍎', name: 'تفاح', isCorrect: true },
      { image: '🚗', name: 'سيارة', isCorrect: false },
      { image: '🐶', name: 'كلب', isCorrect: false },
    ],
  },
  {
    letter: 'ث',
    letterName: 'ثاء',
    correctImage: '🐂',
    correctImageName: 'ثور (Bull)',
    options: [
      { image: '🐂', name: 'ثور', isCorrect: true },
      { image: '🍌', name: 'موز', isCorrect: false },
      { image: '🐱', name: 'قطة', isCorrect: false },
    ],
  },
  {
    letter: 'ج',
    letterName: 'جيم',
    correctImage: '🐪',
    correctImageName: 'جمل (Camel)',
    options: [
      { image: '🐪', name: 'جمل', isCorrect: true },
      { image: '🍎', name: 'تفاح', isCorrect: false },
      { image: '🚗', name: 'سيارة', isCorrect: false },
    ],
  },
  {
    letter: 'ح',
    letterName: 'حاء',
    correctImage: '🐎',
    correctImageName: 'حصان (Horse)',
    options: [
      { image: '🐎', name: 'حصان', isCorrect: true },
      { image: '🍌', name: 'موز', isCorrect: false },
      { image: '🚗', name: 'سيارة', isCorrect: false },
    ],
  },
  {
    letter: 'خ',
    letterName: 'خاء',
    correctImage: '🍞',
    correctImageName: 'خبز (Bread)',
    options: [
      { image: '🍞', name: 'خبز', isCorrect: true },
      { image: '🐶', name: 'كلب', isCorrect: false },
      { image: '🚗', name: 'سيارة', isCorrect: false },
    ],
  },
  {
    letter: 'د',
    letterName: 'دال',
    correctImage: '🐻',
    correctImageName: 'دب (Bear)',
    options: [
      { image: '🐻', name: 'دب', isCorrect: true },
      { image: '🍎', name: 'تفاح', isCorrect: false },
      { image: '🚗', name: 'سيارة', isCorrect: false },
    ],
  },
  {
    letter: 'ذ',
    letterName: 'ذال',
    correctImage: '🌽',
    correctImageName: 'ذرة (Corn)',
    options: [
      { image: '🌽', name: 'ذرة', isCorrect: true },
      { image: '🐱', name: 'قطة', isCorrect: false },
      { image: '🍎', name: 'تفاح', isCorrect: false },
    ],
  },
  {
    letter: 'ر',
    letterName: 'راء',
    correctImage: '👨',
    correctImageName: 'رجل (Man)',
    options: [
      { image: '🍎', name: 'تفاح', isCorrect: false },
      { image: '👨', name: 'رجل', isCorrect: true },
      { image: '🐶', name: 'كلب', isCorrect: false },
    ],
  },
  {
    letter: 'ز',
    letterName: 'زاي',
    correctImage: '🦒',
    correctImageName: 'زرافة (Giraffe)',
    options: [
      { image: '🦒', name: 'زرافة', isCorrect: true },
      { image: '🍌', name: 'موز', isCorrect: false },
      { image: '🐱', name: 'قطة', isCorrect: false },
    ],
  },
  {
    letter: 'س',
    letterName: 'سين',
    correctImage: '🚗',
    correctImageName: 'سيارة (Car)',
    options: [
      { image: '🚗', name: 'سيارة', isCorrect: true },
      { image: '🍎', name: 'تفاح', isCorrect: false },
      { image: '🐶', name: 'كلب', isCorrect: false },
    ],
  },
  {
    letter: 'ش',
    letterName: 'شين',
    correctImage: '☀️',
    correctImageName: 'شمس (Sun)',
    options: [
      { image: '☀️', name: 'شمس', isCorrect: true },
      { image: '🍎', name: 'تفاح', isCorrect: false },
      { image: '🚗', name: 'سيارة', isCorrect: false },
    ],
  },
  {
    letter: 'ص',
    letterName: 'صاد',
    correctImage: '📦',
    correctImageName: 'صندوق (Box)',
    options: [
      { image: '📦', name: 'صندوق', isCorrect: true },
      { image: '🐱', name: 'قطة', isCorrect: false },
      { image: '🚗', name: 'سيارة', isCorrect: false },
    ],
  },
  {
    letter: 'ض',
    letterName: 'ضاد',
    correctImage: '🐸',
    correctImageName: 'ضفدع (Frog)',
    options: [
      { image: '🐸', name: 'ضفدع', isCorrect: true },
      { image: '🍎', name: 'تفاح', isCorrect: false },
      { image: '🚗', name: 'سيارة', isCorrect: false },
    ],
  },
  {
    letter: 'ط',
    letterName: 'طاء',
    correctImage: '🛫',
    correctImageName: 'طائرة (Airplane)',
    options: [
      { image: '🛫', name: 'طائرة', isCorrect: true },
      { image: '🐶', name: 'كلب', isCorrect: false },
      { image: '🍎', name: 'تفاح', isCorrect: false },
    ],
  },
  {
    letter: 'ظ',
    letterName: 'ظاء',
    correctImage: '🌳',
    correctImageName: 'ظل (Shadow)',
    options: [
      { image: '🌳', name: 'ظل', isCorrect: true },
      { image: '🍌', name: 'موز', isCorrect: false },
      { image: '🚗', name: 'سيارة', isCorrect: false },
    ],
  },
  {
    letter: 'ع',
    letterName: 'عين',
    correctImage: '🐦',
    correctImageName: 'عصفور (Bird)',
    options: [
      { image: '🐦', name: 'عصفور', isCorrect: true },
      { image: '🍎', name: 'تفاح', isCorrect: false },
      { image: '🚗', name: 'سيارة', isCorrect: false },
    ],
  },
  {
    letter: 'غ',
    letterName: 'غين',
    correctImage: '🦌',
    correctImageName: 'غزال (Deer)',
    options: [
      { image: '🦌', name: 'غزال', isCorrect: true },
      { image: '🐱', name: 'قطة', isCorrect: false },
      { image: '🍎', name: 'تفاح', isCorrect: false },
    ],
  },
  {
    letter: 'ف',
    letterName: 'فاء',
    correctImage: '🍓',
    correctImageName: 'فراولة (Strawberry)',
    options: [
      { image: '🍓', name: 'فراولة', isCorrect: true },
      { image: '🚗', name: 'سيارة', isCorrect: false },
      { image: '🐶', name: 'كلب', isCorrect: false },
    ],
  },
  {
    letter: 'ق',
    letterName: 'قاف',
    correctImage: '🐱',
    correctImageName: 'قطة (Cat)',
    options: [
      { image: '🐱', name: 'قطة', isCorrect: true },
      { image: '🍎', name: 'تفاح', isCorrect: false },
      { image: '🚗', name: 'سيارة', isCorrect: false },
    ],
  },
  {
    letter: 'ك',
    letterName: 'كاف',
    correctImage: '🐶',
    correctImageName: 'كلب (Dog)',
    options: [
      { image: '🐶', name: 'كلب', isCorrect: true },
      { image: '🍎', name: 'تفاح', isCorrect: false },
      { image: '🚗', name: 'سيارة', isCorrect: false },
    ],
  },
  {
  letter: 'ل',
  letterName: 'لام',
  correctImage: '🍋',
  correctImageName: 'ليمون (Lemon)',
  options: [
    { image: '🍋', name: 'ليمون', isCorrect: true },
    { image: '🍎', name: 'تفاح', isCorrect: false },
    { image: '🐱', name: 'قطة', isCorrect: false },
    ],
  },
  {
    letter: 'م',
    letterName: 'ميم',
    correctImage: '🍌',
    correctImageName: 'موز (Banana)',
    options: [
      { image: '🍌', name: 'موز', isCorrect: true },
      { image: '🚗', name: 'سيارة', isCorrect: false },
      { image: '🐱', name: 'قطة', isCorrect: false },
    ],
  },
  {
    letter: 'ن',
    letterName: 'نون',
    correctImage: '🐯',
    correctImageName: 'نمر (Tiger)',
    options: [
      { image: '🐯', name: 'نمر', isCorrect: true },
      { image: '🍎', name: 'تفاح', isCorrect: false },
      { image: '🚗', name: 'سيارة', isCorrect: false },
    ],
  },
  {
  letter: 'ه',
  letterName: 'هاء',
  correctImage: '🐦',
  correctImageName: 'هدهد (Hoopoe)',
  options: [
    { image: '🐦', name: 'هدهد', isCorrect: true },
    { image: '🍌', name: 'موز', isCorrect: false },
    { image: '🐱', name: 'قطة', isCorrect: false },
  ],
  },
  {
    letter: 'و',
    letterName: 'واو',
    correctImage: '🌹',
    correctImageName: 'وردة (Rose)',
    options: [
      { image: '🌹', name: 'وردة', isCorrect: true },
      { image: '🍎', name: 'تفاح', isCorrect: false },
      { image: '🚗', name: 'سيارة', isCorrect: false },
    ],
  },
  {
    letter: 'ي',
    letterName: 'ياء',
    correctImage: '🕊️',
    correctImageName: 'يمامة (Dove)',
    options: [
      { image: '🕊️', name: 'يمامة', isCorrect: true },
      { image: '🍌', name: 'موز', isCorrect: false },
      { image: '🚗', name: 'سيارة', isCorrect: false },
    ],
  },
];

export default function SoundPictureMatch() {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentItem = GAME_ITEMS[currentItemIndex];
  const shuffledOptions = [...currentItem.options].sort(() => Math.random() - 0.5);

  const playSound = () => {
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(currentItem.letter);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleImageClick = (option: { image: string; name: string; isCorrect: boolean }) => {
    if (selectedImage || feedback) return;

    setSelectedImage(option.image);
    setAttempts(attempts + 1);

    if (option.isCorrect) {
      setFeedback('correct');
      setScore(score + 1);
      playUISound('success');
      setTimeout(() => {
        nextRound();
      }, 1500);
    } else {
      setFeedback('incorrect');
      playUISound('error');
      setTimeout(() => {
        setSelectedImage(null);
        setFeedback(null);
      }, 1000);
    }
  };

  const nextRound = () => {
    if (currentItemIndex < GAME_ITEMS.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
      setSelectedImage(null);
      setFeedback(null);
    } else {
      // Game completed, restart
      setCurrentItemIndex(0);
      setSelectedImage(null);
      setFeedback(null);
    }
  };

  const handleSkip = () => {
    nextRound();
  };

  const handleReset = () => {
    setScore(0);
    setAttempts(0);
    setCurrentItemIndex(0);
    setSelectedImage(null);
    setFeedback(null);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] gap-8">
      {feedback === 'correct' && <CelebrationConfetti />}
      {/* Score Display */}
      <div className="flex gap-8 mb-4">
        <div className="bg-white rounded-2xl px-6 py-3 shadow-md border-2 border-[#4ECDC4]">
          <p className="text-sm text-[#7A6B8F] font-poppins">الإجابات الصحيحة</p>
          <p className="text-3xl font-bold text-[#4ECDC4]">{score}</p>
        </div>
        <div className="bg-white rounded-2xl px-6 py-3 shadow-md border-2 border-[#FFD93D]">
          <p className="text-sm text-[#7A6B8F] font-poppins">المحاولات</p>
          <p className="text-3xl font-bold text-[#FFD93D]">{attempts}</p>
        </div>
      </div>

      {/* Play Sound Button */}
      <button
        onClick={playSound}
        disabled={isPlaying}
        className="bg-[#FF6B5B] text-white px-8 py-4 rounded-full text-lg font-bold font-poppins hover:bg-[#E55A4A] transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg"
      >
        <Volume2 size={24} />
        {isPlaying ? 'جاري التشغيل...' : 'اسمع الحرف'}
      </button>

      {/* Letter Display */}
      <div className="text-6xl font-bold text-[#2D1B3D]">
        {currentItem.letter}
      </div>

      {/* Instruction */}
      <p className="text-xl text-[#7A6B8F] font-poppins text-center">
        اختر الصورة التي تبدأ بهذا الحرف
      </p>

      {/* Image Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
        {shuffledOptions.map((option, index) => {
          const colors = ['#FFD93D', '#4ECDC4', '#B8A8FF'];
          const isSelected = selectedImage === option.image;
          const isCorrect = feedback === 'correct' && isSelected;
          const isIncorrect = feedback === 'incorrect' && isSelected;

          return (
            <button
              key={index}
              onClick={() => handleImageClick(option)}
              disabled={feedback !== null}
              className={`
                p-6 rounded-2xl transition-all duration-300 flex flex-col items-center gap-3
                ${isCorrect ? 'scale-110 bg-[#4ECDC4] text-white shadow-2xl animate-bounce' : ''}
                ${isIncorrect ? 'bg-[#FF6B5B] text-white animate-shake' : ''}
                ${!isSelected && feedback === null ? `bg-white border-4 hover:scale-105 hover:shadow-lg cursor-pointer shadow-md` : ''}
                ${!isSelected && feedback !== null ? 'opacity-50' : ''}
                ${isSelected && !isCorrect && !isIncorrect ? 'bg-white border-4 border-[#FFD93D]' : ''}
              `}
              style={
                !isSelected && feedback === null
                  ? { borderColor: colors[index], backgroundColor: `${colors[index]}15` }
                  : {}
              }
            >
              <div className="text-6xl">{option.image}</div>
              <p className="text-sm font-poppins font-semibold">{option.name}</p>
            </button>
          );
        })}
      </div>

      {/* Feedback Message */}
      {feedback && (
        <div
          className={`text-2xl font-bold font-poppins animate-fade-in ${
            feedback === 'correct'
              ? 'text-[#4ECDC4]'
              : 'text-[#FF6B5B]'
          }`}
        >
          {feedback === 'correct' ? '✓ ممتاز!' : '✗ حاول مرة أخرى'}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={handleSkip}
          className="px-6 py-3 bg-[#B8A8FF] text-white rounded-full font-bold font-poppins hover:bg-[#A89AFF] transition-all duration-200 hover:shadow-lg"
        >
          تخطي
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-[#FFD93D] text-[#2D1B3D] rounded-full font-bold font-poppins hover:bg-[#FFC91F] transition-all duration-200 hover:shadow-lg flex items-center gap-2"
        >
          <RotateCcw size={18} />
          إعادة تعيين
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-bounce {
          animation: bounce 0.6s ease-in-out;
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
