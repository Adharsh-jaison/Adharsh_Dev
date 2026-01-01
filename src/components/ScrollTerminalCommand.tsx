import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ScrollTerminalCommandProps {
  command: string;
  children: React.ReactNode;
  typingSpeed?: number;
  resultDelay?: number;
  prompt?: string;
  threshold?: number;
}

const ScrollTerminalCommand = ({ 
  command, 
  children, 
  typingSpeed = 55, 
  resultDelay = 300,
  prompt = "~",
  threshold = 0.35
}: ScrollTerminalCommandProps) => {
  const [displayedCommand, setDisplayedCommand] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold, rootMargin: '-20% 0px -20% 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, hasTriggered]);

  // Typing animation
  useEffect(() => {
    if (!hasTriggered) return;

    let i = 0;
    const timer = setInterval(() => {
      if (i < command.length) {
        setDisplayedCommand(command.slice(0, i + 1));
        i++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
        setTimeout(() => {
          setShowResult(true);
        }, resultDelay);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [command, typingSpeed, resultDelay, hasTriggered]);

  return (
    <div ref={containerRef} className="space-y-3">
      {/* Command Line with Linux-style prompt */}
      <div className="font-mono text-sm flex items-center flex-wrap gap-1">
        <span className="text-terminal-green">user@devops-ai</span>
        <span className="text-muted-foreground">:</span>
        <span className="text-terminal-cyan">{prompt}</span>
        <span className="text-muted-foreground">$</span>
        <span className="text-foreground ml-2">{displayedCommand}</span>
        {hasTriggered && !isTypingComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block w-2 h-4 bg-primary ml-0.5"
            aria-hidden="true"
          />
        )}
        {!hasTriggered && (
          <span className="text-muted-foreground ml-2 text-xs italic">
            (scroll to activate)
          </span>
        )}
      </div>

      {/* Result */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={showResult ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollTerminalCommand;
