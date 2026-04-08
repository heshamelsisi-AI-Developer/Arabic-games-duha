/*import { useState } from 'react';
import Landing from '@/pages/Landing';
import GamesPage from '@/pages/GamesPage';
import SimplePresentations from '@/pages/SimplePresentations';

/**
 * Home Page - Main Router
 * Design: Playful & Vibrant
 * - Landing page with two sections: Presentations and Games
 * - Warm cream background (#FFF8F0)
 * - Coral-orange (#FF6B5B) action buttons
 * - Mint green (#4ECDC4) success states
 * - Cairo font for headings, Poppins for body
 */

/*export default function Home() {
  const [currentSection, setCurrentSection] = useState<
    'landing' | 'presentations' | 'games'
  >('landing');

  // Landing page
  if (currentSection === 'landing') {
    return (
      <Landing
        onSelectSection={(section) => setCurrentSection(section)}
      />
    );
  }

  // Presentations section (simplified)
  if (currentSection === 'presentations') {
    return <SimplePresentations onBack={() => setCurrentSection('landing')} />;
  }

  // Games section
  if (currentSection === 'games') {
    return (
      <div>
        <button
          onClick={() => setCurrentSection('landing')}
          className="fixed top-4 left-4 px-4 py-2 bg-[#B8A8FF] text-white rounded-lg font-poppins z-50"
        >
          ← رجوع
        </button>
        <GamesPage onBack={() => setCurrentSection('landing')} />
      </div>
    );
  }

  return null;
};*/
import { useState } from 'react';
import Landing from '@/pages/Landing';
import GamesPage from '@/pages/GamesPage';
import SimplePresentations from '@/pages/SimplePresentations';

export default function Home() {
  const [currentSection, setCurrentSection] = useState<
    'landing' | 'presentations' | 'games'
  >('landing');

  // Landing page
  if (currentSection === 'landing') {
    return (
      <Landing
        onSelectSection={(section) => {
          // ❌ منع الشروح
          if (section === 'presentations') return;

          // ✅ الألعاب بس
          setCurrentSection(section);
        }}
      />
    );
  }

  // Presentations (مش هتتفتح أصلاً)
  if (currentSection === 'presentations') {
    return <SimplePresentations onBack={() => setCurrentSection('landing')} />;
  }

  // Games
  if (currentSection === 'games') {
    return (
      <div>
        {/*<button
          onClick={() => setCurrentSection('landing')}
          className="fixed top-4 left-4 px-4 py-2 bg-[#B8A8FF] text-white rounded-lg font-poppins z-50"
        >
          ← رجوع
        </button>*/}
        <GamesPage onBack={() => setCurrentSection('landing')} />
      </div>
    );
  }

  return null;
}