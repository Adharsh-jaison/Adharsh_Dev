import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useTypingSound from '@/hooks/useTypingSound';

interface TerminalCommandProps {
  command: string;
  children: React.ReactNode;
  typingSpeed?: number;
  resultDelay?: number;
  prompt?: string;
  enableSound?: boolean;
}

const TerminalCommand = ({ 
  command, 
  children, 
  typingSpeed = 50, 
  resultDelay = 300,
  prompt = "~",
  enableSound = true
}: TerminalCommandProps) => {
  const [displayedCommand, setDisplayedCommand] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { playKeySound, playEnterSound } = useTypingSound({ volume: 0.25, enabled: enableSound });

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < command.length) {
        setDisplayedCommand(command.slice(0, i + 1));
        playKeySound();
        i++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
        playEnterSound();
        setTimeout(() => {
          setShowResult(true);
        }, resultDelay);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [command, typingSpeed, resultDelay, playKeySound, playEnterSound]);

  return (
    <div className="space-y-3">
      {/* Command Line with Linux-style prompt */}
      <div className="font-mono text-sm flex items-center flex-wrap gap-1">
        <span className="text-terminal-green">user@devops-ai</span>
        <span className="text-muted-foreground">:</span>
        <span className="text-terminal-cyan">{prompt}</span>
        <span className="text-muted-foreground">$</span>
        <span className="text-foreground ml-2">{displayedCommand}</span>
        {!isTypingComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block w-2 h-4 bg-primary ml-0.5"
            aria-hidden="true"
          />
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

export default TerminalCommand;
