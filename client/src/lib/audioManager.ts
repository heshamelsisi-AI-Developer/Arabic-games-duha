/**
 * Audio Manager - Centralized Sound Management
 * Design: Playful & Vibrant
 * 
 * This module handles all audio playback in the application
 * Supports both Web Speech API and custom audio files
 * Custom audio files should be placed in: client/public/sounds/
 * 
 * Folder structure:
 * client/public/sounds/
 *   ├── letters/        (individual letter sounds: أ.mp3, ب.mp3, etc.)
 *   ├── words/          (word sounds: كتاب.mp3, قلم.mp3, etc.)
 *   ├── ui/             (UI feedback: success.mp3, error.mp3, etc.)
 *   └── songs/          (songs and music)
 */

interface AudioConfig {
  useCustomAudio?: boolean; // Set to true to use custom audio files instead of Web Speech API
}

let audioConfig: AudioConfig = {
  useCustomAudio: false, // Default to Web Speech API
};

/**
 * Initialize audio configuration
 * @param config - Audio configuration options
 */
export const initializeAudio = (config: AudioConfig): void => {
  audioConfig = { ...audioConfig, ...config };
};

/**
 * Play a letter sound
 * Uses custom audio file if available, falls back to Web Speech API
 * @param letter - The Arabic letter to play
 * @param rate - Speech rate (0.5-2), default 0.8 (only for Web Speech API)
 */
export const playLetterSound = (letter: string, rate: number = 0.8): void => {
  try {
    // Try to load custom audio file first
    if (audioConfig.useCustomAudio) {
      const audioPath = `/sounds/letters/${encodeURIComponent(letter)}.mp3`;
      const audio = new Audio(audioPath);
      audio.onerror = () => {
        // Fallback to Web Speech API if file not found
        playLetterSoundWebSpeech(letter, rate);
      };
      audio.play().catch(() => {
        // Fallback to Web Speech API if playback fails
        playLetterSoundWebSpeech(letter, rate);
      });
    } else {
      playLetterSoundWebSpeech(letter, rate);
    }
  } catch (error) {
    console.error(`Error playing letter sound for: ${letter}`, error);
    // Fallback to Web Speech API
    playLetterSoundWebSpeech(letter, rate);
  }
};

/**
 * Play a word sound
 * Uses custom audio file if available, falls back to Web Speech API
 * @param word - The Arabic word to play
 * @param rate - Speech rate (0.5-2), default 0.8 (only for Web Speech API)
 */
export const playWordSound = (word: string, rate: number = 0.8): void => {
  try {
    // Try to load custom audio file first
    if (audioConfig.useCustomAudio) {
      const audioPath = `/sounds/words/${encodeURIComponent(word)}.mp3`;
      const audio = new Audio(audioPath);
      audio.onerror = () => {
        // Fallback to Web Speech API if file not found
        playWordSoundWebSpeech(word, rate);
      };
      audio.play().catch(() => {
        // Fallback to Web Speech API if playback fails
        playWordSoundWebSpeech(word, rate);
      });
    } else {
      playWordSoundWebSpeech(word, rate);
    }
  } catch (error) {
    console.error(`Error playing word sound for: ${word}`, error);
    // Fallback to Web Speech API
    playWordSoundWebSpeech(word, rate);
  }
};

/**
 * Play a UI sound (button click, success, error, etc.)
 * Uses custom audio file if available, falls back to Web Audio API
 * @param soundType - Type of UI sound: 'buttonClick', 'success', 'error', 'cardFlip'
 */
export const playUISound = (soundType: string): void => {
  try {
    // Try to load custom audio file first
    if (audioConfig.useCustomAudio) {
      const audioPath = `/sounds/ui/${soundType}.mp3`;
      const audio = new Audio(audioPath);
      audio.onerror = () => {
        // Fallback to Web Audio API if file not found
        playUISoundWebAudio(soundType);
      };
      audio.play().catch(() => {
        // Fallback to Web Audio API if playback fails
        playUISoundWebAudio(soundType);
      });
    } else {
      playUISoundWebAudio(soundType);
    }
  } catch (error) {
    console.error(`Error playing UI sound for: ${soundType}`, error);
    // Fallback to Web Audio API
    playUISoundWebAudio(soundType);
  }
};

/**
 * Play a song (for Sing & Learn game)
 * @param songName - Name of the song file (without extension)
 */
export const playSong = (songName: string): void => {
  try {
    const audioPath = `/sounds/songs/${encodeURIComponent(songName)}.mp3`;
    const audio = new Audio(audioPath);
    audio.play().catch((error) => {
      console.error(`Error playing song: ${songName}`, error);
    });
  } catch (error) {
    console.error(`Error playing song: ${songName}`, error);
  }
};

// ============================================================================
// Web Speech API Fallback Functions
// ============================================================================

/**
 * Play a letter sound using Web Speech API
 * @param letter - The Arabic letter to play
 * @param rate - Speech rate (0.5-2), default 0.8
 */
const playLetterSoundWebSpeech = (letter: string, rate: number = 0.8): void => {
  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.lang = 'ar-SA';
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error(`Error playing letter sound for: ${letter}`, error);
  }
};

/**
 * Play a word sound using Web Speech API
 * @param word - The Arabic word to play
 * @param rate - Speech rate (0.5-2), default 0.8
 */
const playWordSoundWebSpeech = (word: string, rate: number = 0.8): void => {
  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'ar-SA';
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error(`Error playing word sound for: ${word}`, error);
  }
};

/**
 * Play a UI sound using Web Audio API
 * @param soundType - Type of UI sound: 'buttonClick', 'success', 'error', 'cardFlip'
 */
const playUISoundWebAudio = (soundType: string): void => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different sounds for different UI events
    switch (soundType) {
      case 'buttonClick':
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
        break;

      case 'success':
        oscillator.frequency.value = 1200;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        break;

      case 'error':
        oscillator.frequency.value = 400;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
        break;

      case 'cardFlip':
        oscillator.frequency.value = 600;
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.08);
        break;

      default:
        oscillator.frequency.value = 700;
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
  } catch (error) {
    console.error(`Error playing UI sound for: ${soundType}`, error);
  }
};
