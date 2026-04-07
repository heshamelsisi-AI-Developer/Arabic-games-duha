import { useState, useEffect } from 'react';
import { Volume2, RotateCcw } from 'lucide-react';
import { ARABIC_LETTERS, getRandomLetters, ArabicLetter } from '@/lib/arabicLetters';

/**
 * Flashcards Game Component
 * Design: Playful & Vibrant
 * - 4 colorful cards with all 28 Arabic letters
 * - Text-to-speech for letter pronunciation
 * - Immediate visual feedback (correct: green bounce, incorrect: red shake)
 * - Particle effects on correct answers
 */

export default function FlashcardsGame() {
  const [currentLetter, setCurrentLetter] = useState<ArabicLetter | null>(null);
  const [options, setOptions] = useState<ArabicLetter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize game
  useEffect(() => {
    generateNewRound();
  }, []);

  const generateNewRound = () => {
    const randomLetters = getRandomLetters(4);
    const randomLetter = randomLetters[Math.floor(Math.random() * randomLetters.length)];
    setCurrentLetter(randomLetter);
    setOptions(randomLetters.sort(() => Math.random() - 0.5));
    setSelectedLetter(null);
    setFeedback(null);
  };

  const playSound = () => {
    if (!currentLetter) return;
    setIsPlaying(true);
    // Use Web Speech API for text-to-speech
    const utterance = new SpeechSynthesisUtterance(currentLetter.letter);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.7;
    utterance.pitch = 1.2;
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleLetterClick = (selectedOption: ArabicLetter) => {
    if (selectedLetter || feedback) return; // Prevent multiple selections

    setSelectedLetter(selectedOption.letter);
    setAttempts(attempts + 1);

    if (selectedOption.letter === currentLetter?.letter) {
      setFeedback('correct');
      setScore(score + 1);
      // Auto-advance after 1.5 seconds
      setTimeout(() => {
        generateNewRound();
      }, 1500);
    } else {
      setFeedback('incorrect');
      // Auto-reset after 1 second
      setTimeout(() => {
        setSelectedLetter(null);
        setFeedback(null);
      }, 1000);
    }
  };

  const handleSkip = () => {
    generateNewRound();
  };

  const handleReset = () => {
    setScore(0);
    setAttempts(0);
    generateNewRound();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
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
      <div className="text-8xl font-bold text-[#2D1B3D] animate-pulse">
        {currentLetter?.letter}
      </div>

      {/* Instruction */}
      <p className="text-xl text-[#7A6B8F] font-poppins text-center">
        اختر الحرف الصحيح من الخيارات أدناه
      </p>

      {/* Letter Options Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
        {options.map((option, index) => {
          const colors = ['#FFD93D', '#4ECDC4', '#B8A8FF', '#FF6B5B'];
          const isSelected = selectedLetter === option.letter;
          const isCorrect = feedback === 'correct' && isSelected;
          const isIncorrect = feedback === 'incorrect' && isSelected;

          return (
            <button
              key={index}
              onClick={() => handleLetterClick(option)}
              disabled={feedback !== null}
              className={`
                p-6 rounded-2xl text-4xl font-bold transition-all duration-300
                ${isCorrect ? 'scale-110 bg-[#4ECDC4] text-white shadow-2xl animate-bounce' : ''}
                ${isIncorrect ? 'bg-[#FF6B5B] text-white animate-shake' : ''}
                ${!isSelected && feedback === null ? `bg-white border-4 hover:scale-105 hover:shadow-lg cursor-pointer shadow-md` : ''}
                ${!isSelected && feedback !== null ? 'opacity-50' : ''}
                ${isSelected && !isCorrect && !isIncorrect ? 'bg-white border-4 border-[#FFD93D]' : ''}
                ${!isSelected && feedback === null ? `border-[${colors[index]}]` : ''}
              `}
              style={
                !isSelected && feedback === null
                  ? { borderColor: colors[index], backgroundColor: `${colors[index]}15` }
                  : {}
              }
            >
              {option.letter}
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

      {/* Particle Effects and Animations */}
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
