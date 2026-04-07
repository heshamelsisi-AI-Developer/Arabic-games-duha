import React, { useState } from 'react';
import { playUISound } from '@/lib/audioManager';

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

  const handleAnswer = (answer: boolean) => {
    const isCorrect = answer === pairs[current].match;
    if (isCorrect) {
      setScore(score + 1);
      playUISound('success');
    } else {
      playUISound('error');
    }
    const nextIndex = current + 1;
    if (nextIndex >= pairs.length) {
      setRound(round + 1);
      setCurrent(0);
    } else {
      setCurrent(nextIndex);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#F8F3FF] p-8">
      <div className="container max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <p className="text-lg font-bold text-[#7A6B8F]">الجولة: {round + 1}</p>
          <h2 className="text-3xl font-bold text-[#2D1B3D]">🎴 مطابقة الحروف</h2>
          <p className="text-lg font-bold text-[#4ECDC4]">النقاط: {score}</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-lg border-4 border-[#B8A8FF] text-center">
          <p className="text-[#7A6B8F] mb-6">هل الحرفان متطابقان؟</p>
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

  React.useEffect(() => {
    const shuffled = [...items].sort(() => Math.random() - 0.5).slice(0, 4);
    setOptions(shuffled.map(i => i.letter));
  }, [current]);

  const handleAnswer = (letter: string) => {
    const isCorrect = letter === items[current].letter;
    if (isCorrect) {
      setScore(score + 1);
      playUISound('success');
    } else {
      playUISound('error');
    }
    const nextIndex = current + 1;
    if (nextIndex >= items.length) {
      setRound(round + 1);
      setCurrent(0);
    } else {
      setCurrent(nextIndex);
    }
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
          <p className="text-[#7A6B8F] mb-6">اختر الحرف الصحيح</p>
          <p className="text-4xl font-bold text-[#FF6B5B] mb-8">{items[current].sound}</p>
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

  const [current, setCurrent] = useState(0);

  const handleAnswer = (letter: string) => {
    const isCorrect = letter === words[current].letter;
    if (isCorrect) {
      setScore(score + 1);
      playUISound('success');
    } else {
      playUISound('error');
    }
    const nextIndex = current + 1;
    if (nextIndex >= words.length) {
      setRound(round + 1);
      setCurrent(0);
    } else {
      setCurrent(nextIndex);
    }
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
          <div className="grid grid-cols-3 gap-3 mb-8">
            {['ا', 'ب', 'ت', 'ث', 'ج', 'ح'].map((letter, i) => (
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

// ============================================================================
// Rhyming Words Game
// ============================================================================
export function RhymingWordsGame() {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);

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
      playUISound('success');
    } else {
      playUISound('error');
    }
    const nextIndex = current + 1;
    if (nextIndex >= wordPairs.length) {
      setRound(round + 1);
      setCurrent(0);
    } else {
      setCurrent(nextIndex);
    }
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

  const handleAnswer = () => {
    setScore(score + 1);
    playUISound('success');
    const nextIndex = current + 1;
    if (nextIndex >= letters.length) {
      setRound(round + 1);
      setCurrent(0);
      setSpeed(Math.min(speed + 0.2, 2));
    } else {
      setCurrent(nextIndex);
    }
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

  const handleSubmit = () => {
    if (input === items[current].answer) {
      setScore(score + 1);
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
      playUISound('error');
      setInput('');
    }
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
  const generateGrid = () => {
    const letters = targetWord.split('');
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
    //const grid = [...letters, ...letters];
    const grid = [...letters];
    const gridSize = Math.max(12, letters.length + 4);
    // Add random letters
    /*while (grid.length < 12) {
      const randomLetter = allLetters[Math.floor(Math.random() * allLetters.length)];
      grid.push(randomLetter);
    }*/
    while (grid.length < gridSize) {
      const randomLetter =
        allLetters[Math.floor(Math.random() * allLetters.length)];
      grid.push(randomLetter);
    }
    
    // Shuffle
    //return grid.sort(() => Math.random() - 0.5);
    // 4. Shuffle محترم
    for (let i = grid.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [grid[i], grid[j]] = [grid[j], grid[i]];
    }

    return grid;
  };

  const [grid, setGrid] = React.useState(generateGrid());

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
      playUISound('success');
      
      if (foundCount + 1 >= 3) {
        // Move to next round after finding 3 times
        setTimeout(() => {
          setCurrentRound(currentRound + 1);
          setFoundCount(0);
          setSelectedLetters([]);
          setGrid(generateGrid());
        }, 800);
      } else {
        setSelectedLetters([]);
        setGrid(generateGrid());
      }
    } else {
      playUISound('error');
      setSelectedLetters([]);
    }
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
            <p className="text-4xl font-bold text-[#2D1B3D]">{targetWord}</p>
            <p className="text-sm text-[#7A6B8F] mt-2">عدد المرات المتبقية: {3 - foundCount}</p>
          </div>
          
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
          <p className="text-sm text-[#7A6B8F]">اختر {targetLength} حروف</p>
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

  const words = ['كتاب', 'مدرسة', 'قلم', 'بيت', 'شمس', 'قمر'];
  const [current, setCurrent] = useState(0);

  const handleAnswer = (answer: boolean) => {
    const isCorrect = answer === true;
    if (isCorrect) {
      setScore(score + 1);
      playUISound('success');
    } else {
      playUISound('error');
    }
    const nextIndex = current + 1;
    if (nextIndex >= words.length) {
      setRound(round + 1);
      setCurrent(0);
    } else {
      setCurrent(nextIndex);
    }
  };

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
          <p className="text-5xl font-bold text-[#2D1B3D] mb-8">{words[current]}</p>
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
          <p className="text-sm text-[#7A6B8F]">الكلمة {current + 1} من {words.length}</p>
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
