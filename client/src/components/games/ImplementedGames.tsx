import React, { useState } from 'react';
import { playUISound, playLetterSound } from '@/lib/audioManager';

const sadMessages = [
  '😢 أوه! حاول تاني، انت قريب جداً.',
  '🥺 لا تقلق.. جرب مرة ثانية.',
  '😿 للأسف ده مش صح، ممكن تعيد المحاولة؟',
];

const successMessages = [
  '🎉 ممتاز! إجابة صحيحة.',
  '✨ أحسنت! كده تمام.',
  '👏 رائع! استمر يا بطل.',
];

const getRandomMessage = (messages: string[]) =>
  messages[Math.floor(Math.random() * messages.length)];

function CelebrationConfetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="absolute w-3 h-3 rounded-full bg-[#FFB74D] animate-confetti-spark" style={{ left: '15%', top: '10%' }} />
      <span className="absolute w-3 h-3 rounded-full bg-[#4ECDC4] animate-confetti-spark" style={{ left: '30%', top: '18%' }} />
      <span className="absolute w-3 h-3 rounded-full bg-[#FF6B5B] animate-confetti-spark" style={{ left: '60%', top: '12%' }} />
      <span className="absolute w-2 h-5 rounded-full bg-[#B8A8FF] animate-confetti-spark" style={{ left: '45%', top: '24%' }} />
      <span className="absolute w-2 h-5 rounded-full bg-[#FFD93D] animate-confetti-spark" style={{ left: '70%', top: '22%' }} />
    </div>
  );
}

// ============================================================================
// Letter Matching Game
// ============================================================================
export function LetterMatchingGame() {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

  /*const pairs = [
    { letter1: 'ا', letter2: 'ا', match: true },
    { letter1: 'ب', letter2: 'ب', match: true },
    { letter1: 'ت', letter2: 'ت', match: true },
    { letter1: 'ا', letter2: 'ب', match: false },
    { letter1: 'ج', letter2: 'ج', match: true },
    { letter1: 'ح', letter2: 'خ', match: false },
  ];*/
  const pairs = [
  { letter1: 'ا', letter2: 'ب', match: false },
  { letter1: 'م', letter2: 'م', match: true },
  { letter1: 'ت', letter2: 'ت', match: true },
  { letter1: 'ح', letter2: 'خ', match: false },
  { letter1: 'س', letter2: 'س', match: true },
  { letter1: 'ب', letter2: 'ك', match: false },
  { letter1: 'ر', letter2: 'ر', match: true },
  { letter1: 'ج', letter2: 'ن', match: false },
  { letter1: 'ف', letter2: 'ف', match: true },
  { letter1: 'خ', letter2: 'ي', match: false },
  { letter1: 'ل', letter2: 'ل', match: true },
  { letter1: 'ا', letter2: 'ا', match: true },
  { letter1: 'ت', letter2: 'م', match: false },
  { letter1: 'ش', letter2: 'ش', match: true },
  { letter1: 'ق', letter2: 'ك', match: false },
  { letter1: 'ن', letter2: 'ن', match: true },
  { letter1: 'و', letter2: 'ي', match: false },
  { letter1: 'د', letter2: 'د', match: true },
  { letter1: 'ص', letter2: 'ص', match: true },
  { letter1: 'ض', letter2: 'ط', match: false },
  { letter1: 'ه', letter2: 'ه', match: true },
  { letter1: 'ز', letter2: 'س', match: false },
  { letter1: 'ك', letter2: 'ك', match: true },
  { letter1: 'غ', letter2: 'ف', match: false },
  { letter1: 'ي', letter2: 'ي', match: true },
  { letter1: 'ث', letter2: 'ث', match: true },
  { letter1: 'ذ', letter2: 'ر', match: false },
  { letter1: 'ع', letter2: 'ع', match: true },
];

  const [current, setCurrent] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswer = (answer: boolean) => {
    const isCorrect = answer === pairs[current].match;
    if (isCorrect) {
      setScore(score + 1);
      setWrongAttempts(0);
      setFeedback('success');
      setFeedbackText(getRandomMessage(successMessages));
      setShowConfetti(true);
      playUISound('success');
      const nextIndex = current + 1;
      if (nextIndex >= pairs.length) {
        setRound(round + 1);
        setCurrent(0);
      } else {
        setCurrent(nextIndex);
      }
    } else {
      setWrongAttempts(wrongAttempts + 1);
      setFeedback('error');
      setFeedbackText(getRandomMessage(sadMessages));
      playUISound('error');
    }

    window.setTimeout(() => setFeedback(null), 1200);
    window.setTimeout(() => setShowConfetti(false), 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <p className="text-lg font-bold text-[#7A6B8F]">الجولة: {round + 1}</p>
          <h2 className="text-3xl font-bold text-[#2D1B3D]">🎴 مطابقة الحروف</h2>
          <p className="text-lg font-bold text-[#4ECDC4]">النقاط: {score}</p>
        </div>
        <div className="relative bg-white rounded-3xl p-8 shadow-lg border-4 border-[#B8A8FF] text-center">
          {showConfetti && <CelebrationConfetti />}
          <p className="text-[#7A6B8F] mb-6">هل الحرفان متطابقان؟</p>
          {feedback && (
            <div className={`mb-4 rounded-3xl p-4 text-sm font-bold ${feedback === 'success' ? 'bg-[#D3F9D8] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'}`}>
              {feedbackText}
              {feedback === 'error' ? ` - المحاولات الخاطئة: ${wrongAttempts}` : ''}
            </div>
          )}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-6xl font-bold text-[#2D1B3D]">{pairs[current].letter1}</div>
            <div className="text-6xl font-bold text-[#2D1B3D]">{pairs[current].letter2}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => handleAnswer(true)}
              className="py-4 bg-[#4ECDC4] text-white rounded-2xl font-bold text-xl hover:shadow-lg"
            >
              ✓ متطابقان
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="py-4 bg-[#FF6B5B] text-white rounded-2xl font-bold text-xl hover:shadow-lg"
            >
              ✗ مختلفان
            </button>
          </div>
          <p className="text-sm text-[#7A6B8F]">السؤال {current + 1} من {pairs.length}</p>
        </div>
      </div>
      <style>{`
        .animate-confetti-spark {
          animation: confetti-spark 1s ease-out forwards;
        }
        @keyframes confetti-spark {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-18px) rotate(25deg) scale(1.1); opacity: 1; }
          100% { transform: translateY(0) rotate(45deg) scale(0.9); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ============================================================================
// Sound to Letter Game
// ============================================================================
export function SoundToLetterGame() {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

  /*const items = [
    { letter: 'ا', sound: 'ألف' },
    { letter: 'ب', sound: 'باء' },
    { letter: 'ت', sound: 'تاء' },
    { letter: 'ث', sound: 'ثاء' },
    { letter: 'ج', sound: 'جيم' },
  ];*/
const items = [
  { letter: 'ا', sound: 'ألف' },
  { letter: 'ب', sound: 'باء' },
  { letter: 'ت', sound: 'تاء' },
  { letter: 'ث', sound: 'ثاء' },
  { letter: 'ج', sound: 'جيم' },
  { letter: 'ح', sound: 'حاء' },
  { letter: 'خ', sound: 'خاء' },
  { letter: 'د', sound: 'دال' },
  { letter: 'ذ', sound: 'ذال' },
  { letter: 'ر', sound: 'راء' },
  { letter: 'ز', sound: 'زاي' },
  { letter: 'س', sound: 'سين' },
  { letter: 'ش', sound: 'شين' },
  { letter: 'ص', sound: 'صاد' },
  { letter: 'ض', sound: 'ضاد' },
  { letter: 'ط', sound: 'طاء' },
  { letter: 'ظ', sound: 'ظاء' },
  { letter: 'ع', sound: 'عين' },
  { letter: 'غ', sound: 'غين' },
  { letter: 'ف', sound: 'فاء' },
  { letter: 'ق', sound: 'قاف' },
  { letter: 'ك', sound: 'كاف' },
  { letter: 'ل', sound: 'لام' },
  { letter: 'م', sound: 'ميم' },
  { letter: 'ن', sound: 'نون' },
  { letter: 'ه', sound: 'هاء' },
  { letter: 'و', sound: 'واو' },
  { letter: 'ي', sound: 'ياء' },
];
  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  React.useEffect(() => {
    const correct = items[current].letter;
    const distractors = items
      .filter(i => i.letter !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(i => i.letter);
    setOptions([correct, ...distractors].sort(() => Math.random() - 0.5));
  }, [current]);

  const handleAnswer = (letter: string) => {
    const isCorrect = letter === items[current].letter;
    if (isCorrect) {
      setScore(score + 1);
      setWrongAttempts(0);
      setFeedback('success');
      setFeedbackText(getRandomMessage(successMessages));
      playUISound('success');
      const nextIndex = current + 1;
      if (nextIndex >= items.length) {
        setRound(round + 1);
        setCurrent(0);
      } else {
        setCurrent(nextIndex);
      }
    } else {
      setWrongAttempts(wrongAttempts + 1);
      setFeedback('error');
      setFeedbackText(getRandomMessage(sadMessages));
      playUISound('error');
    }

    window.setTimeout(() => setFeedback(null), 1400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <p className="text-lg font-bold text-[#7A6B8F]">الجولة: {round + 1}</p>
          <h2 className="text-3xl font-bold text-[#2D1B3D]">🎵 الصوت للحرف</h2>
          <p className="text-lg font-bold text-[#4ECDC4]">النقاط: {score}</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#FFD93D] text-center">
          <p className="text-[#7A6B8F] mb-6">استمع للحرف واختره من الحروف أدناه</p>
          <button
            onClick={() => playLetterSound(items[current].letter)}
            className="px-8 py-4 bg-[#FF6B5B] text-white rounded-2xl font-bold text-xl hover:shadow-lg mb-8"
          >
            🔊 استمع للحرف
          </button>
          {feedback && (
            <div
              className={`mb-4 rounded-3xl p-4 text-sm font-bold ${
                feedback === 'success'
                  ? 'bg-[#D3F9D8] text-[#166534]'
                  : 'bg-[#FEE2E2] text-[#991B1B]'
              }`}
            >
              {feedbackText}
              {feedback === 'error' ? ` - المحاولات الخاطئة: ${wrongAttempts}` : ''}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {options.map((letter, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(letter)}
                className="py-6 bg-[#E8D4E8] text-[#2D1B3D] rounded-2xl font-bold text-3xl hover:bg-[#B8A8FF] hover:text-white transition-all"
              >
                {letter}
              </button>
            ))}
          </div>
          <p className="text-sm text-[#7A6B8F]">السؤال {current + 1} من {items.length}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Word Beginning Game
// ============================================================================
export function WordBeginningGame() {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  
  const words = [
  { word: 'أسد', letter: 'ا' },
  { word: 'بطة', letter: 'ب' },
  { word: 'تفاح', letter: 'ت' },
  { word: 'ثعلب', letter: 'ث' },
  { word: 'جمل', letter: 'ج' },
  { word: 'حصان', letter: 'ح' },
  { word: 'خبز', letter: 'خ' },
  { word: 'دب', letter: 'د' },
  { word: 'ذئب', letter: 'ذ' },
  { word: 'رجل', letter: 'ر' },
  { word: 'زرافة', letter: 'ز' },
  { word: 'سيارة', letter: 'س' },
  { word: 'شمس', letter: 'ش' },
  { word: 'صندوق', letter: 'ص' },
  { word: 'ضفدع', letter: 'ض' },
  { word: 'طائرة', letter: 'ط' },
  { word: 'ظل', letter: 'ظ' },
  { word: 'عصفور', letter: 'ع' },
  { word: 'غزال', letter: 'غ' },
  { word: 'فراولة', letter: 'ف' },
  { word: 'قطة', letter: 'ق' },
  { word: 'كلب', letter: 'ك' },
  { word: 'ليمون', letter: 'ل' },
  { word: 'موز', letter: 'م' },
  { word: 'نمر', letter: 'ن' },
  { word: 'هدهد', letter: 'ه' },
  { word: 'وردة', letter: 'و' },
  { word: 'يمامة', letter: 'ي' },
];

  const allLetters = ['ا','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ك','ل','م','ن','ه','و','ي'];
  const [current, setCurrent] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  React.useEffect(() => {
    const correct = words[current].letter;
    const distractors = allLetters
      .filter((letter) => letter !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setOptions([correct, ...distractors].sort(() => Math.random() - 0.5));
  }, [current]);

  const handleAnswer = (letter: string) => {
    const isCorrect = letter === words[current].letter;
    if (isCorrect) {
      setScore(score + 1);
      setWrongAttempts(0);
      setFeedback('success');
      setFeedbackText(getRandomMessage(successMessages));
      playUISound('success');
      const nextIndex = current + 1;
      if (nextIndex >= words.length) {
        setRound(round + 1);
        setCurrent(0);
      } else {
        setCurrent(nextIndex);
      }
    } else {
      setWrongAttempts(wrongAttempts + 1);
      setFeedback('error');
      setFeedbackText(getRandomMessage(sadMessages));
      playUISound('error');
    }
    window.setTimeout(() => setFeedback(null), 1400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <p className="text-lg font-bold text-[#7A6B8F]">الجولة: {round + 1}</p>
          <h2 className="text-3xl font-bold text-[#2D1B3D]">📖 صوت بداية الكلمة</h2>
          <p className="text-lg font-bold text-[#4ECDC4]">النقاط: {score}</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#4ECDC4] text-center">
          <p className="text-[#7A6B8F] mb-6">ما الحرف الأول للكلمة؟</p>
          <p className="text-5xl font-bold text-[#2D1B3D] mb-8">{words[current].word}</p>
          {feedback && (
            <div className={`mb-4 rounded-3xl p-4 text-sm font-bold ${feedback === 'success' ? 'bg-[#D3F9D8] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'}`}>
              {feedbackText}
              {feedback === 'error' ? ` - المحاولات الخاطئة: ${wrongAttempts}` : ''}
            </div>
          )}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {options.map((letter, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(letter)}
                className="py-4 bg-[#E8D4E8] text-[#2D1B3D] rounded-2xl font-bold text-2xl hover:bg-[#4ECDC4] hover:text-white transition-all"
              >
                {letter}
              </button>
            ))}
          </div>
          <p className="text-sm text-[#7A6B8F]">السؤال {current + 1} من {words.length}</p>
        </div>
      </div>
    </div>
  );
}
 



//============================================================================
// Rhyming Words Game
// ============================================================================
export function RhymingWordsGame() {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  /*const wordPairs = [
    { word1: 'قمر', word2: 'نمر', rhyme: true },
    { word1: 'بيت', word2: 'ليت', rhyme: true },
    { word1: 'ماء', word2: 'سماء', rhyme: true },
    { word1: 'كتاب', word2: 'نور', rhyme: false },
    { word1: 'شمس', word2: 'قمس', rhyme: true },
    { word1: 'حديقة', word2: 'سيارة', rhyme: false },
  ];*/
  const wordPairs = [
  { word1: 'قمر', word2: 'نمر', rhyme: false },
  { word1: 'بيت', word2: 'بيت', rhyme: true },
  { word1: 'ماء', word2: 'ماء', rhyme: true },
  { word1: 'شمس', word2: 'شمس', rhyme: true },

  { word1: 'كتاب', word2: 'كتاب', rhyme: false },
  { word1: 'حديقة', word2: 'سيارة', rhyme: false },

  { word1: 'بحر', word2: 'سحر', rhyme: false },
  { word1: 'فيل', word2: 'فيل', rhyme: true },
  { word1: 'قلم', word2: 'علم', rhyme: false },

  { word1: 'تفاح', word2: 'موز', rhyme: false },
  { word1: 'ورد', word2: 'نار', rhyme: false },

  { word1: 'نور', word2: 'نور', rhyme: true },
  { word1: 'كلب', word2: 'قطة', rhyme: false },

  { word1: 'فلاح', word2: 'فلاح', rhyme: true },
  { word1: 'صديق', word2: 'صديق', rhyme: true },

  { word1: 'شجرة', word2: 'بحر', rhyme: false },

  { word1: 'صوت', word2: 'موت', rhyme: false },
  { word1: 'سيف', word2: 'ضيف', rhyme: false },

  { word1: 'قلب', word2: 'حجر', rhyme: false },

  { word1: 'جميل', word2: 'جميل', rhyme: true },
  { word1: 'سريع', word2: 'بطيء', rhyme: false },

  { word1: 'نجم', word2: 'نجم', rhyme: true },
  { word1: 'درس', word2: 'قلم', rhyme: false },

  { word1: 'باب', word2: 'ناب', rhyme: false },
  { word1: 'ورد', word2: 'برد', rhyme: false },

  { word1: 'قمر', word2: 'قمر', rhyme: true },
  { word1: 'سماء', word2: 'أرض', rhyme: false },

  { word1: 'شمس', word2: 'قمر', rhyme: false },

  { word1: 'كتاب', word2: 'حساب', rhyme: false },
  { word1: 'باب', word2: 'قلم', rhyme: false },

  { word1: 'عين', word2: 'عين', rhyme: true },
  { word1: 'نور', word2: 'شمس', rhyme: false },
];

  const [current, setCurrent] = useState(0);

  const handleAnswer = (answer: boolean) => {
    const isCorrect = answer === wordPairs[current].rhyme;
    if (isCorrect) {
      setScore(score + 1);
      setWrongAttempts(0);
      setFeedback('success');
      setFeedbackText(getRandomMessage(successMessages));
      playUISound('success');
      const nextIndex = current + 1;
      if (nextIndex >= wordPairs.length) {
        setRound(round + 1);
        setCurrent(0);
      } else {
        setCurrent(nextIndex);
      }
    } else {
      setWrongAttempts(wrongAttempts + 1);
      setFeedback('error');
      setFeedbackText(getRandomMessage(sadMessages));
      playUISound('error');
    }
    window.setTimeout(() => setFeedback(null), 1400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <p className="text-lg font-bold text-[#7A6B8F]">الجولة: {round + 1}</p>
          <h2 className="text-3xl font-bold text-[#2D1B3D]">🎶 الكلمات المتشابهة</h2>
          <p className="text-lg font-bold text-[#4ECDC4]">النقاط: {score}</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#FFD93D] text-center">
          <p className="text-[#7A6B8F] mb-6">هل الكلمتان متشابهتان في النهاية؟</p>
          {feedback && (
            <div className={`mb-4 rounded-3xl p-4 text-sm font-bold ${feedback === 'success' ? 'bg-[#D3F9D8] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'}`}>
              {feedbackText}
              {feedback === 'error' ? ` - المحاولات الخاطئة: ${wrongAttempts}` : ''}
            </div>
          )}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-4xl font-bold text-[#2D1B3D]">{wordPairs[current].word1}</div>
            <div className="text-4xl font-bold text-[#2D1B3D]">{wordPairs[current].word2}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
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
          <p className="text-sm text-[#7A6B8F]">السؤال {current + 1} من {wordPairs.length}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Letter Sound Speed Game
// ============================================================================
export function LetterSoundSpeedGame() {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

  //const letters = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د'];
  const letters = [
  'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ',
  'د', 'ذ', 'ر', 'ز', 'س', 'ش',
  'ص', 'ض', 'ط', 'ظ',
  'ع', 'غ',
  'ف', 'ق', 'ك', 'ل', 'م', 'ن',
  'ه', 'و', 'ي'
];
  const [current, setCurrent] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [feedback, setFeedback] = useState<'success' | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const handleAnswer = () => {
    setScore(score + 1);
    setFeedback('success');
    setFeedbackText(getRandomMessage(successMessages));
    playUISound('success');
    const nextIndex = current + 1;
    if (nextIndex >= letters.length) {
      setRound(round + 1);
      setCurrent(0);
      setSpeed(Math.min(speed + 0.2, 2));
    } else {
      setCurrent(nextIndex);
    }
    window.setTimeout(() => setFeedback(null), 1400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <p className="text-lg font-bold text-[#7A6B8F]">السرعة: {speed.toFixed(1)}x</p>
          <h2 className="text-3xl font-bold text-[#2D1B3D]">⚡ سرعة الأصوات</h2>
          <p className="text-lg font-bold text-[#4ECDC4]">النقاط: {score}</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#B8A8FF] text-center">
          <p className="text-[#7A6B8F] mb-6">اضغط عند سماع الحرف</p>
          <p className="text-6xl font-bold text-[#FF6B5B] mb-8">{letters[current]}</p>
          <button
            onClick={handleAnswer}
            className="px-8 py-4 bg-[#4ECDC4] text-white rounded-2xl font-bold text-xl hover:shadow-lg"
          >
            ✓ سمعت الحرف
          </button>
          {feedback && (
            <div className="mt-4 rounded-3xl bg-[#D3F9D8] p-4 text-sm font-bold text-[#166534]">
              {feedbackText}
            </div>
          )}
          <p className="text-sm text-[#7A6B8F] mt-6">الحرف {current + 1} من {letters.length}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Syllable Blending Game
// ============================================================================
export function SyllableBlendingGame() {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [input, setInput] = useState('');

  /*const items = [
    { syllables: ['با', 'ب'], answer: 'باب' },
    { syllables: ['كت', 'اب'], answer: 'كتاب' },
    { syllables: ['مد', 'رسة'], answer: 'مدرسة' },
    { syllables: ['قا', 'ضي'], answer: 'قاضي' },
    { syllables: ['نا', 'ر'], answer: 'نار' },
    { syllables: ['ما', 'ء'], answer: 'ماء' },
  ];*/
  const items = [
  { syllables: ['با', 'ب'], answer: 'باب' },
  { syllables: ['كت', 'اب'], answer: 'كتاب' },
  { syllables: ['مد', 'رسة'], answer: 'مدرسة' },
  { syllables: ['قا', 'ضي'], answer: 'قاضي' },
  { syllables: ['نا', 'ر'], answer: 'نار' },
  { syllables: ['ما', 'ء'], answer: 'ماء' },

  { syllables: ['قل', 'م'], answer: 'قلم' },
  { syllables: ['دف', 'تر'], answer: 'دفتر' },
  { syllables: ['سب', 'و', 'رة'], answer: 'سبورة' },
  { syllables: ['طا', 'ول', 'ة'], answer: 'طاولة' },
  { syllables: ['كر', 'سي'], answer: 'كرسي' },

  { syllables: ['ش', 'مس'], answer: 'شمس' },
  { syllables: ['ق', 'مر'], answer: 'قمر' },
  { syllables: ['ن', 'جم'], answer: 'نجم' },
  { syllables: ['س', 'ما', 'ء'], answer: 'سماء' },

  { syllables: ['أ', 'سد'], answer: 'أسد' },
  { syllables: ['ن', 'مر'], answer: 'نمر' },
  { syllables: ['ف', 'يل'], answer: 'فيل' },
  { syllables: ['ج', 'مل'], answer: 'جمل' },
  { syllables: ['أر', 'نب'], answer: 'أرنب' },

  { syllables: ['سي', 'ا', 'رة'], answer: 'سيارة' },
  { syllables: ['طا', 'ئ', 'رة'], answer: 'طائرة' },
  { syllables: ['در', 'ا', 'جة'], answer: 'دراجة' },

  { syllables: ['تف', 'اح'], answer: 'تفاح' },
  { syllables: ['مو', 'ز'], answer: 'موز' },
  { syllables: ['عن', 'ب'], answer: 'عنب' },
  { syllables: ['تو', 'ت'], answer: 'توت' },
  { syllables: ['ر', 'ما', 'ن'], answer: 'رمان' },

  { syllables: ['بي', 'ت'], answer: 'بيت' },
  { syllables: ['غر', 'فة'], answer: 'غرفة' },
  { syllables: ['با', 'ب'], answer: 'باب' },
  { syllables: ['سر', 'ير'], answer: 'سرير' },

  { syllables: ['و', 'رد', 'ة'], answer: 'وردة' },
  { syllables: ['زه', 'رة'], answer: 'زهرة' },
  { syllables: ['ش', 'جر', 'ة'], answer: 'شجرة' },

  { syllables: ['س', 'مك'], answer: 'سمك' },
  { syllables: ['ط', 'ير'], answer: 'طير' },
  { syllables: ['بط', 'ة'], answer: 'بطة' },

  { syllables: ['ح', 'ليب'], answer: 'حليب' },
  { syllables: ['خب', 'ز'], answer: 'خبز' },
  { syllables: ['جب', 'ن'], answer: 'جبن' },

  { syllables: ['ل', 'يل'], answer: 'ليل' },
  { syllables: ['نه', 'ار'], answer: 'نهار' },

  { syllables: ['ص', 'وت'], answer: 'صوت' },
  { syllables: ['لو', 'ن'], answer: 'لون' },
  { syllables: ['عل', 'م'], answer: 'علم' },
  { syllables: ['لع', 'ب'], answer: 'لعب' },
];
  const [current, setCurrent] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = () => {
    if (input === items[current].answer) {
      setScore(score + 1);
      setWrongAttempts(0);
      setFeedback('success');
      setFeedbackText(getRandomMessage(successMessages));
      playUISound('success');
      const nextIndex = current + 1;
      if (nextIndex >= items.length) {
        setRound(round + 1);
        setCurrent(0);
      } else {
        setCurrent(nextIndex);
      }
      setInput('');
    } else {
      setWrongAttempts(wrongAttempts + 1);
      setFeedback('error');
      setFeedbackText(getRandomMessage(sadMessages));
      playUISound('error');
      setInput('');
    }
    window.setTimeout(() => setFeedback(null), 1400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <p className="text-lg font-bold text-[#7A6B8F]">الجولة: {round + 1}</p>
          <h2 className="text-3xl font-bold text-[#2D1B3D]">🔗 دمج المقاطع</h2>
          <p className="text-lg font-bold text-[#4ECDC4]">النقاط: {score}</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#4ECDC4] text-center">
          <p className="text-[#7A6B8F] mb-6">اجمع المقاطع لتكوين الكلمة</p>
          <div className="flex justify-center gap-4 mb-8">
            {items[current].syllables.map((syl, i) => (
              <div
                key={i}
                className="px-6 py-4 bg-[#FFD93D] text-[#2D1B3D] rounded-xl font-bold text-2xl"
              >
                {syl}
              </div>
            ))}
          </div>
          {feedback && (
            <div className={`mb-4 rounded-3xl p-4 text-sm font-bold ${feedback === 'success' ? 'bg-[#D3F9D8] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'}`}>
              {feedbackText}
              {feedback === 'error' ? ` - المحاولات الخاطئة: ${wrongAttempts}` : ''}
            </div>
          )}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب الكلمة"
            className="w-full p-4 border-2 border-[#E8D4E8] rounded-xl text-center text-2xl mb-4"
            dir="rtl"
          />
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-[#FF6B5B] text-white rounded-xl font-bold mb-4"
          >
            تحقق
          </button>
          <p className="text-sm text-[#7A6B8F]">السؤال {current + 1} من {items.length}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Word Formation Game
// ============================================================================
export function WordFormationGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">📝 تكوين الكلمات</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#FFD93D] text-center">
          <p className="text-[#7A6B8F] mb-6">رتب الحروف لتكوين كلمة صحيحة</p>
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Sound Sequence Game
// ============================================================================
export function SoundSequenceGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">🎼 تسلسل الأصوات</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#B8A8FF] text-center">
          <p className="text-[#7A6B8F] mb-6">رتب الأصوات لتكوين كلمة</p>
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Word Search Game - REDESIGNED
// ============================================================================
export function WordSearchGame() {
  const [score, setScore] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  //const allWords = ['كتب', 'نور', 'مدرسة', 'قلم', 'بيت', 'شمس', 'قمر', 'نمر'];
  const allWords = [
  'كتب', 'نور', 'مدرسة', 'قلم', 'بيت', 'شمس', 'قمر', 'نمر',
  'أسد', 'فيل', 'جمل', 'أرنب', 'بطة', 'سمك', 'طير',
  'تفاح', 'موز', 'عنب', 'توت', 'رمان', 'ليمون', 'برتقال',
  'خبز', 'حليب', 'جبن', 'ماء',
  'سيارة', 'قطار', 'طائرة', 'دراجة',
  'باب', 'نافذة', 'غرفة', 'سرير', 'كرسي', 'طاولة',
  'شجرة', 'زهرة', 'وردة', 'حديقة',
  'ليل', 'نهار', 'صباح', 'مساء',
  'نجم', 'سماء', 'بحر', 'نهر',
  'صوت', 'لون', 'علم', 'لعب',
  'كتاب', 'دفتر', 'سبورة',
  'قطة', 'كلب', 'حصان', 'غزال', 'ذئب',
  'رجل', 'طفل', 'أم', 'أب',
  'عمل', 'درس', 'نجاح', 'فشل',
  'طعام', 'شراب', 'فاكهة',
  'صندوق', 'مفتاح', 'هاتف',
];
  const targetWord = allWords[currentRound % allWords.length];
  const targetLength = targetWord.length;
  
  // Generate random letters with target word letters mixed in
  const generateGrid = (word: string) => {
    const letters = word.split('');
    //const allLetters = ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط'];
    const allLetters = [
      'ا','ب','ت','ث','ج','ح','خ',
      'د','ذ','ر','ز','س','ش',
      'ص','ض','ط','ظ',
      'ع','غ',
      'ف','ق','ك','ل','م','ن',
      'ه','و','ي'
    ];    
    // Add target letters multiple times
    const grid = [...letters, ...letters];
    const gridSize = Math.max(12, letters.length * 2 + 4);
    // Add random letters
    while (grid.length < gridSize) {
      const randomLetter =
        allLetters[Math.floor(Math.random() * allLetters.length)];
      grid.push(randomLetter);
    }
    
    // Shuffle
    for (let i = grid.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [grid[i], grid[j]] = [grid[j], grid[i]];
    }

    return grid;
  };

  const [grid, setGrid] = React.useState(generateGrid(targetWord));

  const handleLetterClick = (index: number) => {
    if (selectedLetters.includes(index)) {
      setSelectedLetters(selectedLetters.filter(i => i !== index));
    } else if (selectedLetters.length < targetLength) {
      setSelectedLetters([...selectedLetters, index]);
    }
  };

  const handleCheckWord = () => {
    const word = selectedLetters.map(i => grid[i]).join('');
    if (word === targetWord) {
      setScore(score + 1);
      setFoundCount(foundCount + 1);
      setWrongAttempts(0);
      setFeedback('success');
      setFeedbackText(getRandomMessage(successMessages));
      playUISound('success');
      
      if (foundCount + 1 >= 3) {
        // Move to next round after finding 3 times
        setTimeout(() => {
          const newRound = currentRound + 1;
          const newTargetWord = allWords[newRound % allWords.length];
          setCurrentRound(newRound);
          setFoundCount(0);
          setSelectedLetters([]);
          setGrid(generateGrid(newTargetWord));
        }, 800);
      } else {
        setSelectedLetters([]);
        setGrid(generateGrid(targetWord));
      }
    } else {
      setWrongAttempts(wrongAttempts + 1);
      setFeedback('error');
      setFeedbackText(getRandomMessage(sadMessages));
      playUISound('error');
      setSelectedLetters([]);
    }
    window.setTimeout(() => setFeedback(null), 1400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <p className="text-lg font-bold text-[#7A6B8F]">الجولة: {currentRound + 1}</p>
          <h2 className="text-3xl font-bold text-[#2D1B3D]">🔍 البحث عن الكلمات</h2>
          <p className="text-lg font-bold text-[#4ECDC4]">النقاط: {score}</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#4ECDC4] text-center">
          {/* Target Word Display */}
          <div className="mb-6 p-4 bg-[#FFD93D] rounded-xl">
            <p className="text-[#2D1B3D] font-bold mb-2">🎯 ابحث عن:</p>
            <p className="text-6xl font-bold text-[#2D1B3D] border-4 border-white rounded-lg p-4 bg-white shadow-lg">{targetWord}</p>
            <p className="text-sm text-[#7A6B8F] mt-2">المرات المتبقية: {3 - foundCount}</p>
          </div>
          {feedback && (
            <div className={`mb-4 rounded-3xl p-4 text-sm font-bold ${feedback === 'success' ? 'bg-[#D3F9D8] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'}`}>
              {feedbackText}
              {feedback === 'error' ? ` - المحاولات الخاطئة: ${wrongAttempts}` : ''}
            </div>
          )}
          
          <div className="grid grid-cols-4 gap-2 mb-8 font-bold text-2xl">
            {grid.map((letter, i) => (
              <button
                key={i}
                onClick={() => handleLetterClick(i)}
                className={`p-3 rounded-lg transition-all ${
                  selectedLetters.includes(i)
                    ? 'bg-[#FFD93D] text-[#2D1B3D] scale-110'
                    : 'bg-[#E8D4E8] hover:bg-[#4ECDC4] hover:text-white'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
          <button
            onClick={handleCheckWord}
            className="w-full py-3 bg-[#FF6B5B] text-white rounded-xl font-bold mb-4"
          >
            تحقق من الكلمة
          </button>
          <p className="text-sm text-[#7A6B8F]">اختر {targetLength} حرفاً</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Word Recognition Game
// ============================================================================
export function WordRecognitionGame() {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<{word: string, correct: boolean}[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const words = [
    { word: 'كتاب', correct: true },
    { word: 'تابك', correct: false },
    { word: 'مدرسة', correct: true },
    { word: 'مدرسةس', correct: false },
    { word: 'قلم', correct: true },
    { word: 'لقم', correct: false },
    { word: 'بيت', correct: true },
    { word: 'تيب', correct: false },
    { word: 'شمس', correct: true },
    { word: 'مشمس', correct: false },
    { word: 'قمر', correct: true },
    { word: 'مرق', correct: false },
    { word: 'أسد', correct: true },
    { word: 'سأد', correct: false },
    { word: 'فيل', correct: true },
    { word: 'ليف', correct: false },
    { word: 'جمل', correct: true },
    { word: 'ملج', correct: false },
    { word: 'أرنب', correct: true },
    { word: 'نأرب', correct: false },
    { word: 'بطة', correct: true },
    { word: 'طةب', correct: false },
    { word: 'سمك', correct: true },
    { word: 'كسم', correct: false },
    { word: 'طير', correct: true },
    { word: 'ريط', correct: false },
    { word: 'تفاح', correct: true },
    { word: 'حتفا', correct: false },
    { word: 'موز', correct: true },
    { word: 'زوم', correct: false },
    { word: 'عنب', correct: true },
    { word: 'بنع', correct: false },
    { word: 'خبز', correct: true },
    { word: 'زبخ', correct: false },
    { word: 'حليب', correct: true },
    { word: 'بيحل', correct: false },
    { word: 'جبن', correct: true },
    { word: 'نجب', correct: false },
    { word: 'ماء', correct: true },
    { word: 'ءام', correct: false },
    { word: 'سيارة', correct: true },
    { word: 'رةسيا', correct: false },
    { word: 'قطار', correct: true },
    { word: 'رطاق', correct: false },
    { word: 'طائرة', correct: true },
    { word: 'رةطائ', correct: false },
    { word: 'دراجة', correct: true },
    { word: 'جةدار', correct: false },
    { word: 'باب', correct: true },
    { word: 'باب', correct: false },
    { word: 'نافذة', correct: true },
    { word: 'ذةفان', correct: false },
    { word: 'غرفة', correct: true },
    { word: 'فةغر', correct: false },
    { word: 'سرير', correct: true },
    { word: 'ريرس', correct: false },
    { word: 'كرسي', correct: true },
    { word: 'سيكر', correct: false },
    { word: 'طاولة', correct: true },
    { word: 'لةطاو', correct: false },
    { word: 'شجرة', correct: true },
    { word: 'رةشج', correct: false },
    { word: 'زهرة', correct: true },
    { word: 'رةزه', correct: false },
    { word: 'وردة', correct: true },
    { word: 'دةور', correct: false },
    { word: 'حديقة', correct: true },
    { word: 'قةحدي', correct: false },
    { word: 'ليل', correct: true },
    { word: 'ليل', correct: false },
    { word: 'نهار', correct: true },
    { word: 'رهان', correct: false },
    { word: 'صباح', correct: true },
    { word: 'حصبأ', correct: false },
    { word: 'مساء', correct: true },
    { word: 'ءاسم', correct: false },
    { word: 'نجم', correct: true },
    { word: 'مجن', correct: false },
    { word: 'سماء', correct: true },
    { word: 'ءامس', correct: false },
    { word: 'بحر', correct: true },
    { word: 'رحب', correct: false },
    { word: 'نهر', correct: true },
    { word: 'هرن', correct: false },
    { word: 'صوت', correct: true },
    { word: 'توص', correct: false },
    { word: 'لون', correct: true },
    { word: 'نول', correct: false },
    { word: 'علم', correct: true },
    { word: 'ملع', correct: false },
    { word: 'لعب', correct: true },
    { word: 'عبل', correct: false },
    { word: 'دفتر', correct: true },
    { word: 'رفدت', correct: false },
    { word: 'سبورة', correct: true },
    { word: 'رةسبو', correct: false },
    { word: 'قطة', correct: true },
    { word: 'طةق', correct: false },
    { word: 'كلب', correct: true },
    { word: 'بكل', correct: false },
    { word: 'حصان', correct: true },
    { word: 'ناحص', correct: false },
    { word: 'غزال', correct: true },
    { word: 'لازغ', correct: false },
    { word: 'ذئب', correct: true },
    { word: 'بئذ', correct: false },
    { word: 'رجل', correct: true },
    { word: 'لجر', correct: false },
    { word: 'طفل', correct: true },
    { word: 'لطف', correct: false },
    { word: 'أم', correct: true },
    { word: 'مأ', correct: false },
    { word: 'أب', correct: true },
    { word: 'بأ', correct: false },
    { word: 'عمل', correct: true },
    { word: 'لمع', correct: false },
    { word: 'درس', correct: true },
    { word: 'سرد', correct: false },
    { word: 'نجاح', correct: true },
    { word: 'حجان', correct: false },
    { word: 'فشل', correct: true },
    { word: 'لشف', correct: false },
    { word: 'طعام', correct: true },
    { word: 'ماطع', correct: false },
    { word: 'شراب', correct: true },
    { word: 'بارش', correct: false },
    { word: 'فاكهة', correct: true },
    { word: 'هةفاك', correct: false },
    { word: 'صندوق', correct: true },
    { word: 'قوصند', correct: false },
    { word: 'مفتاح', correct: true },
    { word: 'حافتم', correct: false },
    { word: 'هاتف', correct: true },
    { word: 'فتهاه', correct: false },
  ];
  const [current, setCurrent] = useState(0);

  React.useEffect(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
  }, []);

  const handleAnswer = (answer: boolean) => {
    const isCorrect = answer === shuffledWords[current].correct;
    if (isCorrect) {
      setScore(score + 1);
      setWrongAttempts(0);
      setFeedback('success');
      setFeedbackText(getRandomMessage(successMessages));
      playUISound('success');
      const nextIndex = current + 1;
      if (nextIndex >= shuffledWords.length) {
        setRound(round + 1);
        setCurrent(0);
      } else {
        setCurrent(nextIndex);
      }
    } else {
      setWrongAttempts(wrongAttempts + 1);
      setFeedback('error');
      setFeedbackText(getRandomMessage(sadMessages));
      playUISound('error');
    }
    window.setTimeout(() => setFeedback(null), 1400);
  };

  if (shuffledWords.length === 0) return null; // Loading

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <p className="text-lg font-bold text-[#7A6B8F]">الجولة: {round + 1}</p>
          <h2 className="text-3xl font-bold text-[#2D1B3D]">📖 التعرف على الكلمات</h2>
          <p className="text-lg font-bold text-[#4ECDC4]">النقاط: {score}</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#B8A8FF] text-center">
          <p className="text-[#7A6B8F] mb-6">هل هذه كلمة عربية صحيحة؟</p>
          {feedback && (
            <div className={`mb-4 rounded-3xl p-4 text-sm font-bold ${feedback === 'success' ? 'bg-[#D3F9D8] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'}`}>
              {feedbackText}
              {feedback === 'error' ? ` - المحاولات الخاطئة: ${wrongAttempts}` : ''}
            </div>
          )}
          <p className="text-5xl font-bold text-[#2D1B3D] mb-8">{shuffledWords[current].word}</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => handleAnswer(true)}
              className="py-4 bg-[#4ECDC4] text-white rounded-2xl font-bold text-xl hover:shadow-lg"
            >
              ✓ نعم
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="py-4 bg-[#FF6B5B] text-white rounded-2xl font-bold text-xl hover:shadow-lg"
            >
              ✗ لا
            </button>
          </div>
          <p className="text-sm text-[#7A6B8F]">الكلمة {current + 1} من {shuffledWords.length}</p>
        </div>
      </div>
    </div>
  );
}


// ============================================================================
// Placeholder Game
// ============================================================================
export function PlaceholderGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <h2 className="text-3xl font-bold text-[#2D1B3D] text-center mb-8">🎮 لعبة</h2>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#B8A8FF] text-center">
          <p className="text-[#7A6B8F] mb-6">هذه اللعبة قيد التطوير</p>
          <p className="text-[#7A6B8F] mt-6">قريباً...</p>
        </div>
      </div>
    </div>
  );
}
