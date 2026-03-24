'use client';

// AmberLit: Audio hook
// Wraps Howler.js for playing phonics sounds and instructional audio.

import { useCallback, useRef, useEffect } from 'react';
import { Howl } from 'howler';

interface UseAudioOptions {
  /** Preload these audio paths on mount */
  preload?: string[];
}

export function useAudio(options?: UseAudioOptions) {
  const cacheRef = useRef<Map<string, Howl>>(new Map());

  // Preload specified audio files
  useEffect(() => {
    if (!options?.preload) return;
    for (const path of options.preload) {
      if (!cacheRef.current.has(path)) {
        const howl = new Howl({ src: [path], preload: true });
        cacheRef.current.set(path, howl);
      }
    }
  }, [options?.preload]);

  const play = useCallback((path: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      let howl = cacheRef.current.get(path);

      if (!howl) {
        howl = new Howl({ src: [path] });
        cacheRef.current.set(path, howl);
      }

      howl.once('end', () => resolve());
      howl.once('loaderror', () => reject(new Error(`Failed to load audio: ${path}`)));
      howl.once('playerror', () => reject(new Error(`Failed to play audio: ${path}`)));
      howl.play();
    });
  }, []);

  const stop = useCallback((path: string) => {
    const howl = cacheRef.current.get(path);
    if (howl) howl.stop();
  }, []);

  const stopAll = useCallback(() => {
    for (const howl of cacheRef.current.values()) {
      howl.stop();
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      for (const howl of cacheRef.current.values()) {
        howl.unload();
      }
      cacheRef.current.clear();
    };
  }, []);

  return { play, stop, stopAll };
}
