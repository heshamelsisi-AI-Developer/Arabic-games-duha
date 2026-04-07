import { useState } from 'react';
import { BookOpen, Gamepad2, ArrowRight, Instagram } from 'lucide-react';

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
    <div className="h-screen bg-gradient-to-b from-[#F5F5DC] to-[#D2B48C] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-b from-[#F5F5DC] to-[#D2B48C] backdrop-blur-md py-8 relative overflow-visible">
        {/*<div className="pointer-events-none absolute inset-0">
          <div className="absolute left-8 top-8 text-4xl animate-float-slow">🎈</div>
          <div className="absolute left-1/2 top-12 text-4xl animate-float-slow animation-delay-200">🌟</div>
          <div className="absolute right-16 top-16 text-4xl animate-float-slow animation-delay-400">🎉</div>
          <div className="absolute left-24 top-24 text-4xl animate-float-slow animation-delay-600">🎊</div>
          <div className="absolute right-24 top-10 text-4xl animate-float-slow animation-delay-800">✨</div>
          <div className="absolute left-1/3 bottom-12 text-4xl animate-float-slow animation-delay-1000">🎈</div>
          <div className="absolute right-1/3 bottom-16 text-4xl animate-float-slow animation-delay-1200">🌈</div>
        </div>
        <div className="absolute left-6 top-4 text-3xl animate-float-slow">✨</div>
        <div className="absolute right-8 top-6 text-3xl animate-float-slow animation-delay-200">🌟</div>*/}
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl animate-bounce">🎮</div>
            <div>
              <h1 className="text-3xl font-bold text-[#8B4513]">The Duha Way</h1>
              <p className="text-sm text-[#A0522D] font-poppins">
                تعلم وتدرب على الحروف العربية بشكل ممتع
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[#CD853F] font-bold">
            <span className="text-2xl animate-pulse">🎈</span>
            <span>مغامرة الحروف</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-6 flex flex-col items-center justify-center gap-8">
        {/* Welcome Section */}
        <div className="text-center mb-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-[#8B4513] mb-2">
            أهلاً وسهلاً! 👋
          </h2>
          <p className="text-lg text-[#8B4513] font-poppins max-w-2xl mx-auto">
            اختر الطريقة التي تفضلها للتعلم والتدريب على الحروف العربية
          </p>
        </div>

        {/* Games Section Only */}
        <div className="flex justify-center">
          <div
            className="group cursor-pointer animate-slide-up"
            onClick={() => onSelectSection('games')}
          >
            <div className="bg-[#FFF5E6] rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-[#8B4513] hover:border-[#CD853F] h-full">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-[#D2691E] to-[#8B4513] rounded-2xl p-6 group-hover:scale-110 transition-transform duration-300">
                  <Gamepad2 size={48} className="text-white" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-[#8B4513] mb-4 text-center">
                🎮 الألعاب التفاعلية
              </h3>

              {/* Description */}
              <p className="text-lg text-[#8B4513] font-poppins text-center mb-6">
                تدرب على الحروف من خلال ألعاب ممتعة وتفاعلية
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-[#8B4513]">
                  <span className="text-xl">✓</span>
                  <span className="font-poppins">8 ألعاب مختلفة</span>
                </li>
                <li className="flex items-center gap-2 text-[#8B4513]">
                  <span className="text-xl">✓</span>
                  <span className="font-poppins">تقييم فوري للإجابات</span>
                </li>
                <li className="flex items-center gap-2 text-[#8B4513]">
                  <span className="text-xl">✓</span>
                  <span className="font-poppins">نقاط وتحديات</span>
                </li>
                <li className="flex items-center gap-2 text-[#8B4513]">
                  <span className="text-xl">✓</span>
                  <span className="font-poppins">متعة وتشويق</span>
                </li>
              </ul>

              {/* Button */}
              <button className="w-full bg-gradient-to-r from-[#D2691E] to-[#8B4513] text-white py-4 rounded-2xl font-bold font-poppins text-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group/btn">
                ابدأ اللعب
                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 bg-gradient-to-b from-[#D2B48C] to-[#F5F5DC] text-center">
        <a
          href="https://www.instagram.com/the_duha_way?igsh=MWZyaHBkejQzcGJuZg=="
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-[#8B4513] hover:text-[#CD853F] transition-colors"
        >
          <Instagram size={24} />
          <span>تابعنا على إنستغرام</span>
        </a>
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
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }
        .animate-confetti {
          animation: confetti-fall 1.8s ease-in-out infinite;
          opacity: 0.9;
        }
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.9; }
          50% { transform: translateY(18px) rotate(45deg); opacity: 1; }
          100% { transform: translateY(0) rotate(90deg); opacity: 0.9; }
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}
