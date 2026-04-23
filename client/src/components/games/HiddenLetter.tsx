import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { playUISound } from '@/lib/audioManager';
import CelebrationConfetti from './CelebrationConfetti';

interface LetterPosition {
  letter: string;
  x: number;
  y: number;
  found: boolean;
}

/**
 * Hidden Letter Game
 * Design: Playful & Vibrant
 * - Screen filled with random floating letters
 * - Find and click all instances of target letter
 */

/*const GAME_ROUNDS = [
  { targetLetter: 'ا', letterCount: 5 },
  { targetLetter: 'ب', letterCount: 5 },
  { targetLetter: 'ت', letterCount: 5 },
  { targetLetter: 'ث', letterCount: 5 },
  { targetLetter: 'ج', letterCount: 5 },
];

const ALL_LETTERS = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر'];*/
const GAME_ROUNDS = [
  { targetLetter: 'م', letterCount: 5 },
  { targetLetter: 'ب', letterCount: 5 },
  { targetLetter: 'س', letterCount: 5 },
  { targetLetter: 'ا', letterCount: 5 },
  { targetLetter: 'ك', letterCount: 5 },
  { targetLetter: 'ن', letterCount: 5 },
  { targetLetter: 'ر', letterCount: 5 },
  { targetLetter: 'ت', letterCount: 5 },
  { targetLetter: 'ف', letterCount: 5 },
  { targetLetter: 'ل', letterCount: 5 },
  { targetLetter: 'ج', letterCount: 5 },
  { targetLetter: 'و', letterCount: 5 },
  { targetLetter: 'ي', letterCount: 5 },
  { targetLetter: 'د', letterCount: 5 },
  { targetLetter: 'ه', letterCount: 5 },
  { targetLetter: 'ش', letterCount: 5 },
  { targetLetter: 'ق', letterCount: 5 },
  { targetLetter: 'ز', letterCount: 5 },
  { targetLetter: 'ع', letterCount: 5 },
  { targetLetter: 'ص', letterCount: 5 },
  { targetLetter: 'ث', letterCount: 5 },
  { targetLetter: 'ح', letterCount: 5 },
  { targetLetter: 'خ', letterCount: 5 },
  { targetLetter: 'ذ', letterCount: 5 },
  { targetLetter: 'ض', letterCount: 5 },
  { targetLetter: 'ط', letterCount: 5 },
  { targetLetter: 'ظ', letterCount: 5 },
  { targetLetter: 'غ', letterCount: 5 },
];
const ALL_LETTERS = [
  'ا','ب','ت','ث','ج','ح','خ','د','ذ','ر',
  'ز','س','ش','ص','ض','ط','ظ','ع','غ','ف',
  'ق','ك','ل','م','ن','ه','و','ي'
];


export default function HiddenLetter() {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [letters, setLetters] = useState<LetterPosition[]>([]);
  const [score, setScore] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(true);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentRound = GAME_ROUNDS[currentRoundIndex];
  const targetLetter = currentRound.targetLetter;
  const totalTargets = letters.filter(l => l.letter === targetLetter).length;

  // Initialize round
  useEffect(() => {
    generateLetters();
    setFoundCount(0);
    setTimeLeft(30);
    setGameActive(true);
  }, [currentRoundIndex]);

  // Timer
  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameActive]);

  // End game when time runs out
  useEffect(() => {
    if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [timeLeft]);

  const generateLetters = () => {
    const newLetters: LetterPosition[] = [];
    const targetCount = currentRound.letterCount;
    const totalLetters = targetCount * 2;

    // Add target letters
    for (let i = 0; i < targetCount; i++) {
      newLetters.push({
        letter: targetLetter,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 10,
        found: false,
      });
    }

    // Add distractor letters
    for (let i = 0; i < targetCount; i++) {
      const randomLetter = ALL_LETTERS[Math.floor(Math.random() * ALL_LETTERS.length)];
      if (randomLetter !== targetLetter) {
        newLetters.push({
          letter: randomLetter,
          x: Math.random() * 80 + 10,
          y: Math.random() * 70 + 10,
          found: false,
        });
      }
    }

    setLetters(newLetters.sort(() => Math.random() - 0.5));
  };

  const handleLetterClick = (index: number) => {
    if (!gameActive || letters[index].found) return;

    const newLetters = [...letters];
    const clickedLetter = newLetters[index];

    if (clickedLetter.letter === targetLetter) {
      clickedLetter.found = true;
      setFoundCount(foundCount + 1);
      setScore(score + 10);
      setShowSuccess(true);
      playUISound('success');
      setTimeout(() => {
        setShowSuccess(false);
      }, 1000);

      if (foundCount + 1 === totalTargets) {
        setGameActive(false);
      }
    } else {
      setShowError(true);
      playUISound('error');
      setTimeout(() => {
        setShowError(false);
      }, 1500);
    }

    setLetters(newLetters);
  };

  const handleNextRound = () => {
    if (currentRoundIndex < GAME_ROUNDS.length - 1) {
      setCurrentRoundIndex(currentRoundIndex + 1);
    } else {
      // Game completed
      setCurrentRoundIndex(0);
      setScore(0);
    }
  };

  const handleReset = () => {
    setCurrentRoundIndex(0);
    setScore(0);
    setFoundCount(0);
    generateLetters();
  };

  const isRoundComplete = foundCount === totalTargets;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen gap-4">
      {isRoundComplete && <div className="fixed inset-0 z-50 pointer-events-none"><CelebrationConfetti /></div>}
      {/* Header */}
      <div className="w-full bg-white/60 backdrop-blur-md border-b-2 border-[#E8D4E8] p-4">
        <div className="container flex justify-center items-center flex-wrap gap-8">
          <div className="flex flex-col items-center">
            <p className="text-xl text-[#2D1B3D] font-bold mb-2">
              ابحث عن الحرف
            </p>
            <p className="text-lg text-[#7A6B8F] font-poppins mb-2">
              ابحث عن جميع اماكن حرف 
            </p>
            <div className="text-4xl font-extrabold text-[#FF6B5B] bg-white border-3 border-[#FF6B5B] rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
              {targetLetter}
            </div>
          </div>
          <div className="flex gap-6">
            <div className="bg-white rounded-2xl px-6 py-3 shadow-md border-2 border-[#FFD93D]">
              <p className="text-sm text-[#7A6B8F] font-poppins">الوقت المتبقي</p>
              <p className={`text-3xl font-bold ${timeLeft <= 5 ? 'text-[#FF6B5B]' : 'text-[#FFD93D]'}`}>
                {timeLeft}
              </p>
            </div>
            <div className="bg-white rounded-2xl px-6 py-3 shadow-md border-2 border-[#4ECDC4]">
              <p className="text-sm text-[#7A6B8F] font-poppins">النقاط</p>
              <p className="text-3xl font-bold text-[#4ECDC4]">{score}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative w-full h-[60vh] bg-gradient-to-br from-[#FFF8F0] via-[#FFFBF5] to-[#F8F3FF] rounded-2xl overflow-hidden shadow-lg">
        {/* Progress indicator */}
        <div className="absolute top-4 left-4 bg-white/80 rounded-full px-4 py-2 font-poppins font-semibold text-[#2D1B3D]">
          {foundCount} / {totalTargets}
        </div>

        {/* Letters */}
        {letters.map((letterPos, index) => (
          <button
            key={index}
            onClick={() => handleLetterClick(index)}
            disabled={letterPos.found || !gameActive}
            className={`
              absolute text-4xl font-bold transition-all duration-200
              ${letterPos.letter === targetLetter ? 'cursor-pointer' : 'cursor-default'}
              ${letterPos.found ? 'opacity-20 scale-75' : 'hover:scale-125'}
              ${letterPos.letter === targetLetter && !letterPos.found ? 'hover:text-[#FF6B5B]' : ''}
            `}
            style={{
              left: `${letterPos.x}%`,
              top: `${letterPos.y}%`,
              color: letterPos.letter === targetLetter ? '#4ECDC4' : '#B8A8FF',
              transform: letterPos.found ? 'scale(0.5)' : 'scale(1)',
            }}
          >
            {letterPos.letter}
          </button>
        ))}

        {/* Success Message */}
        {showSuccess && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-30 pointer-events-none">
            <div className="text-6xl animate-bounce">😊</div>
            <div className="bg-white/95 rounded-2xl p-6 text-center shadow-2xl">
              <h3 className="text-2xl font-bold text-[#32CD32] mb-2">احسنت ياصغيري!</h3>
              <p className="text-lg text-[#7A6B8F] font-poppins">كمل</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {showError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20 pointer-events-none">
            <div className="text-6xl animate-bounce">😢</div>
            <div className="bg-white/95 rounded-2xl p-6 text-center shadow-2xl">
              <h3 className="text-2xl font-bold text-[#FF6B5B] mb-2">اخترت غلط!</h3>
              <p className="text-lg text-[#7A6B8F] font-poppins">حاول مرة أخرى</p>
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {!gameActive && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center gap-6">
            <div className="text-center">
              {isRoundComplete ? (
                <>
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-3xl font-bold text-white mb-2">ممتاز!</h3>
                  <p className="text-lg text-white font-poppins">
                    وجدت جميع الحروف في الوقت المحدد
                  </p>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">😢</div>
                  <h3 className="text-3xl font-bold text-white mb-2">انتهى الوقت!</h3>
                  <p className="text-lg text-white font-poppins mb-2">
                    وجدت {foundCount} من {totalTargets}
                  </p>
                  <p className="text-lg text-white font-poppins">حاول مرة أخرى</p>
                </>
              )}
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleNextRound}
                className="px-8 py-3 bg-[#FF6B5B] text-white rounded-full font-bold font-poppins hover:bg-[#E55A4A] transition-all duration-200 hover:shadow-lg"
              >
                {currentRoundIndex < GAME_ROUNDS.length - 1 ? 'الجولة التالية' : 'إعادة من البداية'}
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-[#FFD93D] text-[#2D1B3D] rounded-full font-bold font-poppins hover:bg-[#FFC91F] transition-all duration-200 hover:shadow-lg flex items-center gap-2"
              >
                <RotateCcw size={18} />
                إعادة تعيين
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
