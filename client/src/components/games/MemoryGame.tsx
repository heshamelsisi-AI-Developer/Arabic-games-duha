import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import CelebrationConfetti from './CelebrationConfetti';
import { getRandomLetters, ArabicLetter } from '@/lib/arabicLetters';

interface Card {
  id: number;
  letter: ArabicLetter;
  isFlipped: boolean;
  isMatched: boolean;
}

/**
 * Memory Game Component
 * Design: Playful & Vibrant
 * - 8 cards (4 pairs) of all 28 Arabic letters
 * - Flip animation on card click
 * - Match detection with visual feedback
 * - Score tracking and game completion
 */

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Check for matches
  useEffect(() => {
    if (flipped.length === 2) {
      const [firstIdx, secondIdx] = flipped;
      if (cards[firstIdx] && cards[secondIdx] && cards[firstIdx].letter.letter === cards[secondIdx].letter.letter) {
        // Match found
        setMatched([...matched, firstIdx, secondIdx]);
        setFlipped([]);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setFlipped([]);
        }, 800);
      }
      setMoves(moves + 1);
    }
  }, [flipped, cards, matched]);

  // Check for game completion
  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matched, cards.length]);

  const initializeGame = () => {
    const randomLetters = getRandomLetters(4);
    const gameCards: Card[] = [];
    randomLetters.forEach((letter, index) => {
      gameCards.push({
        id: index * 2,
        letter,
        isFlipped: false,
        isMatched: false,
      });
      gameCards.push({
        id: index * 2 + 1,
        letter,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (index: number) => {
    if (flipped.includes(index) || matched.includes(index) || flipped.length === 2) {
      return;
    }
    setFlipped([...flipped, index]);
  };

  const handleReset = () => {
    initializeGame();
  };

  const colors = ['#FFD93D', '#4ECDC4', '#B8A8FF', '#FF6B5B'];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] gap-8">
      {gameWon && <CelebrationConfetti />}
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-[#2D1B3D] mb-2">لعبة الذاكرة</h2>
        <p className="text-lg text-[#7A6B8F] font-poppins">
          اقلب البطاقات وابحث عن الحروف المتطابقة
        </p>
      </div>

      {/* Stats */}
      <div className="flex gap-8">
        <div className="bg-white rounded-2xl px-6 py-3 shadow-md border-2 border-[#FFD93D]">
          <p className="text-sm text-[#7A6B8F] font-poppins">المحاولات</p>
          <p className="text-3xl font-bold text-[#FFD93D]">{moves}</p>
        </div>
        <div className="bg-white rounded-2xl px-6 py-3 shadow-md border-2 border-[#4ECDC4]">
          <p className="text-sm text-[#7A6B8F] font-poppins">الأزواج المتطابقة</p>
          <p className="text-3xl font-bold text-[#4ECDC4]">{Math.floor(matched.length / 2)}</p>
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          const isMatched = matched.includes(index);
          const cardColor = colors[index % colors.length];

          return (
            <button
              key={`${card.letter}-${index}`}
              onClick={() => handleCardClick(index)}
              disabled={isMatched || flipped.length === 2}
              className={`
                h-24 md:h-28 rounded-2xl cursor-pointer transition-all duration-300
                transform hover:scale-105 shadow-lg disabled:cursor-not-allowed
                ${isFlipped ? 'scale-100' : 'hover:shadow-xl'}
                ${isMatched ? 'opacity-75' : ''}
              `}
              style={{
                backgroundColor: isFlipped ? cardColor : '#FFFFFF',
                border: isFlipped ? 'none' : `4px solid ${cardColor}`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className={`
                  w-full h-full flex items-center justify-center
                  text-5xl font-bold transition-all duration-300
                  ${isFlipped ? 'text-white' : 'text-[#2D1B3D]'}
                  ${isMatched ? 'animate-pulse' : ''}
                `}
              >
                {isFlipped ? card.letter.letter : '?'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Game Won Message */}
      {gameWon && (
        <div className="text-center animate-bounce-in">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-3xl font-bold text-[#4ECDC4] mb-2">ممتاز!</h3>
          <p className="text-lg text-[#7A6B8F] font-poppins mb-6">
            لقد أكملت اللعبة في {moves} محاولة
          </p>
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-[#FF6B5B] text-white rounded-full font-bold font-poppins hover:bg-[#E55A4A] transition-all duration-200 hover:shadow-lg"
          >
            لعبة جديدة
          </button>
        </div>
      )}

      {/* Reset Button */}
      {!gameWon && (
        <button
          onClick={handleReset}
          className="px-8 py-3 bg-[#FFD93D] text-[#2D1B3D] rounded-full font-bold font-poppins hover:bg-[#FFC91F] transition-all duration-200 hover:shadow-lg flex items-center gap-2 shadow-lg"
        >
          <RotateCcw size={20} />
          إعادة تعيين
        </button>
      )}

      {/* Animations */}
      <style>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        .animate-pulse {
          animation: pulse 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
