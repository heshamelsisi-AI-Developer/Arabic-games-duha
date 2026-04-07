import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { playUISound } from '@/lib/audioManager';
import CelebrationConfetti from './CelebrationConfetti';

interface GameItem {
  word: string;
  letters: string[];
  wordMeaning?: string;
}

/**
 * Word Builder Game - Enhanced Version
 * Design: Playful & Vibrant
 * - Large, colorful display with connected letters
 * - RTL support for proper Arabic display
 * - Multiple rounds with different words
 */

/*const GAME_ITEMS: GameItem[] = [
  { word: 'كتب', letters: ['ب', 'ك', 'ت'] },
  { word: 'قلم', letters: ['م', 'ق', 'ل'] },
  { word: 'باب', letters: ['ب', 'ا', 'ب'] },
  { word: 'نور', letters: ['ر', 'ن', 'و'] },
  { word: 'حمار', letters: ['ر', 'ح', 'ا', 'م'] },
  { word: 'ماء', letters: ['ء', 'ا', 'م'] },
  { word: 'ورقة', letters: ['ة', 'ق', 'ر', 'و'] },
  { word: 'بيت', letters: ['ت', 'ي', 'ب'] },
];*/
const GAME_ITEMS: GameItem[] = [
  { word: 'كتب', letters: ['ت', 'ب', 'ك'], wordMeaning: 'كتب' },
  { word: 'قلم', letters: ['ل', 'م', 'ق'], wordMeaning: 'قلم' },
  { word: 'باب', letters: ['ا', 'ب', 'ب'], wordMeaning: 'باب' },
  { word: 'نور', letters: ['و', 'ر', 'ن'], wordMeaning: 'نور' },
  { word: 'حمار', letters: ['م', 'ر', 'ح', 'ا'], wordMeaning: 'حمار' },

  { word: 'بيت', letters: ['ت', 'ب', 'ي'], wordMeaning: 'بيت' },
  { word: 'شمس', letters: ['م', 'س', 'ش'], wordMeaning: 'شمس' },
  { word: 'نجم', letters: ['ج', 'ن', 'م'], wordMeaning: 'نجم' },
  { word: 'أرض', letters: ['ض', 'أ', 'ر'], wordMeaning: 'أرض' },
  { word: 'سماء', letters: ['ء', 'س', 'م', 'ا'], wordMeaning: 'سماء' },

  { word: 'ماء', letters: ['ء', 'م', 'ا'], wordMeaning: 'ماء' },
  { word: 'قمر', letters: ['ر', 'م', 'ق'], wordMeaning: 'قمر' },
  { word: 'نهر', letters: ['ه', 'ر', 'ن'], wordMeaning: 'نهر' },
  { word: 'بحر', letters: ['ر', 'ب', 'ح'], wordMeaning: 'بحر' },
  { word: 'جبل', letters: ['ل', 'ج', 'ب'], wordMeaning: 'جبل' },

  { word: 'تفاح', letters: ['ح', 'ف', 'ت', 'ا'], wordMeaning: 'تفاح' },
  { word: 'موز', letters: ['ز', 'م', 'و'], wordMeaning: 'موز' },
  { word: 'عنب', letters: ['ن', 'ب', 'ع'], wordMeaning: 'عنب' },
  { word: 'تمر', letters: ['ر', 'ت', 'م'], wordMeaning: 'تمر' },
  { word: 'لبن', letters: ['ن', 'ل', 'ب'], wordMeaning: 'لبن' },

  { word: 'سيارة', letters: ['ر', 'ة', 'س', 'ي', 'ا'], wordMeaning: 'سيارة' },
  { word: 'قطار', letters: ['ر', 'ا', 'ق', 'ط'], wordMeaning: 'قطار' },
  { word: 'طائرة', letters: ['ئ', 'ط', 'ا', 'ر', 'ة'], wordMeaning: 'طائرة' },
  { word: 'دراجة', letters: ['ج', 'ة', 'ر', 'د', 'ا'], wordMeaning: 'دراجة' },
  { word: 'شارع', letters: ['ع', 'ش', 'ا', 'ر'], wordMeaning: 'شارع' },
  { word: 'ولد', letters: ['د', 'و', 'ل'], wordMeaning: 'ولد' },
  { word: 'بنت', letters: ['ت', 'ب', 'ن'], wordMeaning: 'بنت' },
  { word: 'عين', letters: ['ن', 'ع', 'ي'], wordMeaning: 'عين' },
  { word: 'يد', letters: ['د', 'ي'], wordMeaning: 'يد' },
  { word: 'فم', letters: ['م', 'ف'], wordMeaning: 'فم' },

  { word: 'رأس', letters: ['س', 'ر', 'أ'], wordMeaning: 'رأس' },
  { word: 'قطة', letters: ['ة', 'ق', 'ط'], wordMeaning: 'قطة' },
  { word: 'كلب', letters: ['ب', 'ك', 'ل'], wordMeaning: 'كلب' },
  { word: 'حصان', letters: ['ن', 'ص', 'ح', 'ا'], wordMeaning: 'حصان' },
  { word: 'أسد', letters: ['د', 'أ', 'س'], wordMeaning: 'أسد' },

  { word: 'فيل', letters: ['ل', 'ف', 'ي'], wordMeaning: 'فيل' },
  { word: 'دجاجة', letters: ['ة', 'ج', 'د', 'ا', 'ج'], wordMeaning: 'دجاجة' },
  { word: 'بطريق', letters: ['ق', 'ط', 'ر', 'ب', 'ي'], wordMeaning: 'بطريق' },
  { word: 'سمك', letters: ['ك', 'س', 'م'], wordMeaning: 'سمك' },
  { word: 'عصفور', letters: ['ر', 'ف', 'ع', 'ص', 'و'], wordMeaning: 'عصفور' },

  { word: 'كتاب', letters: ['ب', 'ك', 'ت', 'ا'], wordMeaning: 'كتاب' },
  { word: 'دفتر', letters: ['ر', 'ف', 'ت', 'د'], wordMeaning: 'دفتر' },
  { word: 'مدرسة', letters: ['ة', 'ر', 'س', 'م', 'د'], wordMeaning: 'مدرسة' },
  { word: 'فصل', letters: ['ل', 'ص', 'ف'], wordMeaning: 'فصل' },
  { word: 'سبورة', letters: ['ة', 'ب', 'س', 'و', 'ر'], wordMeaning: 'سبورة' },

  { word: 'كرسي', letters: ['ي', 'ك', 'ر', 'س'], wordMeaning: 'كرسي' },
  { word: 'طاولة', letters: ['ة', 'ل', 'ا', 'و', 'ط'], wordMeaning: 'طاولة' },
  { word: 'باب', letters: ['ب', 'ا', 'ب'], wordMeaning: 'باب' },
  { word: 'مفتاح', letters: ['ح', 'ت', 'م', 'ا', 'ف'], wordMeaning: 'مفتاح' },
  { word: 'ساعة', letters: ['ة', 'س', 'ا', 'ع'], wordMeaning: 'ساعة' },

  { word: 'شجرة', letters: ['ة', 'ج', 'ش', 'ر'], wordMeaning: 'شجرة' },
  { word: 'وردة', letters: ['ة', 'ر', 'و', 'د'], wordMeaning: 'وردة' },
  { word: 'زهرة', letters: ['ة', 'ز', 'ه', 'ر'], wordMeaning: 'زهرة' },
  { word: 'عشب', letters: ['ب', 'ع', 'ش'], wordMeaning: 'عشب' },
  { word: 'غابة', letters: ['ة', 'غ', 'ا', 'ب'], wordMeaning: 'غابة' }
  
];


const LETTER_COLORS = ['#FFD93D', '#4ECDC4', '#B8A8FF', '#FF6B5B', '#FF9999', '#99CCFF'];

export default function WordBuilder() {
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const currentItem = GAME_ITEMS[currentRound % GAME_ITEMS.length];

  // Initialize round
  useEffect(() => {
    const shuffled = [...currentItem.letters].sort(() => Math.random() - 0.5);
    setAvailableLetters(shuffled);
    setSelectedLetters([]);
    setFeedback(null);
  }, [currentRound]);

  const handleLetterClick = (letter: string, index: number) => {
    if (feedback) return;

    // Add to selected
    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);

    // Remove from available
    const newAvailable = availableLetters.filter((_, i) => i !== index);
    setAvailableLetters(newAvailable);

    setAttempts(attempts + 1);

    // Check if word is complete
    if (newSelected.join('') === currentItem.word) {
      setFeedback('correct');
      setScore(score + 1);
      playUISound('success');
      setTimeout(() => {
        nextRound();
      }, 1500);
    } else if (newSelected.length === currentItem.word.length) {
      // Wrong word formed
      setFeedback('incorrect');
      playUISound('error');
      setTimeout(() => {
        resetRound();
      }, 1000);
    }
  };

  const handleRemoveLetter = (index: number) => {
    const letter = selectedLetters[index];
    const newSelected = selectedLetters.filter((_, i) => i !== index);
    setSelectedLetters(newSelected);
    setAvailableLetters([...availableLetters, letter]);
  };

  const resetRound = () => {
    const shuffled = [...currentItem.letters].sort(() => Math.random() - 0.5);
    setAvailableLetters(shuffled);
    setSelectedLetters([]);
    setFeedback(null);
  };

  const nextRound = () => {
    setCurrentRound(currentRound + 1);
  };

  const handleSkip = () => {
    nextRound();
  };

  const handleReset = () => {
    setScore(0);
    setAttempts(0);
    setCurrentRound(0);
    resetRound();
  };

  // Get color for each letter position
  const getLetterColor = (index: number) => {
    return LETTER_COLORS[index % LETTER_COLORS.length];
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFFBF5] to-[#F8F3FF] p-8">
      {feedback === 'correct' && <CelebrationConfetti />}
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-[#FFD93D] text-[#2D1B3D] rounded-full font-bold hover:shadow-lg transition-all"
          >
            <RotateCcw size={20} className="inline mr-2" />
            إعادة تعيين
          </button>
          <h1 className="text-4xl font-bold text-[#2D1B3D]">🏗️ بناء الكلمة</h1>
          <div className="text-right">
            <p className="text-sm text-[#7A6B8F]">النقاط</p>
            <p className="text-3xl font-bold text-[#4ECDC4]">{score}</p>
          </div>
        </div>

        {/* Round Info */}
        <div className="text-center mb-8">
          <p className="text-lg text-[#7A6B8F] font-cairo">الجولة: {(currentRound % GAME_ITEMS.length) + 1} / {GAME_ITEMS.length}</p>
          <p className="text-3xl font-bold text-[#FF6B5B] mt-4 font-cairo">{currentItem.word}</p>
        </div>

        {/* Target Word Display - Large and Prominent */}
        <div className="bg-gradient-to-r from-[#FFD93D]/30 to-[#4ECDC4]/30 rounded-3xl p-12 mb-12 border-4 border-[#B8A8FF] shadow-xl">
          <p className="text-center text-sm text-[#7A6B8F] mb-6 font-cairo">اضغط على الحروف لبناء الكلمة:</p>
          
          {/* Word Display Area */}
          <div className="bg-white rounded-2xl p-8 mb-6 min-h-[120px] flex items-center justify-center">
            {selectedLetters.length === 0 ? (
              <p className="text-[#B8A8FF] text-2xl font-cairo">ابدأ بالاختيار...</p>
            ) : (
              <div className="flex gap-2 flex-row-reverse items-center justify-center flex-wrap">
                {selectedLetters.map((letter, index) => (
                  <button
                    key={index}
                    onClick={() => handleRemoveLetter(index)}
                    className="transition-all duration-200 hover:scale-110 shadow-lg rounded-xl px-4 py-2 cursor-pointer transform hover:shadow-2xl"
                    style={{
                      backgroundColor: getLetterColor(index),
                      color: 'white',
                      fontSize: '48px',
                      fontWeight: 'bold',
                      minWidth: '70px',
                      minHeight: '70px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Cairo, sans-serif'
                    }}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hint */}
          <p className="text-center text-sm text-[#7A6B8F] font-cairo">
            اضغط على الحرف لإزالته من الكلمة
          </p>
        </div>

        {/* Available Letters */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border-2 border-[#E8D4E8]">
          <p className="text-center text-lg font-bold text-[#2D1B3D] mb-6 font-cairo">الحروف المتاحة</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {availableLetters.map((letter, index) => {
              const color = getLetterColor(index);
              return (
                <button
                  key={index}
                  onClick={() => handleLetterClick(letter, index)}
                  disabled={feedback !== null}
                  className="transition-all duration-200 hover:scale-110 shadow-lg rounded-2xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
                  style={{
                    backgroundColor: color,
                    color: 'white',
                    fontSize: '40px',
                    fontWeight: 'bold',
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Cairo, sans-serif',
                    border: 'none',
                    cursor: feedback ? 'not-allowed' : 'pointer'
                  }}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div className="text-center mb-8 animate-bounce">
            <div
              className={`text-4xl font-bold font-cairo inline-block px-8 py-4 rounded-2xl ${
                feedback === 'correct'
                  ? 'bg-[#4ECDC4] text-white shadow-lg'
                  : 'bg-[#FF6B5B] text-white shadow-lg'
              }`}
            >
              {feedback === 'correct' ? '✓ ممتاز!' : '✗ حاول مرة أخرى'}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={handleSkip}
            className="px-8 py-3 bg-[#B8A8FF] text-white rounded-full font-bold font-cairo text-lg hover:bg-[#A89AFF] transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            تخطي
          </button>
          <button
            onClick={resetRound}
            className="px-8 py-3 bg-[#4ECDC4] text-white rounded-full font-bold font-cairo text-lg hover:bg-[#3DB8B0] transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            إعادة المحاولة
          </button>
        </div>

        {/* Stats */}
        <div className="mt-12 text-center">
          <p className="text-lg text-[#7A6B8F] font-cairo">المحاولات: {attempts}</p>
        </div>

        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce {
            animation: bounce 0.6s ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
}
