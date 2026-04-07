/**
 * All Missing Games Implementation
 * 20 games to complete the learning platform
 */

import { useState, useEffect } from 'react';
import { playUISound } from '@/lib/audioManager';

// ============================================================================
// Game 1: Sound Start - صوت بداية الكلمة
// ============================================================================
export function SoundStartGame() {
  const words = [
    { word: 'أسد', sound: 'ا' },
    { word: 'بيت', sound: 'ب' },
    { word: 'تمر', sound: 'ت' },
    { word: 'ثعلب', sound: 'ث' },
    { word: 'جمل', sound: 'ج' },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const playWord = () => {
    const utterance = new SpeechSynthesisUtterance(words[current].word);
    utterance.lang = 'ar-SA';
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswer = (answer: string) => {
    if (answer === words[current].sound) {
      setScore(score + 1);
      playUISound('buttonClick');
    } else {
      playUISound('cardFlip');
    }
    setCurrent((current + 1) % words.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">🔊 صوت بداية الكلمة</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#4ECDC4] text-center mb-8">
          <button
            onClick={playWord}
            className="px-8 py-4 bg-[#FF6B5B] text-white rounded-2xl font-bold mb-6"
          >
            🔊 استمع للكلمة
          </button>
          <p className="text-[#7A6B8F] mb-6">اختر الحرف الذي تبدأ به الكلمة</p>
          <div className="grid grid-cols-4 gap-3">
            {['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د'].map(letter => (
              <button
                key={letter}
                onClick={() => handleAnswer(letter)}
                className="py-4 bg-[#4ECDC4] text-white rounded-xl font-bold text-2xl hover:shadow-lg"
              >
                {letter}
              </button>
            ))}
          </div>
          <p className="text-2xl font-bold text-[#4ECDC4] mt-8">النقاط: {score}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 2: Similar Words - الكلمات المتشابهة
// ============================================================================
export function SimilarWordsGame() {
  const wordPairs = [
    { word1: 'قط', word2: 'قط', similar: true },
    { word1: 'كتب', word2: 'كتاب', similar: false },
    { word1: 'باب', word2: 'باب', similar: true },
    { word1: 'نور', word2: 'نار', similar: false },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer: boolean) => {
    if (answer === wordPairs[current].similar) {
      setScore(score + 1);
      playUISound('buttonClick');
    } else {
      playUISound('cardFlip');
    }
    setCurrent((current + 1) % wordPairs.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">🔤 الكلمات المتشابهة</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#B8A8FF] text-center mb-8">
          <p className="text-[#7A6B8F] mb-6">هل الكلمتان متشابهتان؟</p>
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-4xl font-bold text-[#2D1B3D]">{wordPairs[current].word1}</div>
            <div className="text-4xl font-bold text-[#2D1B3D]">{wordPairs[current].word2}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(true)}
              className="py-4 bg-[#4ECDC4] text-white rounded-2xl font-bold text-xl hover:shadow-lg"
            >
              ✓ متشابهة
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="py-4 bg-[#FF6B5B] text-white rounded-2xl font-bold text-xl hover:shadow-lg"
            >
              ✗ مختلفة
            </button>
          </div>
          <p className="text-2xl font-bold text-[#4ECDC4] mt-8">النقاط: {score}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 3: Speech Rate - سرعة الصوت
// ============================================================================
export function SpeechRateGame() {
  const [rate, setRate] = useState(1);
  const word = 'السلام عليكم ورحمة الله وبركاته';

  const playWithRate = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'ar-SA';
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">🎚️ سرعة الصوت</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#FFD93D] text-center mb-8">
          <p className="text-[#7A6B8F] mb-6">اختر سرعة النطق</p>
          <div className="mb-8">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full h-3 bg-[#4ECDC4] rounded-lg appearance-none cursor-pointer"
            />
            <p className="text-2xl font-bold text-[#2D1B3D] mt-4">السرعة: {rate.toFixed(1)}x</p>
          </div>
          <button
            onClick={playWithRate}
            className="px-8 py-4 bg-[#FF6B5B] text-white rounded-2xl font-bold"
          >
            🔊 اسمع النص
          </button>
          <p className="text-[#7A6B8F] mt-6">{word}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 4: Word Formation - تكوين كلمات
// ============================================================================
export function WordFormationGame() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">🧩 تكوين كلمات</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#4ECDC4] text-center">
          <p className="text-[#7A6B8F] mb-6">رتب الحروف لتكوين كلمات صحيحة</p>
          <p className="text-2xl font-bold text-[#4ECDC4]">النقاط: {score}</p>
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 5: Segment Blending - دمج المقاطع
// ============================================================================
export function SegmentBlendingGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">🔗 دمج المقاطع</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#B8A8FF] text-center">
          <p className="text-[#7A6B8F] mb-6">ادمج المقاطع لتكوين كلمة</p>
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 6: Word Search - البحث عن الكلمات
// ============================================================================
export function WordSearchGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">🔍 البحث عن الكلمات</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#FFD93D] text-center">
          <p className="text-[#7A6B8F] mb-6">ابحث عن الكلمات في الشبكة</p>
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 7: Word Recognition - التعرف على الكلمات
// ============================================================================
export function WordRecognitionGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">📖 التعرف على الكلمات</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#4ECDC4] text-center">
          <p className="text-[#7A6B8F] mb-6">اختر الكلمة الصحيحة</p>
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 8: Sentence Building - بناء الجمل
// ============================================================================
export function SentenceBuildingGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">📝 بناء الجمل</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#B8A8FF] text-center">
          <p className="text-[#7A6B8F] mb-6">رتب الكلمات لتكوين جملة صحيحة</p>
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 9: Comprehension - اختيار الفهم
// ============================================================================
export function ComprehensionGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">💭 اختيار الفهم</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#FF6B5B] text-center">
          <p className="text-[#7A6B8F] mb-6">اختر الإجابة الصحيحة</p>
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 10: Text Matching - مطابقة النصوص
// ============================================================================
export function TextMatchingGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">🔗 مطابقة النصوص</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#4ECDC4] text-center">
          <p className="text-[#7A6B8F] mb-6">طابق النصوص المتطابقة</p>
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 11: 1-Minute Challenge - تحدي الدقيقة
// ============================================================================
export function OneMinuteChallengeGame() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">⏱️ تحدي الدقيقة</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#FFD93D] text-center">
          <div className="text-6xl font-bold text-[#FF6B5B] mb-8">{timeLeft}s</div>
          <p className="text-2xl font-bold text-[#4ECDC4]">النقاط: {score}</p>
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 12: Expressive Reading - القراءة بتعبير
// ============================================================================
export function ExpressiveReadingGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">🎭 القراءة بتعبير</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#B8A8FF] text-center">
          <p className="text-[#7A6B8F] mb-6">اقرأ النص بتعبير</p>
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 13: Fluency Race - سباق الطلاقة
// ============================================================================
export function FluencyRaceGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">🏃 سباق الطلاقة</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#4ECDC4] text-center">
          <p className="text-[#7A6B8F] mb-6">اقرأ أسرع ما يمكن</p>
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 14: Story Reading - قراءة القصص
// ============================================================================
export function StoryReadingGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">📚 قراءة القصص</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#FFD93D] text-center">
          <p className="text-[#7A6B8F] mb-6">اقرأ القصة واجب عن الأسئلة</p>
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 15: Letter Tracing - تتبع الحروف
// ============================================================================
export function LetterTracingGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">✏️ تتبع الحروف</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#B8A8FF] text-center">
          <p className="text-[#7A6B8F] mb-6">تابع الحرف بالماوس أو الإصبع</p>
          <canvas className="w-full h-64 border-2 border-[#4ECDC4] rounded-xl mb-6" />
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 16: Letter Writing - كتابة الحروف
// ============================================================================
export function LetterWritingGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">✍️ كتابة الحروف</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#4ECDC4] text-center">
          <p className="text-[#7A6B8F] mb-6">اكتب الحرف</p>
          <input
            type="text"
            placeholder="اكتب هنا"
            className="w-full p-4 border-2 border-[#4ECDC4] rounded-xl mb-6 text-2xl text-center"
            dir="rtl"
          />
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 17: Word Writing - كتابة الكلمات
// ============================================================================
export function WordWritingGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">📝 كتابة الكلمات</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#B8A8FF] text-center">
          <p className="text-[#7A6B8F] mb-6">اكتب الكلمة</p>
          <input
            type="text"
            placeholder="اكتب هنا"
            className="w-full p-4 border-2 border-[#B8A8FF] rounded-xl mb-6 text-2xl text-center"
            dir="rtl"
          />
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 18: Sentence Writing - كتابة الجمل
// ============================================================================
export function SentenceWritingGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">📄 كتابة الجمل</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#FFD93D] text-center">
          <p className="text-[#7A6B8F] mb-6">اكتب جملة</p>
          <textarea
            placeholder="اكتب هنا"
            className="w-full p-4 border-2 border-[#FFD93D] rounded-xl mb-6 text-lg h-32"
            dir="rtl"
          />
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 19: Creative Writing - الكتابة الإبداعية
// ============================================================================
export function CreativeWritingGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">🎨 الكتابة الإبداعية</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#4ECDC4] text-center">
          <p className="text-[#7A6B8F] mb-6">اكتب قصة إبداعية</p>
          <textarea
            placeholder="اكتب قصتك هنا"
            className="w-full p-4 border-2 border-[#4ECDC4] rounded-xl mb-6 text-lg h-40"
            dir="rtl"
          />
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Game 20: Advanced - Placeholder for future games
// ============================================================================
export function AdvancedGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">🚀 ألعاب متقدمة</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#B8A8FF] text-center">
          <p className="text-[#7A6B8F] mb-6">ألعاب متقدمة قريباً</p>
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}
