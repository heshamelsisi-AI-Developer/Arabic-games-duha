import { useState } from 'react';
import { BookOpen, Gamepad2, ArrowRight } from 'lucide-react';

interface LandingProps {
  onSelectSection: (section: 'presentations' | 'games') => void;
}

/**
 * Landing Page
 * Design: Playful & Vibrant
 * - Two main sections: Presentations and Games
 * - Welcoming hero section
 * - Clear navigation
 */

export default function Landing({ onSelectSection }: LandingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFFBF5] to-[#F8F3FF] flex flex-col">
      {/* Header */}
      <header className="bg-white/40 backdrop-blur-md border-b border-[#E8D4E8] py-6">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🎮</div>
            <div>
              <h1 className="text-3xl font-bold text-[#2D1B3D]">The Duha Way</h1>
              <p className="text-sm text-[#7A6B8F] font-poppins">
                تعلم وتدرب على الحروف العربية
              </p>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-16 flex flex-col items-center justify-center gap-12">
        {/* Welcome Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold text-[#2D1B3D] mb-4">
            أهلاً وسهلاً! 👋
          </h2>
          <p className="text-xl text-[#7A6B8F] font-poppins max-w-2xl mx-auto">
            اختر الطريقة التي تفضلها للتعلم والتدريب على الحروف العربية
          </p>
        </div>

        {/* Two Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Presentations Section */}
          <div
            className="group cursor-pointer animate-slide-up"
            style={{ animationDelay: '0.2s' }}
            onClick={() => onSelectSection('presentations')}
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-[#B8A8FF] hover:border-[#FF6B5B] h-full">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-[#B8A8FF] to-[#E8D4E8] rounded-2xl p-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen size={48} className="text-white" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-[#2D1B3D] mb-4 text-center">
                📚 الدروس والشروحات
              </h3>

              {/* Description */}
              <p className="text-lg text-[#7A6B8F] font-poppins text-center mb-6">
                تعلم الحروف العربية من خلال شروحات مفصلة وتمارين تفاعلية
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-[#2D1B3D]">
                  <span className="text-xl">✓</span>
                  <span className="font-poppins">شرح كل حرف بالتفصيل</span>
                </li>
                <li className="flex items-center gap-2 text-[#2D1B3D]">
                  <span className="text-xl">✓</span>
                  <span className="font-poppins">أمثلة وكلمات مهمة</span>
                </li>
                <li className="flex items-center gap-2 text-[#2D1B3D]">
                  <span className="text-xl">✓</span>
                  <span className="font-poppins">تمارين بعد كل درس</span>
                </li>
                <li className="flex items-center gap-2 text-[#2D1B3D]">
                  <span className="text-xl">✓</span>
                  <span className="font-poppins">نطق صحيح للحروف</span>
                </li>
              </ul>

              {/* Button */}
              <button className="w-full bg-gradient-to-r from-[#B8A8FF] to-[#E8D4E8] text-white py-4 rounded-2xl font-bold font-poppins text-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group/btn">
                ابدأ الدروس
                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Games Section */}
          <div
            className="group cursor-pointer animate-slide-up"
            style={{ animationDelay: '0.4s' }}
            onClick={() => onSelectSection('games')}
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-[#4ECDC4] hover:border-[#FF6B5B] h-full">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-[#4ECDC4] to-[#FFD93D] rounded-2xl p-6 group-hover:scale-110 transition-transform duration-300">
                  <Gamepad2 size={48} className="text-white" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-[#2D1B3D] mb-4 text-center">
                🎮 الألعاب التفاعلية
              </h3>

              {/* Description */}
              <p className="text-lg text-[#7A6B8F] font-poppins text-center mb-6">
                تدرب على الحروف من خلال ألعاب ممتعة وتفاعلية
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-[#2D1B3D]">
                  <span className="text-xl">✓</span>
                  <span className="font-poppins">8 ألعاب مختلفة</span>
                </li>
                <li className="flex items-center gap-2 text-[#2D1B3D]">
                  <span className="text-xl">✓</span>
                  <span className="font-poppins">تقييم فوري للإجابات</span>
                </li>
                <li className="flex items-center gap-2 text-[#2D1B3D]">
                  <span className="text-xl">✓</span>
                  <span className="font-poppins">نقاط وتحديات</span>
                </li>
                <li className="flex items-center gap-2 text-[#2D1B3D]">
                  <span className="text-xl">✓</span>
                  <span className="font-poppins">متعة وتشويق</span>
                </li>
              </ul>

              {/* Button */}
              <button className="w-full bg-gradient-to-r from-[#4ECDC4] to-[#FFD93D] text-white py-4 rounded-2xl font-bold font-poppins text-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group/btn">
                ابدأ اللعب
                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl border-2 border-[#E8D4E8]">
          <h4 className="text-2xl font-bold text-[#2D1B3D] mb-4 text-center">
            💡 نصيحة للمدرب
          </h4>
          <p className="text-[#7A6B8F] font-poppins text-center text-lg">
            استخدم <strong>الدروس والشروحات</strong> لتعليم الحروف الجديدة، ثم انتقل إلى <strong>الألعاب التفاعلية</strong> لتدريب الطلاب وتقييم فهمهم
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/40 backdrop-blur-sm border-t border-[#E8D4E8] py-4 mt-auto">
        <div className="container text-center">
          <p className="text-[#7A6B8F] font-poppins text-sm">
            🌟 تطبيق تعليمي تفاعلي لتعلم الحروف العربية
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
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
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
