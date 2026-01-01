import { useEffect, useState, useRef, RefObject } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  resetOnExit?: boolean;
}

export const useScrollAnimation = <T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
): { ref: RefObject<T>; isInView: boolean; hasAnimated: boolean } => {
  const { 
    threshold = 0.35, 
    rootMargin = '-20% 0px -20% 0px',
    resetOnExit = false 
  } = options;
  
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasAnimated(true);
        } else if (resetOnExit) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, resetOnExit]);

  return { ref, isInView, hasAnimated };
};

export default useScrollAnimation;
