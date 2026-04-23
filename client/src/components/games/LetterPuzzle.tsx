import { useState, useEffect } from 'react';
import { ARABIC_LETTERS } from '@/lib/arabicLetters';
import { playUISound } from '@/lib/audioManager';
import CelebrationConfetti from './CelebrationConfetti';

/**
 * Letter Puzzle Game - Word Completion
 * Design: Playful & Vibrant
 * - Show a word with missing letter
 * - Choose the correct letter to complete it
 * - RTL text direction support
 */

interface WordPuzzle {
  word: string;
  missingIndex: number;
  options: string[];
  correctAnswer: string;
}

export default function LetterPuzzle() {
  const [currentPuzzle, setCurrentPuzzle] = useState<WordPuzzle | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Arabic words with missing letters
  /*const WORDS = [
    { word: 'كتاب', missingIndex: 0 },
    { word: 'باب', missingIndex: 1 },
    { word: 'قمر', missingIndex: 2 },
    { word: 'نور', missingIndex: 0 },
    { word: 'ماء', missingIndex: 1 },
    { word: 'حرف', missingIndex: 2 },
    { word: 'بيت', missingIndex: 0 },
    { word: 'شمس', missingIndex: 1 },
    { word: 'نجم', missingIndex: 2 },
    { word: 'أرض', missingIndex: 1 },
  ];*/
   const WORDS = [
    { word: 'كتاب', missingIndex: 0 },
    { word: 'باب', missingIndex: 1 },
    { word: 'قمر', missingIndex: 2 },
    { word: 'نور', missingIndex: 0 },
    { word: 'ماء', missingIndex: 1 },
    { word: 'حرف', missingIndex: 2 },
    { word: 'بيت', missingIndex: 0 },
    { word: 'شمس', missingIndex: 1 },
    { word: 'نجم', missingIndex: 2 },
    { word: 'أرض', missingIndex: 1 },

    { word: 'ولد', missingIndex: 0 },
    { word: 'بنت', missingIndex: 1 },
    { word: 'عين', missingIndex: 2 },
    { word: 'يد', missingIndex: 0 },
    { word: 'فم', missingIndex: 1 },
    { word: 'رأس', missingIndex: 2 },
    { word: 'قلم', missingIndex: 0 },
    { word: 'دفتر', missingIndex: 2 },
    { word: 'مدرسة', missingIndex: 3 },
    { word: 'فصل', missingIndex: 1 },

    { word: 'بحر', missingIndex: 0 },
    { word: 'نهر', missingIndex: 1 },
    { word: 'جبل', missingIndex: 2 },
    { word: 'سهل', missingIndex: 1 },
    { word: 'وادي', missingIndex: 2 },
    { word: 'شجرة', missingIndex: 3 },
    { word: 'وردة', missingIndex: 1 },
    { word: 'زهرة', missingIndex: 2 },
    { word: 'عشب', missingIndex: 0 },
    { word: 'غابة', missingIndex: 2 },

    { word: 'تفاح', missingIndex: 0 },
    { word: 'موز', missingIndex: 1 },
    { word: 'عنب', missingIndex: 2 },
    { word: 'تمر', missingIndex: 1 },
    { word: 'خبز', missingIndex: 0 },
    { word: 'لبن', missingIndex: 1 },
    { word: 'ماء', missingIndex: 2 },
    { word: 'عسل', missingIndex: 0 },
    { word: 'سكر', missingIndex: 1 },
    { word: 'ملح', missingIndex: 2 },

    { word: 'سيارة', missingIndex: 0 },
    { word: 'قطار', missingIndex: 2 },
    { word: 'طائرة', missingIndex: 1 },
    { word: 'دراجة', missingIndex: 3 },
    { word: 'شارع', missingIndex: 1 },
    { word: 'طريق', missingIndex: 2 },
    { word: 'مدينة', missingIndex: 0 },
    { word: 'قرية', missingIndex: 2 },
    { word: 'بيت', missingIndex: 1 },
    { word: 'باب', missingIndex: 0 }
  ];

  // Generate new puzzle
  const generatePuzzle = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    const correctLetter = randomWord.word[randomWord.missingIndex];

    // Generate wrong options
    const wrongOptions = ARABIC_LETTERS
      .filter(l => l.letter !== correctLetter)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(l => l.letter);

    const allOptions = [correctLetter, ...wrongOptions].sort(
      () => Math.random() - 0.5
    );

    setCurrentPuzzle({
      word: randomWord.word,
      missingIndex: randomWord.missingIndex,
      options: allOptions,
      correctAnswer: correctLetter,
    });

    setFeedback(null);
    setSelectedAnswer(null);
  };

  // Initialize game
  useEffect(() => {
    generatePuzzle();
  }, []);

  // Handle answer selection
  const handleSelectAnswer = (answer: string) => {
    if (feedback) return;

    setSelectedAnswer(answer);
    setAttempts(attempts + 1);

    if (answer === currentPuzzle?.correctAnswer) {
      setFeedback('correct');
      setScore(score + 1);
      playUISound('success');
      setTimeout(() => generatePuzzle(), 1500);
    } else {
      setFeedback('wrong');
      playUISound('error');
      setTimeout(() => generatePuzzle(), 1500);
    }
  };

  if (!currentPuzzle) {
    return <div>جاري التحميل...</div>;
  }

  // Build word display with blank
  const wordLetters = currentPuzzle.word.split('');

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFFBF5] to-[#F8F3FF] py-8">
      {feedback === 'correct' && <CelebrationConfetti />}
      <div className="container max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#2D1B3D] mb-2">
            🧩 أكمل الكلمة
          </h2>
          <p className="text-[#7A6B8F] font-poppins">
            اختر الحرف الناقص لإكمال الكلمة
          </p>
        </div>

        {/* Score */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 text-center shadow-md border-2 border-[#4ECDC4]">
            <p className="text-[#7A6B8F] font-poppins text-sm">الإجابات الصحيحة</p>
            <p className="text-3xl font-bold text-[#4ECDC4]">{score}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-md border-2 border-[#FFD93D]">
            <p className="text-[#7A6B8F] font-poppins text-sm">المحاولات</p>
            <p className="text-3xl font-bold text-[#FFD93D]">{attempts}</p>
          </div>
        </div>

        {/* Word Display */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#B8A8FF] mb-8">
          <div className="text-center">
            <p className="text-[#7A6B8F] font-poppins text-sm mb-4">
              أكمل الكلمة:
            </p>

            {/* Word with blank space - RTL */}
            <div className="flex justify-center gap-2 mb-8 flex-row-reverse">
              {wordLetters.map((letter, index) => (
                <div
                  key={index}
                  className={`
                    w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold
                    ${
                      index === currentPuzzle.missingIndex
                        ? 'bg-[#FFD93D]/20 border-4 border-dashed border-[#FFD93D]'
                        : 'bg-[#4ECDC4]/20 border-4 border-[#4ECDC4] text-[#2D1B3D]'
                    }
                  `}
                >
                  {index !== currentPuzzle.missingIndex ? letter : '?'}
                </div>
              ))}
            </div>

            {/* Feedback */}
            {feedback && (
              <div
                className={`
                  text-2xl font-bold mb-6 animate-bounce
                  ${
                    feedback === 'correct'
                      ? 'text-[#4ECDC4]'
                      : 'text-[#FF6B5B]'
                  }
                `}
              >
                {feedback === 'correct' ? '✓ ممتاز!' : '✗ حاول مرة أخرى'}
              </div>
            )}
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {currentPuzzle.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(option)}
              disabled={feedback !== null}
              className={`
                py-6 rounded-2xl font-bold text-2xl transition-all duration-300
                ${
                  selectedAnswer === option
                    ? feedback === 'correct'
                      ? 'bg-[#4ECDC4] text-white shadow-lg scale-105'
                      : 'bg-[#FF6B5B] text-white shadow-lg scale-95'
                    : 'bg-white text-[#2D1B3D] border-4 border-[#E8D4E8] hover:border-[#4ECDC4] hover:shadow-lg'
                }
                ${feedback ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {/* New Game Button */}
        <button
          onClick={() => {
            setScore(0);
            setAttempts(0);
            generatePuzzle();
          }}
          className="w-full py-4 bg-[#FF6B5B] text-white rounded-2xl font-bold font-poppins hover:shadow-lg transition-all duration-200"
        >
          🔄 لعبة جديدة
        </button>
      </div>
    </div>
  );
}
