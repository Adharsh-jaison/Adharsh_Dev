import { useCallback, useRef, useEffect, useState } from 'react';

interface UseTypingSoundOptions {
  volume?: number;
  enabled?: boolean;
}

export const useTypingSound = (options: UseTypingSoundOptions = {}) => {
  const { volume = 0.3, enabled = true } = options;
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Mobile volume adjustment
  const isMobile = typeof window !== 'undefined' 
    ? window.innerWidth < 768 
    : false;
  
  const effectiveVolume = isMobile ? volume * 0.5 : volume;

  useEffect(() => {
    const handleInteraction = () => {
      setHasUserInteracted(true);
      // Initialize AudioContext on first interaction
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  const playKeySound = useCallback(() => {
    if (!enabled || isMuted || prefersReducedMotion || !hasUserInteracted) return;
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    
    try {
      // Create a short click/tick sound similar to mechanical keyboard
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // High frequency click
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.02);

      // Quick decay envelope
      gainNode.gain.setValueAtTime(effectiveVolume * 0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      // Low-pass filter for softer sound
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, ctx.currentTime);

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Silently fail if audio fails
    }
  }, [enabled, isMuted, prefersReducedMotion, hasUserInteracted, effectiveVolume]);

  const playEnterSound = useCallback(() => {
    if (!enabled || isMuted || prefersReducedMotion || !hasUserInteracted) return;
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    
    try {
      // Create a deeper "enter" sound
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(400, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

      gainNode.gain.setValueAtTime(effectiveVolume * 0.4, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Silently fail if audio fails
    }
  }, [enabled, isMuted, prefersReducedMotion, hasUserInteracted, effectiveVolume]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return {
    playKeySound,
    playEnterSound,
    isMuted,
    toggleMute,
    hasUserInteracted
  };
};

export default useTypingSound;
