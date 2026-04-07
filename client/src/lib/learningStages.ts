/**
 * Learning Stages Configuration
 * Design: Playful & Vibrant
 * 
 * Organizes games into 6 progressive learning stages
 * Each stage builds on the previous one
 */

export interface Game {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  descriptionArabic: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  targetAge: string;
  skills: string[];
}

export interface LearningStage {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  descriptionArabic: string;
  icon: string;
  color: string;
  order: number;
  games: Game[];
}

export const LEARNING_STAGES: LearningStage[] = [
  {
    id: 'recognition',
    name: 'Recognition',
    nameArabic: 'التعرف على الحروف',
    description: 'Learn to identify and recognize Arabic letters',
    descriptionArabic: 'تعلم التعرف على الحروف العربية وتمييزها',
    icon: '👁️',
    color: '#4ECDC4',
    order: 1,
    games: [
      {
        id: 'flashcards',
        name: 'Flashcards',
        nameArabic: 'البطاقات الملونة',
        description: 'Listen and select the correct letter',
        descriptionArabic: 'استمع واختر الحرف الصحيح',
        icon: '🎴',
        difficulty: 'easy',
        targetAge: '3-4',
        skills: ['listening', 'recognition', 'matching'],
      },
      {
        id: 'memory',
        name: 'Memory Game',
        nameArabic: 'لعبة الذاكرة',
        description: 'Find matching letter pairs',
        descriptionArabic: 'ابحث عن الحروف المتطابقة',
        icon: '🎲',
        difficulty: 'easy',
        targetAge: '3-5',
        skills: ['memory', 'recognition', 'concentration'],
      },
      {
        id: 'letter-puzzle',
        name: 'Letter Puzzle',
        nameArabic: 'لغز الحروف',
        description: 'Assemble letter pieces to form complete letters',
        descriptionArabic: 'اجمع أجزاء الحروف لتكوين الحرف الكامل',
        icon: '🧩',
        difficulty: 'easy',
        targetAge: '4-5',
        skills: ['spatial-awareness', 'recognition', 'fine-motor'],
      },
      {
        id: 'hidden-letter',
        name: 'Hidden Letter',
        nameArabic: 'البحث عن الحرف',
        description: 'Find all instances of a target letter',
        descriptionArabic: 'ابحث عن جميع الحروف المطلوبة',
        icon: '🔍',
        difficulty: 'medium',
        targetAge: '4-6',
        skills: ['visual-scanning', 'recognition', 'speed'],
      },
      {
        id: 'letter-matching',
        name: 'Letter Matching',
        nameArabic: 'مطابقة الحروف',
        description: 'Match uppercase with lowercase letters',
        descriptionArabic: 'طابق الحروف الكبيرة مع الصغيرة',
        icon: '🔗',
        difficulty: 'medium',
        targetAge: '4-6',
        skills: ['recognition', 'matching', 'letter-forms'],
      },
    ],
  },
  {
    id: 'phonics',
    name: 'Phonics',
    nameArabic: 'ربط الصوت بالحرف',
    description: 'Connect letter sounds to visual representations',
    descriptionArabic: 'ربط أصوات الحروف بصورها',
    icon: '🔊',
    color: '#FF6B5B',
    order: 2,
    games: [
      {
        id: 'sound-picture',
        name: 'Sound & Picture Match',
        nameArabic: 'الصوت والصورة',
        description: 'Match letter sounds to pictures',
        descriptionArabic: 'طابق أصوات الحروف مع الصور',
        icon: '🖼️',
        difficulty: 'easy',
        targetAge: '4-5',
        skills: ['phonics', 'listening', 'vocabulary'],
      },
      {
        id: 'sound-letter',
        name: 'Sound to Letter',
        nameArabic: 'الصوت إلى الحرف',
        description: 'Identify letters by their sounds',
        descriptionArabic: 'تعرف على الحروف من خلال أصواتها',
        icon: '🎵',
        difficulty: 'medium',
        targetAge: '4-6',
        skills: ['phonics', 'listening', 'recognition'],
      },
      {
        id: 'word-beginning',
        name: 'Word Beginning Sound',
        nameArabic: 'صوت بداية الكلمة',
        description: 'Identify which letter a word starts with',
        descriptionArabic: 'تعرف على الحرف الأول من الكلمة',
        icon: '🎯',
        difficulty: 'medium',
        targetAge: '5-6',
        skills: ['phonics', 'listening', 'word-recognition'],
      },
      {
        id: 'rhyming-words',
        name: 'Rhyming Words',
        nameArabic: 'الكلمات المتشابهة',
        description: 'Match words with similar ending sounds',
        descriptionArabic: 'طابق الكلمات ذات الأصوات المتشابهة',
        icon: '🎶',
        difficulty: 'hard',
        targetAge: '5-7',
        skills: ['phonics', 'listening', 'pattern-recognition'],
      },
      {
        id: 'letter-sound-speed',
        name: 'Letter Sound Speed',
        nameArabic: 'سرعة الأصوات',
        description: 'Quick letter sound recognition',
        descriptionArabic: 'التعرف السريع على أصوات الحروف',
        icon: '⚡',
        difficulty: 'hard',
        targetAge: '5-7',
        skills: ['phonics', 'speed', 'recognition'],
      },
    ],
  },
  {
    id: 'blending',
    name: 'Blending',
    nameArabic: 'الدمج والتركيب',
    description: 'Combine letter sounds to form words',
    descriptionArabic: 'دمج أصوات الحروف لتكوين كلمات',
    icon: '🔀',
    color: '#FFD93D',
    order: 3,
    games: [
      {
        id: 'word-builder',
        name: 'Word Builder',
        nameArabic: 'بناء الكلمات',
        description: 'Arrange letters to form words',
        descriptionArabic: 'رتب الحروف لتكوين كلمات',
        icon: '🧩',
        difficulty: 'medium',
        targetAge: '5-6',
        skills: ['blending', 'spelling', 'vocabulary'],
      },
      {
        id: 'syllable-blending',
        name: 'Syllable Blending',
        nameArabic: 'دمج المقاطع',
        description: 'Combine syllables to form words',
        descriptionArabic: 'دمج المقاطع لتكوين كلمات',
        icon: '🔗',
        difficulty: 'medium',
        targetAge: '5-7',
        skills: ['blending', 'phonics', 'word-formation'],
      },
      {
        id: 'missing-letter',
        name: 'Missing Letter',
        nameArabic: 'الحرف الناقص',
        description: 'Complete words with missing letters',
        descriptionArabic: 'أكمل الكلمات بالحروف الناقصة',
        icon: '❓',
        difficulty: 'medium',
        targetAge: '5-7',
        skills: ['blending', 'spelling', 'reasoning'],
      },
      {
        id: 'word-formation',
        name: 'Word Formation',
        nameArabic: 'تكوين الكلمات',
        description: 'Form words from letter combinations',
        descriptionArabic: 'كون كلمات من مجموعات الحروف',
        icon: '📝',
        difficulty: 'hard',
        targetAge: '6-7',
        skills: ['blending', 'spelling', 'vocabulary'],
      },
      {
        id: 'sound-sequence',
        name: 'Sound Sequence',
        nameArabic: 'تسلسل الأصوات',
        description: 'Order sounds to form words',
        descriptionArabic: 'رتب الأصوات لتكوين كلمات',
        icon: '🎼',
        difficulty: 'hard',
        targetAge: '6-7',
        skills: ['blending', 'phonics', 'sequencing'],
      },
    ],
  },
  {
    id: 'reading',
    name: 'Reading',
    nameArabic: 'القراءة',
    description: 'Read and understand words and simple sentences',
    descriptionArabic: 'اقرأ وافهم الكلمات والجمل البسيطة',
    icon: '📖',
    color: '#B8A8FF',
    order: 4,
    games: [
      {
        id: 'word-search',
        name: 'Word Search',
        nameArabic: 'البحث عن الكلمات',
        description: 'Find words in a letter grid',
        descriptionArabic: 'ابحث عن الكلمات في شبكة الحروف',
        icon: '🔤',
        difficulty: 'medium',
        targetAge: '6-7',
        skills: ['reading', 'visual-scanning', 'vocabulary'],
      },
      {
        id: 'word-recognition',
        name: 'Word Recognition',
        nameArabic: 'التعرف على الكلمات',
        description: 'Identify and match words',
        descriptionArabic: 'تعرف على الكلمات وطابقها',
        icon: '🎯',
        difficulty: 'medium',
        targetAge: '6-7',
        skills: ['reading', 'recognition', 'vocabulary'],
      },
      {
        id: 'sentence-building',
        name: 'Sentence Building',
        nameArabic: 'بناء الجمل',
        description: 'Arrange words to form sentences',
        descriptionArabic: 'رتب الكلمات لتكوين جمل',
        icon: '📝',
        difficulty: 'hard',
        targetAge: '6-8',
        skills: ['reading', 'grammar', 'comprehension'],
      },
      {
        id: 'comprehension-quiz',
        name: 'Comprehension Quiz',
        nameArabic: 'اختبار الفهم',
        description: 'Answer questions about texts',
        descriptionArabic: 'أجب على أسئلة حول النصوص',
        icon: '❓',
        difficulty: 'hard',
        targetAge: '6-8',
        skills: ['reading', 'comprehension', 'critical-thinking'],
      },
      {
        id: 'text-matching',
        name: 'Text Matching',
        nameArabic: 'مطابقة النصوص',
        description: 'Match words to their meanings',
        descriptionArabic: 'طابق الكلمات مع معانيها',
        icon: '🔗',
        difficulty: 'hard',
        targetAge: '6-8',
        skills: ['reading', 'vocabulary', 'comprehension'],
      },
    ],
  },
  {
    id: 'fluency',
    name: 'Fluency',
    nameArabic: 'الطلاقة',
    description: 'Read fluently and with expression',
    descriptionArabic: 'اقرأ بطلاقة وبتعبير',
    icon: '⚡',
    color: '#E8D4E8',
    order: 5,
    games: [
      {
        id: 'one-minute-challenge',
        name: '1-Minute Challenge',
        nameArabic: 'تحدي الدقيقة',
        description: 'Read as many words as possible in one minute',
        descriptionArabic: 'اقرأ أكبر عدد من الكلمات في دقيقة',
        icon: '⏱️',
        difficulty: 'hard',
        targetAge: '6-8',
        skills: ['fluency', 'speed', 'reading'],
      },
      {
        id: 'speed-reading',
        name: 'Speed Reading',
        nameArabic: 'القراءة السريعة',
        description: 'Read and comprehend at increasing speeds',
        descriptionArabic: 'اقرأ وافهم بسرعات متزايدة',
        icon: '🚀',
        difficulty: 'hard',
        targetAge: '7-8',
        skills: ['fluency', 'speed', 'comprehension'],
      },
      {
        id: 'expression-reading',
        name: 'Expression Reading',
        nameArabic: 'القراءة بتعبير',
        description: 'Read with proper tone and expression',
        descriptionArabic: 'اقرأ بنبرة صوتية صحيحة وتعبير',
        icon: '🎭',
        difficulty: 'hard',
        targetAge: '7-8',
        skills: ['fluency', 'expression', 'comprehension'],
      },
      {
        id: 'story-reading',
        name: 'Story Reading',
        nameArabic: 'قراءة القصص',
        description: 'Read and understand short stories',
        descriptionArabic: 'اقرأ وافهم القصص القصيرة',
        icon: '📚',
        difficulty: 'hard',
        targetAge: '7-9',
        skills: ['fluency', 'comprehension', 'vocabulary'],
      },
      {
        id: 'fluency-race',
        name: 'Fluency Race',
        nameArabic: 'سباق الطلاقة',
        description: 'Compete in reading speed and accuracy',
        descriptionArabic: 'تنافس في سرعة القراءة والدقة',
        icon: '🏁',
        difficulty: 'hard',
        targetAge: '7-9',
        skills: ['fluency', 'speed', 'accuracy'],
      },
    ],
  },
  {
    id: 'writing',
    name: 'Writing',
    nameArabic: 'الكتابة',
    description: 'Write letters, words, and sentences',
    descriptionArabic: 'اكتب الحروف والكلمات والجمل',
    icon: '✏️',
    color: '#FFB84D',
    order: 6,
    games: [
      {
        id: 'letter-tracing',
        name: 'Letter Tracing',
        nameArabic: 'تتبع الحروف',
        description: 'Trace letter shapes on screen',
        descriptionArabic: 'تتبع أشكال الحروف على الشاشة',
        icon: '✍️',
        difficulty: 'easy',
        targetAge: '4-6',
        skills: ['writing', 'fine-motor', 'letter-formation'],
      },
      {
        id: 'letter-writing',
        name: 'Letter Writing',
        nameArabic: 'كتابة الحروف',
        description: 'Write letters from memory or dictation',
        descriptionArabic: 'اكتب الحروف من الذاكرة أو الإملاء',
        icon: '📝',
        difficulty: 'medium',
        targetAge: '5-7',
        skills: ['writing', 'letter-formation', 'memory'],
      },
      {
        id: 'word-writing',
        name: 'Word Writing',
        nameArabic: 'كتابة الكلمات',
        description: 'Write words from dictation or pictures',
        descriptionArabic: 'اكتب كلمات من الإملاء أو الصور',
        icon: '📄',
        difficulty: 'hard',
        targetAge: '6-8',
        skills: ['writing', 'spelling', 'vocabulary'],
      },
      {
        id: 'sentence-writing',
        name: 'Sentence Writing',
        nameArabic: 'كتابة الجمل',
        description: 'Write complete sentences',
        descriptionArabic: 'اكتب جملاً كاملة',
        icon: '📋',
        difficulty: 'hard',
        targetAge: '7-9',
        skills: ['writing', 'grammar', 'composition'],
      },
      {
        id: 'creative-writing',
        name: 'Creative Writing',
        nameArabic: 'الكتابة الإبداعية',
        description: 'Create original sentences and stories',
        descriptionArabic: 'أنشئ جملاً وقصصاً أصلية',
        icon: '🌟',
        difficulty: 'hard',
        targetAge: '7-10',
        skills: ['writing', 'creativity', 'composition'],
      },
    ],
  },
];

/**
 * Get a learning stage by ID
 */
export const getLearningStageById = (stageId: string): LearningStage | undefined => {
  return LEARNING_STAGES.find(stage => stage.id === stageId);
};

/**
 * Get a game by ID across all stages
 */
export const getGameById = (gameId: string): Game | undefined => {
  for (const stage of LEARNING_STAGES) {
    const game = stage.games.find(g => g.id === gameId);
    if (game) return game;
  }
  return undefined;
};

/**
 * Get all games for a specific stage
 */
export const getGamesByStage = (stageId: string): Game[] => {
  const stage = getLearningStageById(stageId);
  return stage ? stage.games : [];
};

/**
 * Get all games across all stages
 */
export const getAllGames = (): Game[] => {
  return LEARNING_STAGES.flatMap(stage => stage.games);
};

/**
 * Get games by difficulty
 */
export const getGamesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Game[] => {
  return getAllGames().filter(game => game.difficulty === difficulty);
};

/**
 * Get games by skill
 */
export const getGamesBySkill = (skill: string): Game[] => {
  return getAllGames().filter(game => game.skills.includes(skill));
};
