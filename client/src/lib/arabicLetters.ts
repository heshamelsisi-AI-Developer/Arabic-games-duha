/**
 * Arabic Letters Data
 * Contains all 28 Arabic letters with their names, pronunciations, and related words
 * Design: Playful & Vibrant
 */

export interface ArabicLetter {
  letter: string;
  name: string;
  nameEnglish: string;
  pronunciation: string;
  example: string;
  exampleMeaning: string;
  emoji: string;
}

export const ARABIC_LETTERS: ArabicLetter[] = [
  {
    letter: 'ا',
    name: 'ألف',
    nameEnglish: 'Alef',
    pronunciation: 'alef',
    example: 'أرنب',
    exampleMeaning: 'Rabbit',
    emoji: '🐰',
  },
  {
    letter: 'ب',
    name: 'باء',
    nameEnglish: 'Ba',
    pronunciation: 'ba',
    example: 'بطة',
    exampleMeaning: 'Duck',
    emoji: '🦆',
  },
  {
    letter: 'ت',
    name: 'تاء',
    nameEnglish: 'Ta',
    pronunciation: 'ta',
    example: 'تمساح',
    exampleMeaning: 'Crocodile',
    emoji: '🐊',
  },
  {
    letter: 'ث',
    name: 'ثاء',
    nameEnglish: 'Tha',
    pronunciation: 'tha',
    example: 'ثعلب',
    exampleMeaning: 'Fox',
    emoji: '🦊',
  },
  {
    letter: 'ج',
    name: 'جيم',
    nameEnglish: 'Jeem',
    pronunciation: 'jeem',
    example: 'جمل',
    exampleMeaning: 'Camel',
    emoji: '🐪',
  },
  {
    letter: 'ح',
    name: 'حاء',
    nameEnglish: 'Ha',
    pronunciation: 'ha',
    example: 'حصان',
    exampleMeaning: 'Horse',
    emoji: '🐴',
  },
  {
    letter: 'خ',
    name: 'خاء',
    nameEnglish: 'Kha',
    pronunciation: 'kha',
    example: 'خيار',
    exampleMeaning: 'Cucumber',
    emoji: '🥒',
  },
  {
    letter: 'د',
    name: 'دال',
    nameEnglish: 'Dal',
    pronunciation: 'dal',
    example: 'دب',
    exampleMeaning: 'Bear',
    emoji: '🐻',
  },
  {
    letter: 'ذ',
    name: 'ذال',
    nameEnglish: 'Dhal',
    pronunciation: 'dhal',
    example: 'ذهب',
    exampleMeaning: 'Gold',
    emoji: '✨',
  },
  {
    letter: 'ر',
    name: 'راء',
    nameEnglish: 'Ra',
    pronunciation: 'ra',
    example: 'رمان',
    exampleMeaning: 'Pomegranate',
    emoji: '🍎',
  },
  {
    letter: 'ز',
    name: 'زاي',
    nameEnglish: 'Zay',
    pronunciation: 'zay',
    example: 'زرافة',
    exampleMeaning: 'Giraffe',
    emoji: '🦒',
  },
  {
    letter: 'س',
    name: 'سين',
    nameEnglish: 'Seen',
    pronunciation: 'seen',
    example: 'سمك',
    exampleMeaning: 'Fish',
    emoji: '🐠',
  },
  {
    letter: 'ش',
    name: 'شين',
    nameEnglish: 'Sheen',
    pronunciation: 'sheen',
    example: 'شمس',
    exampleMeaning: 'Sun',
    emoji: '☀️',
  },
  {
    letter: 'ص',
    name: 'صاد',
    nameEnglish: 'Sad',
    pronunciation: 'sad',
    example: 'صقر',
    exampleMeaning: 'Falcon',
    emoji: '🦅',
  },
  {
    letter: 'ض',
    name: 'ضاد',
    nameEnglish: 'Dad',
    pronunciation: 'dad',
    example: 'ضفدع',
    exampleMeaning: 'Frog',
    emoji: '🐸',
  },
  {
    letter: 'ط',
    name: 'طاء',
    nameEnglish: 'Ta',
    pronunciation: 'ta',
    example: 'طاووس',
    exampleMeaning: 'Peacock',
    emoji: '🦚',
  },
  {
    letter: 'ظ',
    name: 'ظاء',
    nameEnglish: 'Dha',
    pronunciation: 'dha',
    example: 'ظبي',
    exampleMeaning: 'Gazelle',
    emoji: '🦌',
  },
  {
    letter: 'ع',
    name: 'عين',
    nameEnglish: 'Ayn',
    pronunciation: 'ayn',
    example: 'عقاب',
    exampleMeaning: 'Eagle',
    emoji: '🦅',
  },
  {
    letter: 'غ',
    name: 'غين',
    nameEnglish: 'Ghayn',
    pronunciation: 'ghayn',
    example: 'غزال',
    exampleMeaning: 'Deer',
    emoji: '🦌',
  },
  {
    letter: 'ف',
    name: 'فاء',
    nameEnglish: 'Fa',
    pronunciation: 'fa',
    example: 'فراشة',
    exampleMeaning: 'Butterfly',
    emoji: '🦋',
  },
  {
    letter: 'ق',
    name: 'قاف',
    nameEnglish: 'Qaf',
    pronunciation: 'qaf',
    example: 'قط',
    exampleMeaning: 'Cat',
    emoji: '🐱',
  },
  {
    letter: 'ك',
    name: 'كاف',
    nameEnglish: 'Kaf',
    pronunciation: 'kaf',
    example: 'كلب',
    exampleMeaning: 'Dog',
    emoji: '🐕',
  },
  {
    letter: 'ل',
    name: 'لام',
    nameEnglish: 'Lam',
    pronunciation: 'lam',
    example: 'ليمون',
    exampleMeaning: 'Lemon',
    emoji: '🍋',
  },
  {
    letter: 'م',
    name: 'ميم',
    nameEnglish: 'Meem',
    pronunciation: 'meem',
    example: 'موز',
    exampleMeaning: 'Banana',
    emoji: '🍌',
  },
  {
    letter: 'ن',
    name: 'نون',
    nameEnglish: 'Noon',
    pronunciation: 'noon',
    example: 'نحلة',
    exampleMeaning: 'Bee',
    emoji: '🐝',
  },
  {
    letter: 'ه',
    name: 'هاء',
    nameEnglish: 'Ha',
    pronunciation: 'ha',
    example: 'هدية',
    exampleMeaning: 'Gift',
    emoji: '🎁',
  },
  {
    letter: 'و',
    name: 'واو',
    nameEnglish: 'Waw',
    pronunciation: 'waw',
    example: 'وردة',
    exampleMeaning: 'Rose',
    emoji: '🌹',
  },
  {
    letter: 'ي',
    name: 'ياء',
    nameEnglish: 'Ya',
    pronunciation: 'ya',
    example: 'يقطين',
    exampleMeaning: 'Pumpkin',
    emoji: '🎃',
  },
];

// Helper function to get random letters
export const getRandomLetters = (count: number, exclude?: string[]): ArabicLetter[] => {
  let available = ARABIC_LETTERS;
  if (exclude) {
    available = available.filter(l => !exclude.includes(l.letter));
  }
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper function to get a specific letter
export const getLetterByChar = (char: string): ArabicLetter | undefined => {
  return ARABIC_LETTERS.find(l => l.letter === char);
};

// Get all letters for a game
export const getAllLetters = (): ArabicLetter[] => {
  return ARABIC_LETTERS;
};
