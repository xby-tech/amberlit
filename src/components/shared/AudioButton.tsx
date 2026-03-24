'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface AudioButtonProps {
  /** Audio file path (used if file exists) or text to speak via Web Speech API */
  src: string;
  /** Text to speak if audio file fails or doesn't exist */
  speakText?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_CLASSES = {
  sm: 'w-10 h-10 text-lg',
  md: 'w-14 h-14 text-2xl',
  lg: 'w-20 h-20 text-3xl',
};

/**
 * Extract speakable text from a phoneme audio path.
 * e.g. '/audio/phonemes/sh.mp3' → 'sh'
 */
function extractSpeakText(src: string): string {
  const match = src.match(/\/([^/]+)\.mp3$/);
  return match?.[1] ?? src;
}

function speak(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      reject(new Error('Speech synthesis not available'));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8; // Slightly slower for young learners
    utterance.pitch = 1.1;
    utterance.lang = 'en-AU'; // Australian English

    // Try to find an Australian or British voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find((v) => v.lang === 'en-AU')
      ?? voices.find((v) => v.lang === 'en-GB')
      ?? voices.find((v) => v.lang.startsWith('en'));
    if (preferred) utterance.voice = preferred;

    utterance.onend = () => resolve();
    utterance.onerror = () => reject(new Error('Speech failed'));

    window.speechSynthesis.speak(utterance);
  });
}

export default function AudioButton({ src, speakText, label, size = 'md' }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    if (isPlaying) return;
    setIsPlaying(true);

    const textToSpeak = speakText ?? extractSpeakText(src);

    try {
      // Try the audio file first
      const audio = new Audio(src);
      await new Promise<void>((resolve, reject) => {
        audio.onended = () => resolve();
        audio.onerror = () => reject();
        audio.play().catch(reject);
      });
    } catch {
      // Audio file failed — fall back to Web Speech API
      try {
        await speak(textToSpeak);
      } catch {
        // Both failed — degrade silently
      }
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handlePlay}
      className={`
        ${SIZE_CLASSES[size]}
        rounded-full bg-amber-500 text-white
        flex items-center justify-center
        hover:bg-amber-600 transition-colors
        shadow-md
        ${isPlaying ? 'animate-pulse' : ''}
      `}
      whileTap={{ scale: 0.9 }}
      aria-label={label ?? `Play sound`}
    >
      {isPlaying ? (
        <span className="block w-4 h-4 rounded-sm bg-white" />
      ) : (
        <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </motion.button>
  );
}
