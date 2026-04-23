import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { playUISound } from '@/lib/audioManager';
import CelebrationConfetti from './CelebrationConfetti';
import SadFeedback from './SadFeedback';

interface GameItem {
  word: string;
  missingIndex: number;
  options: string[];
  correctAnswer: string;
}

/**
 * Missing Letter Game
 * Design: Playful & Vibrant
 * - Show a word with a blank
 * - Choose from 3 letter options to complete it
 */

const GAME_ITEMS: GameItem[] = [
  {
    word: 'رنب_',
    missingIndex: 2,
    options: ['أ', 'ب', 'ت'],
    correctAnswer: 'أ',
  },
  {
    word: 'يت _ ',
    missingIndex: 3,
    options: ['ب', 'ن', 'س'],
    correctAnswer: 'ب',
  },
  {
    word: 'ك_اب',
    missingIndex: 1,
    options: ['ت', 'ب', 'م'],
    correctAnswer: 'ت',
  },
  {
    word: 'وز_',
    missingIndex: 2,
    options: ['م', 'ب', 'ن'],
    correctAnswer: 'م',
  },
  {
    word: '_مل',
    missingIndex: 0,
    options: ['ج', 'ر', 'ح'],
    correctAnswer: 'ح',
  },
  {
    word: 'ق_م',
    missingIndex: 1,
    options: ['ل', 'ر', 'ب'],
    correctAnswer: 'ل',
  },
  {
    word: 'مك_',
    missingIndex: 2,
    options: ['س', 'د', 'ر'],
    correctAnswer: 'س',
  },
  {
    word: '_رم',
    missingIndex: 0,
    options: ['ك', 'ن', 'ل'],
    correctAnswer: 'ل',
  },
  {
    word: 'ش_س',
    missingIndex: 1,
    options: ['م', 'ن', 'ب'],
    correctAnswer: 'م',
  },
  {
    word: 'وت_',
    missingIndex: 2,
    options: ['ح', 'خ', 'ج'],
    correctAnswer: 'ح',
  },
  {
    word: '_هر',
    missingIndex: 0,
    options: ['ه', 'ل', 'م'],
    correctAnswer: 'ه',
  },
  {
    word: 'أر_',
    missingIndex: 2,
    options: ['ف', 'ق', 'ك'],
    correctAnswer: 'ف',
  },
  {
    word: 'اب_',
    missingIndex: 2,
    options: ['ب', 'ت', 'م'],
    correctAnswer: 'ب',
  },
  {
    word: 'د_ب',
    missingIndex: 1,
    options: ['ب', 'ي', 'و'],
    correctAnswer: 'ب',
  },
  {
    word: 'أس_',
    missingIndex: 2,
    options: ['ر', 'ز', 'س'],
    correctAnswer: 'ر',
  },
  {
    word: 'يف _',
    missingIndex: 3,
    options: ['س', 'ن', 'ب'],
    correctAnswer: 'س',
  },
  {
    word: 'ائر_',
    missingIndex: 2,
    options: ['ط', 'ظ', 'د'],
    correctAnswer: 'ط',
  },
  {
    word: '_ين',
    missingIndex: 0,
    options: ['ع', 'م', 'ر'],
    correctAnswer: 'ع',
  },
  {
    word: 'ل_ب',
    missingIndex: 1,
    options: ['ع', 'و', 'ي'],
    correctAnswer: 'ع',
  },
  {
    word: 'هب_',
    missingIndex: 2,
    options: ['ذ', 'ز', 'د'],
    correctAnswer: 'ذ',
  },
  {
    word: '_ور',
    missingIndex: 0,
    options: ['ث', 'ن', 'م'],
    correctAnswer: 'ث',
  },
  {
    word: 'غ_م',
    missingIndex: 1,
    options: ['ي', 'و', 'ا'],
    correctAnswer: 'ي',
  },
  {
    word: 'بر_',
    missingIndex: 2,
    options: ['ص', 'ض', 'س'],
    correctAnswer: 'ص',
  },
  {
    word: '_رب',
    missingIndex: 0,
    options: ['ض', 'م', 'ن'],
    correctAnswer: 'ض',
  },
  {
    word: 'ز_ر',
    missingIndex: 1,
    options: ['ه', 'ي', 'و'],
    correctAnswer: 'ه',
  },
  {
    word: 'ك_ب',
    missingIndex: 1,
    options: ['ت', 'ث', 'ج'],
    correctAnswer: 'ت',
  },
  {
    word: 'ج_ل',
    missingIndex: 1,
    options: ['م', 'ن', 'د'],
    correctAnswer: 'م',
  },
  {
    word: 'س_م',
    missingIndex: 1,
    options: ['ل', 'ي', 'ا'],
    correctAnswer: 'ل',
  },
  {
    word: 'ن_ر',
    missingIndex: 1,
    options: ['ه', 'م', 'ا'],
    correctAnswer: 'ه',
  },
  {
    word: 'ف_ر',
    missingIndex: 1,
    options: ['أ', 'و', 'ي'],
    correctAnswer: 'أ',
  },
  {
    word: 'ر_س',
    missingIndex: 1,
    options: ['أ', 'و', 'ي'],
    correctAnswer: 'أ',
  },
  {
    word: 'س_ف',
    missingIndex: 1,
    options: ['ي', 'و', 'ا'],
    correctAnswer: 'ي',
  },
];
export default function MissingLetter() {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showSadFeedback, setShowSadFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const currentItem = GAME_ITEMS[currentItemIndex];
  const shuffledOptions = [...currentItem.options].sort(() => Math.random() - 0.5);

  const handleLetterClick = (letter: string) => {
    if (selectedLetter || feedback) return;

    setSelectedLetter(letter);
    setAttempts(attempts + 1);

    if (letter === currentItem.correctAnswer) {
      setFeedback('correct');
      setScore(score + 1);
      playUISound('success');
      setTimeout(() => {
        nextRound();
      }, 1500);
    } else {
      setFeedback('incorrect');
      setShowSadFeedback(true);
      playUISound('error');
      setTimeout(() => {
        setShowSadFeedback(false);
        setTimeout(() => {
          setSelectedLetter(null);
          setFeedback(null);
        }, 300);
      }, 1500);
    }
  };

  const nextRound = () => {
    if (currentItemIndex < GAME_ITEMS.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
      setSelectedLetter(null);
      setFeedback(null);
    } else {
      // Game completed, restart
      setCurrentItemIndex(0);
      setSelectedLetter(null);
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
    setSelectedLetter(null);
    setFeedback(null);
    setShowSadFeedback(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] gap-8">
      {feedback === 'correct' && <CelebrationConfetti />}
      {showSadFeedback && <SadFeedback />}
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

      {/* Title */}
      <h2 className="text-4xl font-bold text-[#2D1B3D]">أكمل الكلمة</h2>

      {/* Word Display */}
      <div className="text-6xl font-bold text-[#2D1B3D] tracking-widest">
        {currentItem.word}
      </div>

      {/* Instruction */}
      <p className="text-xl text-[#7A6B8F] font-poppins text-center">
        اختر الحرف الصحيح لإكمال الكلمة
      </p>

      {/* Letter Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
        {shuffledOptions.map((letter, index) => {
          const colors = ['#FFD93D', '#4ECDC4', '#B8A8FF'];
          const isSelected = selectedLetter === letter;
          const isCorrect = feedback === 'correct' && isSelected;
          const isIncorrect = feedback === 'incorrect' && isSelected;

          return (
            <button
              key={index}
              onClick={() => handleLetterClick(letter)}
              disabled={feedback !== null}
              className={`
                p-6 rounded-2xl text-5xl font-bold transition-all duration-300
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
              {letter}
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
