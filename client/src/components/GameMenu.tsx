import { Volume2, Shuffle } from 'lucide-react';

// Import all game components
import FlashcardsGame from '@/components/games/FlashcardsGame';
import MemoryGame from '@/components/games/MemoryGame';
import SoundPictureMatch from '@/components/games/SoundPictureMatch';
import HiddenLetter from '@/components/games/HiddenLetter';
import MissingLetter from '@/components/games/MissingLetter';
import WordBuilder from '@/components/games/WordBuilder';
import LetterPuzzle from '@/components/games/LetterPuzzle';
import SingAndLearn from '@/components/games/SingAndLearn';

interface GameMenuProps {
  onSelectGame: (game: 'flashcards' | 'memory' | 'soundPicture' | 'hiddenLetter' | 'missingLetter' | 'wordBuilder' | 'letterPuzzle' | 'singLearn') => void;
}

/**
 * Game Menu Component
 * Design: Playful & Vibrant
 * - Displays game options with vibrant cards
 * - Coral-orange buttons with hover effects
 * - Staggered entrance animations
 */
export default function GameMenu({ onSelectGame }: GameMenuProps) {
  // Note: This component just displays the menu.
  // The actual game selection is handled in Home.tsx
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      {/* Welcome Section */}
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2D1B3D] mb-4">
          اختر اللعبة المفضلة لديك
        </h2>
        <p className="text-lg text-[#7A6B8F] font-poppins">
          تعلم الحروف العربية من خلال الألعاب التفاعلية المرحة
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {/* Flashcards Game Card */}
        <div
          className="group cursor-pointer animate-slide-up"
          style={{ animationDelay: '0.1s' }}
          onClick={() => onSelectGame('flashcards')}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-[#FFD93D] hover:border-[#FF6B5B]">
            <div className="text-5xl mb-3 text-center group-hover:scale-110 transition-transform duration-300">🎴</div>
            <h3 className="text-lg font-bold text-[#2D1B3D] mb-2 text-center">البطاقات</h3>
            <p className="text-xs text-[#7A6B8F] text-center font-poppins">استمع واختر</p>
          </div>
        </div>

        {/* Memory Game Card */}
        <div
          className="group cursor-pointer animate-slide-up"
          style={{ animationDelay: '0.2s' }}
          onClick={() => onSelectGame('memory')}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-[#4ECDC4] hover:border-[#FF6B5B]">
            <div className="text-5xl mb-3 text-center group-hover:scale-110 transition-transform duration-300">🎲</div>
            <h3 className="text-lg font-bold text-[#2D1B3D] mb-2 text-center">الذاكرة</h3>
            <p className="text-xs text-[#7A6B8F] text-center font-poppins">ابحث عن الأزواج</p>
          </div>
        </div>

        {/* Sound & Picture Match Card */}
        <div
          className="group cursor-pointer animate-slide-up"
          style={{ animationDelay: '0.3s' }}
          onClick={() => onSelectGame('soundPicture')}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-[#B8A8FF] hover:border-[#FF6B5B]">
            <div className="text-5xl mb-3 text-center group-hover:scale-110 transition-transform duration-300">🖼️</div>
            <h3 className="text-lg font-bold text-[#2D1B3D] mb-2 text-center">الصورة</h3>
            <p className="text-xs text-[#7A6B8F] text-center font-poppins">طابق الحرف بالصورة</p>
          </div>
        </div>

        {/* Hidden Letter Card */}
        <div
          className="group cursor-pointer animate-slide-up"
          style={{ animationDelay: '0.4s' }}
          onClick={() => onSelectGame('hiddenLetter')}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-[#FFD93D] hover:border-[#FF6B5B]">
            <div className="text-5xl mb-3 text-center group-hover:scale-110 transition-transform duration-300">🔍</div>
            <h3 className="text-lg font-bold text-[#2D1B3D] mb-2 text-center">ابحث</h3>
            <p className="text-xs text-[#7A6B8F] text-center font-poppins">ابحث عن الحروف</p>
          </div>
        </div>

        {/* Missing Letter Card */}
        <div
          className="group cursor-pointer animate-slide-up"
          style={{ animationDelay: '0.5s' }}
          onClick={() => onSelectGame('missingLetter')}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-[#4ECDC4] hover:border-[#FF6B5B]">
            <div className="text-5xl mb-3 text-center group-hover:scale-110 transition-transform duration-300">❓</div>
            <h3 className="text-lg font-bold text-[#2D1B3D] mb-2 text-center">الحرف الناقص</h3>
            <p className="text-xs text-[#7A6B8F] text-center font-poppins">أكمل الكلمة</p>
          </div>
        </div>

        {/* Word Builder Card */}
        <div
          className="group cursor-pointer animate-slide-up"
          style={{ animationDelay: '0.6s' }}
          onClick={() => onSelectGame('wordBuilder')}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-[#B8A8FF] hover:border-[#FF6B5B]">
            <div className="text-5xl mb-3 text-center group-hover:scale-110 transition-transform duration-300">🧩</div>
            <h3 className="text-lg font-bold text-[#2D1B3D] mb-2 text-center">بناء الكلمة</h3>
            <p className="text-xs text-[#7A6B8F] text-center font-poppins">رتب الحروف</p>
          </div>
        </div>

        {/* Letter Puzzle Card */}
        <div
          className="group cursor-pointer animate-slide-up"
          style={{ animationDelay: '0.7s' }}
          onClick={() => onSelectGame('letterPuzzle')}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-[#FFD93D] hover:border-[#FF6B5B]">
            <div className="text-5xl mb-3 text-center group-hover:scale-110 transition-transform duration-300">🧩</div>
            <h3 className="text-lg font-bold text-[#2D1B3D] mb-2 text-center">لغز الحروف</h3>
            <p className="text-xs text-[#7A6B8F] text-center font-poppins">اجمع الأجزاء</p>
          </div>
        </div>

        {/* Sing & Learn Card */}
        <div
          className="group cursor-pointer animate-slide-up"
          style={{ animationDelay: '0.8s' }}
          onClick={() => onSelectGame('singLearn')}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-[#4ECDC4] hover:border-[#FF6B5B]">
            <div className="text-5xl mb-3 text-center group-hover:scale-110 transition-transform duration-300">🎵</div>
            <h3 className="text-lg font-bold text-[#2D1B3D] mb-2 text-center">الأغنية</h3>
            <p className="text-xs text-[#7A6B8F] text-center font-poppins">تعلم مع الموسيقى</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-4xl border-2 border-[#E8D4E8]">
        <h4 className="text-lg font-bold text-[#2D1B3D] mb-3">💡 نصائح للمدرب:</h4>
        <ul className="text-[#7A6B8F] font-poppins space-y-2 text-sm">
          <li>✓ <strong>البطاقات:</strong> لتعليم الحروف الجديدة مع النطق</li>
          <li>✓ <strong>الذاكرة:</strong> لتدريب الذاكرة البصرية</li>
          <li>✓ <strong>الصورة:</strong> لربط الحروف بالكلمات والصور</li>
          <li>✓ <strong>البحث:</strong> لتطوير مهارات التركيز</li>
          <li>✓ <strong>الكلمات:</strong> لتعليم تكوين الكلمات</li>
          <li>✓ <strong>الأغنية:</strong> للتعلم الممتع والموسيقي</li>
        </ul>
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
