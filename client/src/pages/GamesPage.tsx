import { useState } from 'react';
import React from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { LEARNING_STAGES } from '@/lib/learningStages';
import FlashcardsGame from '@/components/games/FlashcardsGame';
import MemoryGame from '@/components/games/MemoryGame';
import SoundPictureMatch from '@/components/games/SoundPictureMatch';
import HiddenLetter from '@/components/games/HiddenLetter';
import MissingLetter from '@/components/games/MissingLetter';
import WordBuilder from '@/components/games/WordBuilder';
import LetterPuzzle from '@/components/games/LetterPuzzle';
import SingAndLearn from '@/components/games/SingAndLearn';
import {
  LetterMatchingGame,
  SoundToLetterGame,
  WordBeginningGame,
  RhymingWordsGame,
  LetterSoundSpeedGame,
  SyllableBlendingGame,
  WordFormationGame,
  SoundSequenceGame,
  WordSearchGame,
  WordRecognitionGame,
  PlaceholderGame,
} from '@/components/games/ImplementedGames';

interface GamesPageProps {
  onBack: () => void;
}

/**
 * Games Page Component
 * Design: Playful & Vibrant
 * - Display 6 learning stages with organized games
 * - Each stage has 3-5 games
 * - Progressive difficulty from Recognition to Writing
 */

const GAME_COMPONENTS: { [key: string]: React.ComponentType<any> } = {
  'flashcards': FlashcardsGame,
  'memory': MemoryGame,
  'sound-picture': SoundPictureMatch,
  'hidden-letter': HiddenLetter,
  'missing-letter': MissingLetter,
  'word-builder': WordBuilder,
  'letter-puzzle': LetterPuzzle,
  'sing-and-learn': SingAndLearn,
  'letter-matching': LetterMatchingGame,
  'sound-letter': SoundToLetterGame,
  'word-beginning': WordBeginningGame,
  'rhyming-words': RhymingWordsGame,
  'letter-sound-speed': LetterSoundSpeedGame,
  'syllable-blending': SyllableBlendingGame,
  'word-formation': WordFormationGame,
  'sound-sequence': SoundSequenceGame,
  'word-search': WordSearchGame,
  'word-recognition': WordRecognitionGame,
  'sentence-building': () => <PlaceholderGame />,
  'comprehension-quiz': () => <PlaceholderGame />,
  'text-matching': () => <PlaceholderGame />,
  'one-minute-challenge': () => <PlaceholderGame />,
  'speed-reading': () => <PlaceholderGame />,
  'expressive-reading': () => <PlaceholderGame />,
  'fluency-race': () => <PlaceholderGame />,
  'story-reading': () => <PlaceholderGame />,
  'letter-tracing': () => <PlaceholderGame />,
  'letter-writing': () => <PlaceholderGame />,
  'word-writing': () => <PlaceholderGame />,
  'sentence-writing': () => <PlaceholderGame />,
  'creative-writing': () => <PlaceholderGame />,
};

export default function GamesPage({ onBack }: GamesPageProps) {
  const [selectedStage, setSelectedStage] = useState(LEARNING_STAGES[0].id);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const currentStage = LEARNING_STAGES.find(s => s.id === selectedStage);
  const GameComponent = selectedGame ? GAME_COMPONENTS[selectedGame] : null;

  if (selectedGame && GameComponent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFFBF5] to-[#F8F3FF]">
        {/* Header */}
        <header className="bg-white/40 backdrop-blur-md border-b border-[#E8D4E8] py-4 sticky top-0 z-10">
          <div className="container flex items-center justify-between">
            <button
              onClick={() => setSelectedGame(null)}
              className="flex items-center gap-2 text-[#2D1B3D] hover:text-[#FF6B5B] transition-colors font-bold font-poppins"
            >
              <ArrowLeft size={20} />
              الرجوع
            </button>
            <h1 className="text-2xl font-bold text-[#2D1B3D]">
              {currentStage?.nameArabic}
            </h1>
            <div className="w-20"></div>
          </div>
        </header>

        {/* Game */}
        <main className="container py-8">
          <GameComponent />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] via-[#FFFBF5] to-[#F8F3FF] flex flex-col">
      {/* Header */}
      <header className="bg-white/40 backdrop-blur-md border-b border-[#E8D4E8] py-4">
        <div className="container flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#2D1B3D] hover:text-[#FF6B5B] transition-colors font-bold font-poppins"
          >
            <ArrowLeft size={20} />
            الرجوع
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#2D1B3D]">The Duha Way</h1>
            <p className="text-sm text-[#7A6B8F]">🎮 الألعاب التفاعلية</p>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8">
        {/* Stages Tabs */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-3 min-w-max">
            {LEARNING_STAGES.map(stage => (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`
                  px-6 py-3 rounded-full font-bold font-poppins transition-all duration-200 whitespace-nowrap
                  ${
                    selectedStage === stage.id
                      ? 'bg-white text-white shadow-lg'
                      : 'bg-white/60 text-[#2D1B3D] hover:bg-white/80'
                  }
                `}
                style={{
                  backgroundColor:
                    selectedStage === stage.id ? stage.color : undefined,
                  color: selectedStage === stage.id ? 'white' : undefined,
                }}
              >
                <span className="mr-2">{stage.icon}</span>
                {stage.nameArabic}
              </button>
            ))}
          </div>
        </div>

        {/* Stage Description */}
        {currentStage && (
          <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-[#E8D4E8] mb-8">
            <h2 className="text-2xl font-bold text-[#2D1B3D] mb-2">
              {currentStage.nameArabic}
            </h2>
            <p className="text-[#7A6B8F] font-poppins text-lg">
              {currentStage.descriptionArabic}
            </p>
          </div>
        )}

        {/* Games Grid */}
        {currentStage && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentStage.games.map(game => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game.id)}
                className="group bg-white rounded-2xl p-6 shadow-md border-2 border-[#E8D4E8] hover:shadow-xl hover:border-[#4ECDC4] transition-all duration-300 text-left"
              >
                {/* Icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {game.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#2D1B3D] mb-2">
                  {game.nameArabic}
                </h3>

                {/* Description */}
                <p className="text-[#7A6B8F] font-poppins text-sm mb-4">
                  {game.descriptionArabic}
                </p>

                {/* Difficulty & Age */}
                <div className="flex gap-2 mb-4">
                  <span
                    className={`
                    px-3 py-1 rounded-full text-xs font-bold font-poppins
                    ${
                      game.difficulty === 'easy'
                        ? 'bg-[#4ECDC4]/20 text-[#4ECDC4]'
                        : game.difficulty === 'medium'
                        ? 'bg-[#FFD93D]/20 text-[#FFD93D]'
                        : 'bg-[#FF6B5B]/20 text-[#FF6B5B]'
                    }
                  `}
                  >
                    {game.difficulty === 'easy'
                      ? 'سهل'
                      : game.difficulty === 'medium'
                      ? 'متوسط'
                      : 'صعب'}
                  </span>
                  <span className="px-3 py-1 bg-[#B8A8FF]/20 text-[#B8A8FF] rounded-full text-xs font-bold font-poppins">
                    {game.targetAge} سنة
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {game.skills.slice(0, 2).map(skill => (
                    <span
                      key={skill}
                      className="text-xs bg-[#E8D4E8] text-[#2D1B3D] px-2 py-1 rounded-full font-poppins"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Play Button */}
                <div className="flex items-center gap-2 text-[#4ECDC4] font-bold font-poppins group-hover:gap-3 transition-all duration-300">
                  لعب الآن
                  <ChevronRight size={18} />
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
